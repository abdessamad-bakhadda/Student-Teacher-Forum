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


function request_cours1(id_utilisateur) {
    let query = `for row in suivi filter row.id_utilisateur == '${id_utilisateur}' return row  `; // tous les ids sonrt entre '' ou "" à cause de _key in arangodb

    //let query = `SELECT id_cours FROM ${config.arangoDbCollection_suivi}  WHERE id_utilisateur = ? `;
    //const data =  [id_utilisateur] ;                  //idsPetitsCours.map((objId) => objId.id);

    console.log(query) ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => {  resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}
module.exports.request_cours1 = request_cours1 ;


//ask prof about this , I want
//TO_NUMBER(course._key) solves the problem here
function request_cours2(tab_cours) {
    let index = tab_cours.length
    let query = `for course in cours 
                    for elt in [${tab_cours}]
                        filter TO_NUMBER(course._key) == elt
                        return course `;

    //let query = `SELECT * FROM ${config.arangoDbCollection_cours}  WHERE  id in  (?) `;
    // const data =  [tab_cours] ;                  //idsPetitsCours.map((objId) => objId.id);

    console.log(query) ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}
module.exports.request_cours2 = request_cours2;


