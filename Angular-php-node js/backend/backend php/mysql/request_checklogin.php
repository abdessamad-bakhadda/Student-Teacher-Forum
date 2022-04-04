<?php

require_once 'mysqlConnect.php';
pñ
ini_set("display_errors" , 1) ; // ça affiche les erreurs

// cette requete doit etre dans une fct d'un fichier request_checklogin.php dans le repertoire mysql

function request_checklogin($login,$password)
{
    global $mysqlTable_utilisateur , $PDO ; // quand on utilise des variables d'autres fichiers dans une fct il faut faire global

    $query = "SELECT *  FROM $mysqlTable_utilisateur WHERE login = ? and password = ?"; // ? une valeur qqconque
    $data = array($login,$password);

    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution

    //recuperation du résultat
    $resultats = $statement->fetch(PDO::FETCH_ASSOC); // une seule ligne

    //print_r($resultats);

    return $resultats;

}


//request_checklogin() ;

