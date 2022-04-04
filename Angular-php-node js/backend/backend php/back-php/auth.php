<?php //important qu'il soit en ligne 1

ini_set("display_errors" , 1) ; // ça affiche les erreurs

require_once '../mysql/request_checklogin.php' ;

//le seul endroit où on doit avoir session_start() ,une seule fois pour toutes les autres requetes
session_start();//  le tableau $_SESSION donnée par withcredentials pour recuperer id de l'utilisateur
//print_r($_SESSION) ;

function authenticate($login,$password)
{
    $resultats = request_checklogin($login,$password) ;
    if ($resultats == array() )
    {
        return false ;
    }
    else
    {
        //echo '$resultats n est pas vide ' ;

        $_SESSION['id'] = $resultats['id'] ; //id dans $resultats et id sera dans $_SESSION pour tt les scripts php qui veulent l'utiliser
        $_SESSION['login'] = $_POST['login'] ;
        $_SESSION['password'] = $_POST['password'] ;
        return true ;
    }
}

function isAuthenticated()  // va etre appelé par tt mes scripts.php et l'id de l'utlisateur va etre dans $_SESSION
{+
    //array_key_exists return true null
    $log = array_key_exists('login',$_SESSION) ;
    $psw = array_key_exists('password',$_SESSION) ;

    //isset return false pour null // ne marche pas pour moi pour Postman
    /*$log = isset($_SESSION['login']) ;
    $psw = isset($_SESSION['password']) ;*/

    //echo "login : " ,$log ,"\n" ;
    //echo "password : ",$psw,"\n";

    if ($log and $psw)
    {
        return true ;
    }
    return false ;
}

/*$res1 = authenticate() ;
if($res1 == true) echo "authentification ok " ;
else echo "authentification non ok" ;

echo"\n" ;

$res2 = isAuthenticated() ;
if($res2 == true) echo "is authenticated " ;
else echo "is not authenticated" ;

//echo"\n" ;
print_r($_SESSION) ;*/



?>