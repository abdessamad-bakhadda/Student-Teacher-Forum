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


function verif_util_suit_cours(id_utilisateur,id_cours) {
    let query = `for row in suivi
                    filter row.id_utilisateur == '${id_utilisateur}' and row.id_cours == '${id_cours}' 
                    return row `;
    //let query = `SELECT * FROM ${config.arangoDbCollection_suivi}  WHERE id_utilisateur = ?  and id_cours = ? `;
    //const data =  [id_utilisateur,id_cours] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}
module.exports.verif_util_suit_cours = verif_util_suit_cours ;


function request_topic(id_cours) {
    /*let query = `SELECT ${config.arangoDbCollection_topic}.* ,${config.arangoDbCollection_cours}.nom_cours
                 FROM ${config.arangoDbCollection_topic} JOIN ${config.arangoDbCollection_cours}
                 ON ${config.arangoDbCollection_topic}.id_cours = ${config.arangoDbCollection_cours}.id
                 WHERE id_cours = ? ` ; */
    let query = `for topic in topics
                    for course in cours
                        filter topic.id_cours == course._key and topic.id_cours == '${id_cours}'
                        return {topic ,nom_cours :course.nom_cours} ` ;
    //const data =  [id_cours] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}
module.exports.request_topic = request_topic ;

