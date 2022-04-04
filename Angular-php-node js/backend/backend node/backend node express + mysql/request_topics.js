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
    let query = `SELECT * FROM ${config.mysqlTable_suivi}  WHERE id_utilisateur = ?  and id_cours = ? `;
    const data =  [id_utilisateur,id_cours] ;

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.verif_util_suit_cours = verif_util_suit_cours ;


function request_topic(id_cours) {
    let query = `SELECT ${config.mysqlTable_topic}.* ,${config.mysqlTable_cours}.nom_cours 
                 FROM ${config.mysqlTable_topic} JOIN ${config.mysqlTable_cours} 
                 ON ${config.mysqlTable_topic}.id_cours = ${config.mysqlTable_cours}.id  
                 WHERE id_cours = ? ` ;
    const data =  [id_cours] ;

    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}
module.exports.request_topic = request_topic ;

