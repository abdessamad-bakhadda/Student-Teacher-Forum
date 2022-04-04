const request_posts = require('./request_posts') ;
const request_saveNewPost = require('./request_saveNewPost') ;
const config = require('./config');


const {verif_util_suit_cours} = require('./request_topics');
const {get_val_champ,update_val_champ} = require('./request_saveNewTopic') ;





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
async function saveNewPost(req,res) {
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
    // que l'utilisateur a envoyé une donnée appelée id_topic
    if (typeof req.body.id_topic == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée id_topic') ;
    const id_topic = req.body.id_topic ;

    if (typeof req.body.message == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée message') ;
    const message = req.body.message ;

    if (typeof req.body.nv_post == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée nv_post') ;
    const nv_post = req.body.nv_post ;

    // Grâce au mot clef "await", celles-ci sont réalisées séquentiellement :
    // même si les requêtes mysql sont asynchrones, await va attendre la
    // réponse de la requête avant de passer à la suite.
    // Précisons ici que ces requêtes n'ont d'autre intérêt que de vous montrer
    // comment réaliser des requêtes séquentielles à la manière de PHP : ici,
    // on aurait pu se contenter d'une seule requête MySQL pour obtenir le
    // même résultat.

    const Cours =await request_posts.recupere_cours_from_topic(id_topic) ;
    const id_cours = Cours[0].id_cours ;
    console.log("saveNP/userId =",userId) ;
    if(message != "") {

        const resultat = await verif_util_suit_cours(userId, id_cours);
        console.log("on suit le cours ou non ",resultat, resultat.length);

        if (resultat.length == 0) {
            sendError(res,"vous ne suivez pas ce cours") ;
        } else {
            const resultat1 = await request_saveNewPost.req_saveNP1(id_topic,message) ;
            console.log("post existe ou non ",resultat1,resultat1.length) ;
            if (resultat1.length == 0)
            {
                let dateTime = require('node-datetime');
                let dt = dateTime.create();
                let formatted = dt.format('Y-m-d H:M:S'); // ask prof comment mettre un bom temps ici
                const resultat2 = await request_saveNewPost.req_saveNP2(nv_post,message,id_topic,userId,formatted) ;
                console.log("num insertion",resultat2) ;

                //il reste à changer nb_posts dans la table topic quand on ajoute qq chose à la BD
                let val = await get_val_champ(config.mysqlTable_topic, 'nb_posts' ,id_topic) ; //await tres imporatnt sinon on console.log(val) affiche Promise { <pending> }
                console.log(val,val[0].nb_posts) ;
                let updated = await update_val_champ(config.mysqlTable_topic, 'nb_posts' ,'date_dernier_message',val[0].nb_posts+1,formatted ,id_topic) ;//await tres imporatnt sinon on console.log(val) affiche Promise { <pending> }
                console.log(updated) ;

                //il reste à changer nb_posts dans la table cours quand on ajoute qq chose à la BD
                const Cours = await request_posts.recupere_cours_from_topic(id_topic) ;
                const id_cours = Cours[0].id_cours ;
                val = await get_val_champ(config.mysqlTable_cours, 'nb_posts' ,id_cours) ; //await tres imporatnt sinon on console.log(val) affiche Promise { <pending> }
                console.log(val,val[0].nb_posts) ;
                updated = await update_val_champ(config.mysqlTable_cours, 'nb_posts' ,'date_dernier_message',val[0].nb_posts+1 ,formatted,id_cours) ;//await tres imporatnt sinon on console.log(val) affiche Promise { <pending> }
                console.log(updated) ;


                sendMessage(res,resultat2) ;
            }
            else sendError(res,"ce Post existe déjà") ;
        }
    }
    else {
        sendError(res,"message vide");
    }

    //const resultat = await request_saveNewPost.req_saveNT1(userId,message,id_topic)
    //console.log(resultat) ;
    /*const snt = await request_saveNewPost.req_saveNT2(userId,message,id_topic);
    console.log(snt) ;
    sendMessage(res, snt);*/

}
module.exports = saveNewPost ;
