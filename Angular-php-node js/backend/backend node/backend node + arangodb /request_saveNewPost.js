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



function req_saveNP1(id_topic,nv_post)
{
        //vous suivez le cours
        //echo "vous suivez ce cours \n" ;
        //est ce que le post existe dans le topic
        let query = ` for post in ${config.arangoDbCollection_post} 
                        filter post.message == '${nv_post}' and post.id_topic == '${id_topic}'
                        return post   `; // ${} une valeur qqconque
        //let query = ` SELECT * FROM ${config.arangoDbCollection_post}  WHERE  message = ${}  and id_topic = ${}  `; // ${} une valeur qqconque
        //const data = [nv_post,id_topic] ;

        return new Promise((resolve, reject) => {
            db.query(query).then(
                cursor => cursor.all()
            ).then(
                keys => { resolve(keys) ; } ,
                err =>  reject(err)
            );
        });
}
module.exports.req_saveNP1 = req_saveNP1 ;


function req_saveNP2(key,titre,nv_post,id_topic,userId,formatted) //$_POST['nv_post'] ,$_POST['id_topic']
{
        //echo "ce post est nv dans le topic\n" ;
        //on l'insère
        let query = ` insert {_key : '${key}' ,titre : '${titre}' ,message :'${nv_post}' , date_message : '${formatted}' ,id_topic :'${id_topic}', id_utilisateur : '${userId}'} into posts  ` ; // ${} une valeur qqconque
        //let query = ` INSERT INTO  ${config.arangoDbCollection_post} (id,titre, message, date_message, id_topic,id_utilisateur) VALUES (${},${},${},${},${},${}) ` ; // ${} une valeur qqconque
        //const data = [null,titre,nv_post,formatted,id_topic,userId] ;

        return new Promise((resolve, reject) => {
            db.query(query).then(
                cursor => cursor.all()
            ).then(
                keys => { resolve(keys) ; } ,
                err =>  reject(err)
            );
        });
}
module.exports.req_saveNP2 = req_saveNP2 ;
