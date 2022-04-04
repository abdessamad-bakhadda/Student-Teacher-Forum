// le fichier request_topic contient des fonctions qui réalisent
// les request_topic dans la base de données.
const request_posts = require('./request_posts') ;
const request_saveNewTopic = require('./request_saveNewTopic') ;
const config = require('./config');


const {verif_util_suit_cours} = require('./request_topics');




// ici, on utilise ce que l'on appelle l'object destructuring de
// JavaScript afin de récupérer les fonctions sendError et sendMessage.
// ce sont les équivalents des fonctions du même nom que vous aviez
// utilisées en PHP (voir helper.php). L'intérêt de l'object destructuring
// réside dans le fait que l'on va pouvoir appeler directement les fonctions
// sendError et sendMessage. Si l'on avait écrit :
// const message = require ("./message");
// on aurait dû, par la suite, appeler message.sendError () et
// message.sendMessage ().
const {sendError, sendMessage} = require ("./message");

// permettra de réaliser l'authentification
const auth = require ('./auth');

// ici, pour réaliser séquentiellement plusieurs requêtes mySQL (ce
// qui devra être fait pour répondre à certaines requêtes de votre
// appli Angular, on va utiliser l'opérateur "await "(voir ci-dessous).
// A noter que toutes les fonctions qui utilisent ce mot clef doivent
// être déclarées comme asynchrones via le mot clef async
async function saveNewTopic(req,res) {
    // on récupère la variable de session et, dans celle-ci, on
    // va récupérer l'ID du user. C'est équivalent en PHP à :
    // session_start();
    // $userId = $_SESSION['userId'];
    const session = auth.getSession (req) ;
    const userId = auth.getUserId(session) ;
    if (userId == -1)
        return sendError (res, 'not authenticated');

    // contrairement à Apache/PHP, qui conserve les sessions sur le
    // serveur, en Node/Express, on ne conserve pas cette information.
    // il faut donc renvoyer le cookie de session après chaque requête
    auth.setSessionCookie (req, res, session);

    // ici, on récupère les data passées à la route : on suppose
    // que l'utilisateur a envoyé une donnée appelée id_cours
    if (typeof req.body.id_cours == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée id_cours') ;
    const id_cours = req.body.id_cours ;

    if (typeof req.body.nv_sujet == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée nv_sujet') ;
    const nv_sujet = req.body.nv_sujet ;

    // Grâce au mot clef "await", celles-ci sont réalisées séquentiellement :
    // même si les requêtes mysql sont asynchrones, await va attendre la
    // réponse de la requête avant de passer à la suite.
    // Précisons ici que ces requêtes n'ont d'autre intérêt que de vous montrer
    // comment réaliser des requêtes séquentielles à la manière de PHP : ici,
    // on aurait pu se contenter d'une seule requête MySQL pour obtenir le
    // même résultat.

    console.log("saveNT/userId =",userId) ;
    if(nv_sujet != "") {
        const resultat = await verif_util_suit_cours(userId, id_cours);
        console.log("on suit le cours ou non ",resultat, resultat.length);

        if (resultat.length == 0) {
            sendError(res,"vous ne suivez pas ce cours") ;
        } else {
            const resultat1 = await request_saveNewTopic.req_saveNT1(userId,nv_sujet ,id_cours) ;
            console.log("topic existe ou non ",resultat1,resultat1.length) ;
            if (resultat1.length == 0)
            {
                let dateTime = require('node-datetime');
                let dt = dateTime.create();
                let formatted = dt.format('Y-m-d H:M:S');
                let last_key_topic = await request_saveNewTopic.get_last_key_from('topics')
                console.log('last_key_topic :' ,Number (last_key_topic[0])+1) ;
                await request_saveNewTopic.req_saveNT2(Number (last_key_topic[0])+1,userId,nv_sujet ,id_cours,formatted) ;
                console.log("num insertion",Number (last_key_topic[0])+1) ;
                val = await request_saveNewTopic.get_val_champ(config.arangoDbCollection_cours, 'nb_topics' ,id_cours) ; //await tres imporatnt sinon on console.log(val) affiche Promise { <pending> }
                console.log(val,val[0]) ;
                updated = await request_saveNewTopic.update_val_champ(config.arangoDbCollection_cours, 'nb_topics' ,'date_dernier_message',val[0]+1 ,formatted,id_cours) ;//await tres imporatnt sinon on console.log(val) affiche Promise { <pending> }
                console.log(updated) ;

                sendMessage(res,Number (last_key_topic[0])+1) ;
            }
            else sendError(res,"ce topic existe déjà") ;
        }
    }
    else {
        sendError(res,"sujet vide");
    }

    //const resultat = await request_saveNewTopic.req_saveNT1(userId,nv_sujet,id_cours)
    //console.log(resultat) ;
    /*const snt = await request_saveNewTopic.req_saveNT2(userId,nv_sujet,id_cours);
    console.log(snt) ;
    sendMessage(res, snt);*/

}
module.exports = saveNewTopic ;
