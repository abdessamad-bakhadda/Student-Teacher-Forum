// le fichier request_cours contient des fonctions qui réalisent
// les request_cours dans la base de données.
const request_cours = require('./request_cours');

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
async function getCours (req,res) {
    // on récupère la variable de session et, dans celle-ci, on
    // va récupérer l'ID du user. C'est équivalent en PHP à :
    // session_start();
    // $userId = $_SESSION['userId'];

    const session = auth.getSession (req);
    const userId = auth.getUserId(session);
    if (userId == -1)
        return sendError (res, 'not authenticated');

    // contrairement à Apache/PHP, qui conserve les sessions sur le
    // serveur, en Node/Express, on ne conserve pas cette information.
    // il faut donc renvoyer le cookie de session après chaque requête
    auth.setSessionCookie (req, res, {userId :userId});






    // Grâce au mot clef "await", celles-ci sont réalisées séquentiellement :
    // même si les requêtes mysql sont asynchrones, await va attendre la
    // réponse de la requête avant de passer à la suite.
    // Précisons ici que ces requêtes n'ont d'autre intérêt que de vous montrer
    // comment réaliser des requêtes séquentielles à la manière de PHP : ici,
    // on aurait pu se contenter d'une seule requête MySQL pour obtenir le
    // même résultat.
    console.log("Cours/userId =",userId) ;
    const resultat = await request_cours.request_cours1(userId);
    console.log(resultat,resultat.length)
    const tab_id_cours = [] ;
    let i = 0 ;
    while(i < resultat.length ) {
        tab_id_cours[i] = resultat[i].id_cours ;
        console.log(tab_id_cours[i]) ;
        i++ ;
    }
    console.log(tab_id_cours) ;
    const cours = await request_cours.request_cours2(tab_id_cours);

    // on renvoie au format JSON la liste des cours demandés par l'utilisateur
    sendMessage(res, cours);
}
module.exports = getCours;

