<?php


header("Access-Control-Allow-Origin: *");


require_once '../mysql/mysqlConnect.php';
//echo "post\n" ;
//print_r($_POST) ;
//session_start(); // il faut regler ici qq chose


//query 2
$query = "SELECT * FROM $mysqlTable_suivi  WHERE id_utilisateur = ?  and id_cours = ? "; // ? une valeur qqconque
$data = array($_POST['id_utilisateur'],$_POST['id_cours']) ;

$statement = $PDO->prepare($query); // preparation
$exec = $statement->execute($data); // execution

//recuperation du résultat
$resultats = $statement->fetchAll(PDO::FETCH_ASSOC);


foreach($resultats as $un_resultat)
{
    //$resultats contient la table qui contient les lignes
    print_r($un_resultat) ;
    //$un_resultat contient une ligne  de la table obtenue après la requête , print_r sert pour afficher un tableau
}



//affiche et renvoie le tableau  $resultats en ts/js
//echo json_encode($resultats);

/*
echo "\n" ;
print_r($_SESSION) ;
//affichages
print_r($resultats) ;
echo "\n" ;

*/




?>
