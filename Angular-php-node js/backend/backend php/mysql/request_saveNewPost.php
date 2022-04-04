<?php

require_once 'mysqlConnect.php';
require_once 'request_topic.php';
require_once 'request_saveNewTopic.php';
require_once 'request_post.php';



ini_set("display_errors" , 1) ; // ça affiche les erreurs



function req_saveNP1($sess_id,$nv_post,$id_cours,$id_topic,$message)
{
    global $mysqlTable_post ,$PDO   ;
    //echo  "req_saveNP1\n" ;
    if($message != "")
    {
        //echo "post rempli\n" ;
        //recuperation du résultat
        $resultats = verif_util_suit_cours($sess_id,$id_cours) ;
        //print_r($resultats) ;

        if ($resultats != array())
        {
            //vous suivez le cours
            //echo "vous suivez ce cours \n" ;
            //est ce que le post existe dans le topic
            $query = "SELECT * FROM $mysqlTable_post  WHERE  message = ?  and id_topic = ?  "; // ? une valeur qqconque
            $data = array($message,$id_topic) ;

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
        //echo "post vide 1\n" ;
    }
    return $resultats ;
}


function req_saveNP2($nv_post ,$message,$id_topic,$sess_id) //$_POST['nv_post'] ,$_POST['id_topic']
{

    $resultats= recupere_cours_from_topic($id_topic) ;
    $id_cours = $resultats['id_cours'] ;

    global $mysqlTable_post ,$mysqlTable_cours,$PDO,$mysqlTable_topic   ;
    //recuperation du résultat
    $resultats = req_saveNP1($sess_id,$nv_post,$id_cours,$id_topic,$message) ;

    /*
    echo  "req_saveNP2\n" ;
    print_r($resultats) ;
    */

    if ($resultats == array())
    {
        //echo "ce post est nv dans le topic\n" ;
        //on l'insère
        $query ="INSERT INTO  $mysqlTable_post (id,titre, message, date_message, id_topic,id_utilisateur) VALUES (?,?,?,?,?,?) "; // ? une valeur qqconque
        $date = date("Y-m-d H:i:s") ;
        $data = array(NULL,$nv_post,$message,$date,$id_topic,$sess_id) ;

        $statement = $PDO->prepare($query); // preparation
        $exec = $statement->execute($data); // execution

        /*
        //recuperation du résultat
        $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);
        print_r($resultats) ;
        */
        $last_id = $PDO->lastInsertId();
        //echo $last_id,"\n" ;

        //il reste à changer nb_posts,'date_dernier_message' dans la table topic quand on ajoute qq chose à la BD
        $val = get_val_champ($mysqlTable_topic, 'nb_posts' ,$id_topic) ;
        update_val_champ($mysqlTable_topic, 'nb_posts','date_dernier_message' ,$val ,$date,$id_topic) ;


        //il reste à changer nb_posts,'date_dernier_message' dans la table cours quand on ajoute qq chose à la BD
        $val = get_val_champ($mysqlTable_cours, 'nb_posts' ,$id_cours) ;
        update_val_champ($mysqlTable_cours, 'nb_posts','date_dernier_message' ,$val ,$date , $id_cours) ;

        return  $last_id ;
    }
    else{

        //echo "r1\n" ;

        if($resultats == [1]) return -1 ; //echo "post vide \n" ;
        else if($resultats == [2]) return -2 ; //echo "vous ne suivez pas ce cours \n" ;
        else return -3  ;//echo "ce post existe déjà\n" ;

    }

}


//echo req_saveNP2('hein',"ser 3allah" ,1,1) ;


