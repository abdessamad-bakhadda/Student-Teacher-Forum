const config = require('./config');
const db = require ('./mysqlConnect');



function request_checklogin(login,password)
{
    let query = `SELECT *  FROM ${config.mysqlTable_utilisateur} WHERE login = ? and password = ?`  ; // ? une valeur qqconque
    const data = [login,password] ;


    return new Promise((resolve, reject) => {
        db.query(query, data, (err, rows) => {
            if (err) return reject(err);
            else {
                resolve(rows);
            }
        });
    });
}
module.exports.request_checklogin = request_checklogin ;
