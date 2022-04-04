// ici, on se connecte à la base de données. Ainsi, on pourra utiliser
// db (l'équivalent de PDO) pour réaliser les requêtes mySQL.
const config = require('./config');
const db = require ('./mysqlConnect');

// chaque requête correspond à une fonction qui renverra ce que l'on appelle
// une Promise (promesse). Une promesse est un objet qui contient une
// fonction (dont on sait qu'elle sera exécutée dans le futur). La promesse
// est renvoyée avant que la fonction ne soit exécutée (fonctionnement donc
// asynchrone). Quand la fonction a été exécutée, la callback appelle la
// fonction resolve qui indique à la promesse qu'elle peut renvoyer la
// réponse en question. Dans le fichier getCours1.js, les lignes 40 et 41
// (celles avec les await) récupèrent ces Promises. L'opérateur await attend
// alors que la promesse soit résolue (resolve) et récupère alors la
// réponse. Ainsi, même si tout ce fonctionnement est asynchrone, la variable
// idsPetitsCours de la ligne 40 du fichier getCours1.js récupérera le
// résultat de la requête mysql quand celui-ci aura été renvoyé par le
// serveur MySQL.


function recupere_nom_utilisateur(id_utilisateur)
{
    let query = `for user in ${config.arangoDbCollection_utilisateur} 
                 filter user._key == '${id_utilisateur}'
                 return user.nom_utilisateur ` ; // ? une valeur qqconque
    //let query = `SELECT  nom_utilisateur  FROM ${config.arangoDbCollection_utilisateur} WHERE  id = ? ` ; // ? une valeur qqconque
    //const data =  [id_utilisateur] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
    //return $resultats['nom_utilisateur'] ;
}
module.exports.recupere_nom_utilisateur = recupere_nom_utilisateur ;

function recupere_sujet(id_topic)
{
    let query = `for topic in  ${config.arangoDbCollection_topic} 
                    filter topic.id = ${id_topic} 
                    return topic.Sujet ` ; // ? une valeur qqconque
    //let query = `SELECT  Sujet  FROM ${config.arangoDbCollection_topic} WHERE  id = ? ` ; // ? une valeur qqconque
    //const data =  [id_topic] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
    //return $resultats['nom_utilisateur'] ;
}
module.exports.recupere_sujet = recupere_sujet ;


function recupere_cours_from_topic(id_topic)
{
    /*let query = `SELECT Sujet,id_cours ,${config.arangoDbCollection_cours}.nom_cours
                 FROM ${config.arangoDbCollection_topic} JOIN ${config.arangoDbCollection_cours} 
                 ON ${config.arangoDbCollection_topic}.id_cours = ${config.arangoDbCollection_cours}.id  
                 WHERE ${config.arangoDbCollection_topic}.id = ? `  ; // ? une valeur qqconque */

    let query = ` for topic in ${config.arangoDbCollection_topic} 
                    for course in ${config.arangoDbCollection_cours} 
                        filter topic.id_cours == course._key and topic._key == '${id_topic}'
                        return {Sujet : topic.Sujet , id_cours: topic.id_cours , nom_cours :course.nom_cours}  `  ; // ? une valeur qqconque
    //const data =  [id_topic] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
    //return $resultats ;
}
module.exports.recupere_cours_from_topic = recupere_cours_from_topic ;



function request_post(id_topic)
{
    /*let query  = ` SELECT ${config.arangoDbCollection_post}.* ,${config.arangoDbCollection_topic}.Sujet
                  FROM ${config.arangoDbCollection_post} JOIN ${config.arangoDbCollection_topic}
                  ON ${config.arangoDbCollection_post}.id_topic = ${config.arangoDbCollection_topic}.id  
                  WHERE ${config.arangoDbCollection_post}.id_topic = ? `; // ? une valeur qqconque */

    let query  = ` for post in ${config.arangoDbCollection_post} 
                        for topic in ${config.arangoDbCollection_topic} 
                            filter post.id_topic == topic._key and post.id_topic == '${id_topic}'
                            return {post ,Sujet: topic.Sujet}  `; // ? une valeur qqconque

    //const data =  [id_topic] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });


}
module.exports.request_post = request_post ;
