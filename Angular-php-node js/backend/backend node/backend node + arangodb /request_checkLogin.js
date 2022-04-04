const config = require('./config');
const db = require ('./mysqlConnect');



function request_checklogin(login,password)
{
    let query = `for user in utilisateur filter user.login == '${login}' and user.password == ${password} return user`  ; // ? une valeur qqconque
    console.log(query) ;
    //let query = `SELECT *  FROM ${config.arangoDbCollection_utilisateur} WHERE login = ? and password = ?`  ; // ? une valeur qqconque
    //const data = [login,password] ;


    return new Promise((resolve, reject) => {
        db.query(query).then(
            cursor => cursor.all()
        ).then(
            keys => { console.log(keys) ; resolve(keys) ; } ,
            err =>  reject(err)
        );

    });
}
module.exports.request_checklogin = request_checklogin ;
