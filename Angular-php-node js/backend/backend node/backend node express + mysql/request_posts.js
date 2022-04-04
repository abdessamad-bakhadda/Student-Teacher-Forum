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


function request_topic(id_cours) {
    let query = `SELECT ${config.mysqlTable_topic}}.* ,${config.mysqlTable_cours}.nom_cours 
                 FROM ${config.mysqlTable_topic}} JOIN ${config.mysqlTable_cours} 
                 ON ${config.mysqlTable_topic}}.id_cours = ${config.mysqlTable_cours}.id  
                 WHERE id_cours = ? ` ;
    const data =  [id_cours] ;                  //idsPetitsCours.map((objId) => objId.id);

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.request_topic = request_topic ;


function recupere_nom_utilisateur(id_utilisateur)
{
    let query = `SELECT  nom_utilisateur  FROM ${config.mysqlTable_utilisateur} WHERE  id = ? ` ; // ? une valeur qqconque
    const data =  [id_utilisateur] ;     

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
    //return $resultats['nom_utilisateur'] ;
}
module.exports.recupere_nom_utilisateur = recupere_nom_utilisateur ;

function recupere_sujet(id_topic)
{
    let query = `SELECT  Sujet  FROM ${config.mysqlTable_topic} WHERE  id = ? ` ; // ? une valeur qqconque
    const data =  [id_topic] ;

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
    //return $resultats['nom_utilisateur'] ;
}
module.exports.recupere_sujet = recupere_sujet ;


function recupere_cours_from_topic(id_topic)
{
    let query = `SELECT Sujet,id_cours ,${config.mysqlTable_cours}.nom_cours    
                 FROM ${config.mysqlTable_topic} JOIN ${config.mysqlTable_cours} 
                 ON ${config.mysqlTable_topic}.id_cours = ${config.mysqlTable_cours}.id  
                 WHERE ${config.mysqlTable_topic}.id = ? `  ; // ? une valeur qqconque
    const data =  [id_topic] ;
    
    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
    //return $resultats ;
}
module.exports.recupere_cours_from_topic = recupere_cours_from_topic ;



function request_post(id_topic)
{
    let query  = ` SELECT ${config.mysqlTable_post}.* ,${config.mysqlTable_topic}.Sujet 
                  FROM ${config.mysqlTable_post} JOIN ${config.mysqlTable_topic}
                  ON ${config.mysqlTable_post}.id_topic = ${config.mysqlTable_topic}.id  
                  WHERE ${config.mysqlTable_post}.id_topic = ? `; // ? une valeur qqconque
    const data =  [id_topic] ;

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
    /*
    if ($resultats == array())
    {
        $resultats[0]['Sujet'] = $sujet ;
        $nom_utlisateur = '' ;
    }
    $tab = ['tab'=>$resultats ,'idc'=> $id_cours ,'nom_cours'=>$nom_cours,'nom_utilisateur'=> $nom_utlisateur ] ; //'tab' de Post //'idu' de Post2
    return $tab;
     */

}
module.exports.request_post = request_post ;
