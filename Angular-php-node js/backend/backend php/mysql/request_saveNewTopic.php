<?php

require_once 'mysqlConnect.php';
require_once 'request_topic.php';
require_once 'request_saveNewTopic.php';

ini_set("display_errors" , 1) ; // ça affiche les erreurs



function req_saveNT1($sess_id,$nv_sujet,$id_cours)
{
    global $mysqlTable_topic ,$PDO   ;
    //echo  "req_saveNT1\n" ;
    if($nv_sujet != "")
    {
        //echo "sujet rempli\n" ;
        //recuperation du résultat
        $resultats = verif_util_suit_cours($sess_id,$id_cours) ;
        //print_r($resultats) ;

        if ($resultats != array())
        {
            //vous suivez le cours
            //echo "vous suivez ce cours \n" ;
            //est ce que le topic existe dans le cours
            $query = "SELECT * FROM $mysqlTable_topic  WHERE Sujet = ?  and id_cours = ? "; // ? une valeur qqconque
            $data = array($nv_sujet,$id_cours) ;

            $statement = $PDO->prepare($query); // preparation
            $exec = $statement->execute($data); // execution

            //recuperation du résultat
            $resultats = $statement->fetch(PDO::FETCH_ASSOC);
        }
        else{
            $resultats = [2];
            //echo "vous ne suivez pas ce cours 1\n" ;
        }

    }
    else
    {
        $resultats = [1];
        //echo "sujet vide 1\n" ;
    }
    return $resultats ;
}


function req_saveNT2($sess_id,$nv_sujet ,$id_cours) //$_POST['nv_sujet'] ,$_POST['id_cours']
{
    global $mysqlTable_topic ,$PDO,$mysqlTable_cours   ;
    //recuperation du résultat
    $resultats = req_saveNT1($sess_id,$nv_sujet,$id_cours) ;

    /*
    echo  "req_saveNT2\n" ;
    print_r($resultats) ;
    */

    if ($resultats == array())
    {
        //echo "ce topic est nv dans le cours\n" ;
        //on l'insère
        $query ="INSERT INTO  $mysqlTable_topic (id,Sujet, nb_posts, date_dernier_message, id_cours) VALUES (?,?,?,?,?) "; // ? une valeur qqconque
        $date = date("Y-m-d H:i:s") ;
        $data = array(NULL,$nv_sujet,0,$date,$id_cours) ;

        $statement = $PDO->prepare($query); // preparation
        $exec = $statement->execute($data); // execution

        /*
        //recuperation du résultat
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        print_r($resultats) ;
        */
        $last_id = $PDO->lastInsertId();
        //echo $last_id,"\n" ;

        //il reste à changer nb_topics , date_dernier_message dans la table cours quand on ajoute qq chose à la BD
        $val = get_val_champ($mysqlTable_cours, 'nb_topics' ,$id_cours) ;
        //echo $val,$date ;
        update_val_champ($mysqlTable_cours, 'nb_topics','date_dernier_message' ,$val ,$date ,$id_cours) ;

        return  $last_id ;
    }
    else{

        //echo "r1\n" ;

        if($resultats == [1]) return -1 ; //echo "sujet vide \n" ;
        else if($resultats == [2]) return -2 ; //echo "vous ne suivez pas ce cours \n" ;
        else return -3  ;//echo "ce topic existe déjà\n" ;

    }

}

function get_val_champ($table, $champ ,$id)
{
    global $PDO   ;
    $query = "SELECT $champ FROM $table WHERE id  = ?" ;
    $data = array($id) ;
    $statement = $PDO->prepare($query); // preparation
    $exec = $statement->execute($data); // execution
    $resultats = $statement->fetch(PDO::FETCH_ASSOC); //demander au prof comment marche fetchColumn
    /*print_r($resultats) ;
    echo $resultats[$champ]+1 ,"\n";*/
    return $resultats[$champ]+1 ;
}

function update_val_champ($table, $champ1,$champ2 ,$val1,$val2 ,$id)
{
    global $PDO   ;
    //UPDATE `cours` SET `nb_topics` = '2' WHERE `cours`.`id` = 1; ;
    $query = "UPDATE $table SET $champ1 = ? , $champ2 = ?  WHERE $table.id = ?" ;
    $data = array($val1,$val2,$id) ;
    $statement = $PDO->prepare($query); // preparation.ññññ´
    $exec = $statement->execute($data); // execution

    //echo get_val_champ($table, $champ ,$id),"\n" ;
}


//echo req_saveNT2(1,'pñlp' ,1) ;

