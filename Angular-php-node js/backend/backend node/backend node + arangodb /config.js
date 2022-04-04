const config = {

    //dans Arangodb
    
    // les noms des collections
    arangoDbCollection_cours :'cours' ,
    arangoDbCollection_post :'posts' ,
    arangoDbCollection_suivi : 'suivi' ,
    arangoDbCollection_topic : 'topics' ,
    arangoDbCollection_utilisateur : 'utilisateur' ,
};

// on exporte la config. En l'exportant comme ci-dessous, on pourra utiliser la
// syntaxe suivante pour la charger dans d'autres fichiers :
// const config = require ('./config');
module.exports = config;

