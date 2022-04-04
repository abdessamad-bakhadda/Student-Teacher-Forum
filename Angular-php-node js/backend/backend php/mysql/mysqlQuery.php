<?php

ini_set("display_errors", 'On') ;
error_reporting(E_ALL) ;

require_once 'mysqlConnect.php' ;


$query = "SELECT * FROM $mysqlTable WHERE login = ?" ; // ? une valeur qqconque
$data = array('Ali_log') ;

$statement = $PDO->prepare($query) ; // preparation
$exec = $statement->execute($data) ; // execution

//recuperation du résultat
$resultats = $statement->fetchAll(PDO::FETCH_ASSOC) ;
//$resultats  = cont1 selon fetch choisi
// fetchColumn : une valeur
//fetch : une ligne
// fetchAll : plusieurs lignes

//PDO::FETCH_ASSOC
// option pour fetch et fetchAll
//PDO::FETCH_ASSOC => indices = noms des champs de la BD
//PDO::FETCH_NUM => indices = nombres (0,1,2,...)



//affichages
foreach($resultats as $un_resultat)
{
    //$resultats contient la table qui contient les lignes
    print_r($un_resultat) ;
    //$un_resultat contient une ligne  de la table obtenue après la requête , print_r sert pour afficher un tableau
}
echo "\nwahadak\n"

?>



