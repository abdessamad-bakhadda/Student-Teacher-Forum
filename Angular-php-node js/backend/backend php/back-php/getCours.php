+<?php



ini_set("display_errors" , 1) ; // to hide notice
require_once 'helper.php' ;
require_once '../mysql/request_cours.php' ;

//echo "post\n" ;
//print_r($_POST) ;

//le tableau $_SESSION pour recuperer id de l'utilisateur

//ça pas marché pour moi de mettre $_SESSION ici car il faut faire {withCredentials: true} pour passe les cookies(==elts) de $_SESSION
if(isAuthenticated()
{
    $resultats = request_cours1($_SESSION['id']) ; //passer en parametre tous qui est $_SESSION ou $_POST ... pour que les requetes n'aient aucun rapport avec le coté client

    //print_r($resultats) ;
    /*
    $tab = [$resultats ,$_SESSION] ;
    print_r($tab) ;
    */

    //affiche et renvoie le tableau  $resultats en ts/js
    //echo json_encode($resultats) ;
    if($resultats != array()) sendMessage($resultats) ; //l'idée est que tous les messages du backend vers le frontend soient fait de la même manière avec les methodes de helper.php
    else sendError($resultats) ;
}
else sendError("vous n'etes pas authentifié") ;



?>