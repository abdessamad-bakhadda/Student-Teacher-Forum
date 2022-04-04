<?php


ini_set("display_errors" , 1) ;
require_once 'helper.php' ;
require_once '../mysql/request_saveNewPost.php';

/*
print_r($_SESSION) ;
print_r($_POST) ;
*/

if(isAuthenticated()) {
    $entier = req_saveNP2($_POST['nv_post'], $_POST['message'], $_POST['id_topic'], $_SESSION['id']); //il faut {withCredentials: true}  dans message.ts pour que $_SESSION aient tous ses cookies== elts de $_SESSION

    //echo "$entier\n" ;
    if ($entier == -1) {
        //echo "r1 n'est ajouté dans la BD\n"  ;
        sendError("message vide");
    } else if ($entier == -2) sendError("vous ne suivez pas ce cours");
    else if ($entier == -3) sendError("ce Post existe déjà");
    else {
        //echo "ajoute\n" ;
        sendMessage($entier);
    }
}
else sendError("vous n'etes pas authentifié") ;



?>
