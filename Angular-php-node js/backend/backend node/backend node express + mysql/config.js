const config = {
    // paramètres de connexion à la base de données
    mysqlHost:     '192.168.64.2',
    mysqlDatabase: 'tp1',
    charset:       'utf8',
    mysqlLogin:    'polytech',
    mysqlPassword: 'polytech',

    // les noms des tables
    mysqlCourses:    'coursesDemo',
    mysqlTable_cours :'cours' ,
    mysqlTable_post :'post' ,
    mysqlTable_suivi : 'suivi' ,
    mysqlTable_topic : 'topic' ,
    mysqlTable_utilisateur : 'utilisateur' ,
};

// on exporte la config. En l'exportant comme ci-dessous, on pourra utiliser la
// syntaxe suivante pour la charger dans d'autres fichiers :
// const config = require ('./config');
module.exports = config;

