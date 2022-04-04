<?php

ini_set("display_errors" , 1) ;
//header("Access-Control-Allow-Origin: *");
require_once 'helper.php' ;


//echo "post\n" ;
//print_r($_POST) ;

$log = array_key_exists('login', $_POST) ;
$psw = array_key_exists('password',$_POST ) ;

if($log && $psw)
{
    if (authenticate($_POST['login'], $_POST['password']))
    {
        //echo '$resultats est vide ' ;
        sendMessage ($_SESSION['id']) ;

    }
    else
    {
        sendError("login/password est invalide");
        //echo '$resultats n est pas vide ' ;

    }
}
else sendError("login/password est invalide");


//$resultats  = cont1 selon fetch choisi
// fetchColumn : une valeur
//fetch : une ligne
// fetchAll : plusieurs lignes

//PDO::FETCH_ASSOC
// option pour fetch et fetchAll
//PDO::FETCH_ASSOC => indices = noms des champs de la BD
//PDO::FETCH_NUM => indices = nombres (0,1,2,...)

/*print_r($resultats) ;

//affichages
foreach($resultats as $un_resultat)
{
    //$resultats contient la table qui contient les lignes
    print_r($un_resultat) ;
    //$un_resultat contient une ligne  de la table obtenue après la requête , print_r sert pour afficher un tableau
}*/



?>