<?php


require_once 'mysqlConnect.php';

ini_set("display_errors" , 1) ; // ça affiche les erreurs
//session_start(); //ça fait quoi ? sert à nous donner le tableau $_SESSION pour recuperer id de l'utilisateur

//l'idée est de passer en parametre tous qui est $_SESSION ou $_POST ...  pour que les requetes n'aient aucun rapport avec le coté client

function request_cours1($id)
{
    global $mysqlTable_suivi, $PDO ; // quand on utilise des variables d'autres fcts dans une fct il faut faire global

    //query 1
    $query = "SELECT id_cours FROM $mysqlTable_suivi  WHERE id_utilisateur = ? "; // ? une valeur qqconque
    $data = array($id);

    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution

    //recuperation du résultat
    $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
    //print_r($resultats);
    return request_cours2($resultats) ;

}

//l'idée est que chaque fonction fait une seule requete pour bien structurer le code
function request_cours2($resultats)
{
    global $mysqlTable_cours,  $PDO;

    $tab_cours = [] ;
    $i = 0 ;
    foreach ($resultats as $elt){
        //print_r($elt) ;
        $tab_cours[$i] = $elt['id_cours'] ;
        $i = $i+1 ;
    }
    //print_r($tab_cours) ;
    /*
    foreach($tab_cours as $val ){
        echo $val ;
    }
    */
    $query = "SELECT * FROM $mysqlTable_cours  WHERE  id in (?) "; // ? une valeur qqconque
    $data = $tab_cours; //$resultats['id_cours'] // look how to fix it
    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution

    //recuperation du résultat
    $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
    print_r($resultats);

    return $resultats;
}

//request_cours1(1) ;