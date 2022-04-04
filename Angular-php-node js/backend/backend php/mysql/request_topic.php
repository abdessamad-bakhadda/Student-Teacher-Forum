<?php

require_once 'mysqlConnect.php';

ini_set("display_errors" , 3) ; // ça affiche les erreurs


//print_r($_SESSION) ;
//print_r($_POST) ;

/*il faut verifier que l'utilisateur suit bien le cours
pour request_topic , request_post , request_saveNewTopic , request_saveNewPost */
function verif_util_suit_cours($sess_id,$id_cours)
{
    global  $mysqlTable_suivi  ,$PDO   ; // quand on utilise des variables d'autres fcts dans une fct il faut faire global

    //query 1
    $query = "SELECT * FROM $mysqlTable_suivi  WHERE id_utilisateur = ?  and id_cours = ? " ; // ? une valeur qqconque
    $data = array($sess_id,$id_cours) ;

    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution

    //recuperation du résultat
    $resultats = $statement->fetch(PDO::FETCH_ASSOC);

    return $resultats ;

}.

function request_topic($sess_id,$id_cours)
{
    global $mysqlTable_cours ,$mysqlTable_topic ,$PDO   ;

    $resultats  = verif_util_suit_cours($sess_id,$id_cours) ;
    if ($resultats == array())
    {
        //echo 'vous ne suivez pas ce cours' ;
        //sendError("vous ne suivez pas ce cours");
        $tab = ['tab'=> null ,'idu'=> $sess_id ] ; //'tab' de Topic //'idu' de Topic2
        //print_r($tab);
        return $tab ;
    }
    else
    {
        //echo 'vous suivez ce cours' ;
        //sendMessage ("") ;

        //remettre ça en une fct

        $query = "SELECT $mysqlTable_topic.* ,$mysqlTable_cours.nom_cours FROM $mysqlTable_topic JOIN $mysqlTable_cours ON $mysqlTable_topic.id_cours = $mysqlTable_cours.id  WHERE id_cours = ? "; // ? une valeur qqconque
        $data = array($id_cours) ;

        $statement = $PDO->prepare($query); // preparation
        $exec = $statement->execute($data); // execution

        //recuperation du résultat
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

        $tab = ['tab'=>$resultats ,'idu'=> $sess_id ] ; //'tab' de Topic2 //'idu' de Topic2

        //print_r($tab);

        //affiche et renvoie le tableau  $resultats en ts/js
        return $tab;
    }
}

//request_topic(1,2) ;