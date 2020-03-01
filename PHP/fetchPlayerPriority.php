<?php

require_once('ConnexionBD.php');
if(!isset($_SESSION)){session_start();}
$PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;  
    
$sql = "SELECT PRIORITE FROM UTILISATEUR WHERE PSEUDO = '$PSEUDO' ";
$row = $dbh->query($sql);
foreach($row as $res){
    $resultat = $res['PRIORITE'] ;
}

echo $resultat; 

?>