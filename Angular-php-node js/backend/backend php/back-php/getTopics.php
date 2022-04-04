<?php

ini_set("display_errors" , 1) ;
require_once 'helper.php' ;
require_once '../mysql/request_topic.php';

//echo "post\n" ;
//print_r($_POST) ;

if(isAuthenticated()) {
    $res = request_topic($_SESSION['id'], $_POST['id_cours']); //il faut {withCredentials: true}  dans message.ts pour que $_SESSION aient tous ses cookies== elts de $_SESSION
    //$Topic2 = array()

    if ($res['tab'] != null) sendMessage($res); //l'idée est que tous les messages du backend vers le frontend soient fait de la même manière avec les methodes de helper.php
    else sendError($res);
    //l'idée est que tous les messages du backend vers le frontend soient fait de la même manière avec les methodes de helper.php
}
else sendError("vous n'etes pas authentifié") ;


?>