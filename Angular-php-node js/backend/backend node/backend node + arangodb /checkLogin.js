
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
async function checkLogin (req,res) {
    // ici, on récupère les data passées à la route : on suppose
    // que l'utilisateur a envoyé une donnée appelée login
    if (typeof req.body.login == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée login') ;
    const login = req.body.login ;

    if (typeof req.body.password == 'undefined')
        return sendError(res, 'Vous n\'avez pas envoyé la donnée password') ;
    const password = req.body.password ;


    // on récupère la variable de session et, dans celle-ci, on
    // va récupérer l'ID du user. C'est équivalent en PHP à :
    // session_start();
    // $userId = $_SESSION['userId'];
    const session = auth.getSession (req);
    await auth.authenticate(session,login,password) ; // important await here
    const userId = auth.getUserId(session);
    console.log("checkLogin/userId =",userId) ;



    if(userId != -1)
    {
        // contrairement à Apache/PHP, qui conserve les sessions sur le
        // serveur, en Node/Express, on ne conserve pas cette information.
        // il faut donc renvoyer le cookie de session après chaque requête
        auth.setSessionCookie (req, res, {userId :userId});
        sendMessage (res,userId) ;
    }
    else
    {
        sendError(res, "login/password est invalide");
    }
}
module.exports = checkLogin;




