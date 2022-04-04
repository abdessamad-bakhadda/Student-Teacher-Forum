const config = require('./config');
const Database = require('arangojs').Database;

db = new Database();

db.useDatabase('_system');

/*
cours = db.collection('cours') ;
topics = db.collection('topics') ;
posts = db.collection('posts') ;
suivi = db.collection('suivi') ;
utilisateur = db.collection('utilisateur') ;
*/

module.exports = db;

