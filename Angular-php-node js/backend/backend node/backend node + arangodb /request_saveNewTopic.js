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


async function req_saveNT1(sess_id,nv_sujet,id_cours)
{
    //vous suivez le cours
    //echo "vous suivez ce cours \n" ;
    //est ce que le topic existe dans le cours
    let query =  `for topic in  ${config.arangoDbCollection_topic}  
                       filter topic.Sujet == "${nv_sujet}"  and topic.id_cours == '${id_cours}'
                       return topic ` ; // ? une valeur qqconque
    //let query =  ` SELECT * FROM ${config.arangoDbCollection_topic}  WHERE Sujet = ?  and id_cours = ? ` ; // ? une valeur qqconque

    //const data = [nv_sujet,id_cours] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );
    });


}
module.exports.req_saveNT1 = req_saveNT1 ;


async function get_last_key_from(table)
{
    let query = `FOR doc IN ${table}
                  COLLECT AGGREGATE max = MAX(doc._key)
                  RETURN max ` ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );
    });
}
module.exports.get_last_key_from = get_last_key_from ;


async function req_saveNT2(key ,sess_id,nv_sujet ,id_cours,formatted) //$_POST['nv_sujet'] ,$_POST['id_cours']
{
    //echo "ce topic est nv dans le cours\n" ;
    //on l'insère
    let query = ` insert { _key : '${key}', Sujet :'${nv_sujet}', nb_posts :0, date_dernier_message : '${formatted}' , id_cours : '${id_cours}'} into ${config.arangoDbCollection_topic}  `; // ? une valeur qqconque

    console.log(query) ;
    //let query = ` INSERT INTO  ${config.arangoDbCollection_topic} (id,Sujet, nb_posts, date_dernier_message, id_cours) VALUES (?,?,?,?,?) `; // ? une valeur qqconque
    //const data = [null,nv_sujet,0,formatted,id_cours] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );
    });
}

module.exports.req_saveNT2 = req_saveNT2 ;


function get_val_champ(table, champ ,id)
{
    let query = ` for row in ${table} 
                    filter row._key == '${id}'
                    return row.${champ} `   ;

    //let query = ` SELECT ${champ} FROM ${table} WHERE id  = ?`   ;
    //const data =  [id] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}

module.exports.get_val_champ = get_val_champ ;

function update_val_champ(table, champ1,champ2 ,val1,val2 ,id)
{
    //let query = `UPDATE ${table} SET ${champ1} = ? , ${champ2} = ? WHERE ${table}.id = ?`  ;
    let query = `UPDATE { _key: '${id}' } WITH {${champ1} : ${val1}, ${champ2} :'${val2}' } IN ${table} `  ;

    //const data =  [id,val1,val2] ;

    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}
module.exports.update_val_champ = update_val_champ ;




