const sessionJwt = require ('./sessionJWT');

const {request_checklogin} = require('./request_checkLogin') ;

// ici, on récupère le contenu du cookie de session JWT.
// celui-ci contient le userId mais également des informations
// concernant sa date d'expiration.
function getSession (req) {
    return sessionJwt.decodeSessionCookie(req);
}
module.exports.getSession = getSession;


// cette fonction ajoute le cookie de session au headers du
// message qui sera renvoyé à Angular. Si le cookie actuel
// est "vieux", on en recrée ici un nouveau.
function setSessionCookie (req, res, session) {
    sessionJwt.createSessionCookie(req, res, session);
}
module.exports.setSessionCookie = setSessionCookie;


// fonction pour récupérer le userId provenant du cookie
// de session. Si ce dernier n'existe pas, on renvoie
// l'ID -1.
function getUserId(session) {
    if (typeof session.userId === 'undefined') return -1;
    return session.userId;
}
module.exports.getUserId = getUserId;



async function authenticate(session,login,password)
{
    const resultats = await request_checklogin(login,password) ; // quand une fct retourne return new Promise il faut faire await avant de l'appeler
    console.log("authentification",resultats) ;
    if (resultats.length != 0)
    {

        session.userId = resultats[0]._key ; //il fallait chnager ici id to _key
        console.log("session.userId = ",session.userId ) ;
    }
    else session.userId = -1 ;

}
module.exports.authenticate = authenticate;

function isAuthenticated(session)
{
    return session.userId != -1 ;
}
module.exports.isAuthenticated = isAuthenticated ;



