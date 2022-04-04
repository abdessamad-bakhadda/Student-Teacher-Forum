<?php

require_once 'mysqlConnect.php';
require_once 'request_topic.php';

ini_set("display_errors" , 3) ; // ça affiche les erreurs


//print_r($_SESSION) ;
//print_r($_POST) ;

/*il faut verifier que l'utilisateur suit bien le cours
pour request_topic , request_post , request_saveNewTopic , request_saveNewPost */

function recupere_nom_utilisateur($sess_id)
{
    global  $mysqlTable_utilisateur, $PDO   ; // quand on utilise des variables d'autres fcts dans une fct il faut faire global

    //query 1
    $query = "SELECT  nom_utilisateur  FROM $mysqlTable_utilisateur WHERE  id = ? " ; // ? une valeur qqconque
    $data = array($sess_id) ;

    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution

    //recuperation du résultat
    $resultats = $statement->fetch(PDO::FETCH_ASSOC); // comment utiliser fetchColumn ,ask prof ?

    return $resultats['nom_utilisateur'] ;
}

function recupere_cours_from_topic($id_topic)
{
    global  $mysqlTable_topic , $mysqlTable_cours, $PDO   ; // quand on utilise des variables d'autres fcts dans une fct il faut faire global

    //query 1
    $query = "SELECT Sujet,id_cours ,$mysqlTable_cours.nom_cours   FROM $mysqlTable_topic JOIN $mysqlTable_cours ON $mysqlTable_topic.id_cours = $mysqlTable_cours.id  WHERE $mysqlTable_topic.id = ? " ; // ? une valeur qqconque
    $data = array($id_topic) ;

    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution

    //recuperation du résultat
    $resultats = $statement->fetch(PDO::FETCH_ASSOC);

    return $resultats ;

}



function request_post($sess_id,$id_topic)
{
    global $mysqlTable_topic ,$mysqlTable_post ,$PDO   ;

    $resultats= recupere_cours_from_topic($id_topic) ;
    $id_cours = $resultats['id_cours'] ;
    $nom_cours = $resultats['nom_cours'] ;
    $sujet = $resultats['Sujet'] ;
    $nom_utlisateur = recupere_nom_utilisateur($sess_id) ;

    $resultats  = verif_util_suit_cours($sess_id,$id_cours) ;
    if ($resultats == array())
    {
        $nom_utlisateur = '' ;
        //echo 'vous ne suivez pas ce cours\n' ;
        //sendError("vous ne suivez pas ce cours");
        $tab = ['tab'=> null ,'idc'=> $id_cours ,'nom_cours'=>$nom_cours ,'nom_utilisateur'=> $nom_utlisateur] ; //'tab' de Post //'idu' de Post2
        //print_r($tab);
        return $tab ;
    }
    else
    {

        $query = "SELECT $mysqlTable_post.* ,$mysqlTable_topic.Sujet FROM $mysqlTable_post JOIN $mysqlTable_topic ON $mysqlTable_post.id_topic = $mysqlTable_topic.id  WHERE $mysqlTable_post.id_topic = ? "; // ? une valeur qqconque
        $data = array($id_topic) ;

        $statement = $PDO->prepare($query); // preparation
        $exec = $statement->execute($data); // execution

        //recuperation du résultat
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

        if ($resultats == array())
        {
            $resultats[0]['Sujet'] = $sujet ;
            $nom_utlisateur = '' ;
        }

        $tab = ['tab'=>$resultats ,'idc'=> $id_cours ,'nom_cours'=>$nom_cours,'nom_utilisateur'=> $nom_utlisateur ] ; //'tab' de Post //'idu' de Post2

        //print_r($tab);

        //affiche et renvoie le tableau  $resultats en ts/js
        return $tab;

    }
}

//request_post(1,1) ;

?>
