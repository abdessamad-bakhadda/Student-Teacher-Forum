const config = require('./config');
const db = require ('./mysqlConnect');

/*
db.query('FOR d IN cours RETURN d').then(
    cursor => cursor.all()
).then(
    keys => console.log(keys),
    err => console.error('Failed to execute query:', err)
);
 */