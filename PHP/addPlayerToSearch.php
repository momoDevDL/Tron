<?php

require_once('ConnexionBD.php');
    
if(!isset($_SESSION)){session_start();}
$User_id = isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;

    if($User_id){
       $sql = "INSERT INTO RECHERCHE_MATCH(PSEUDO,HEURE_DEBUT,PRIORITE)VALUES ('$User_id',NOW(),'NONE')";
       $row = $dbh->query($sql);
       echo 'request done and player added';
    }

?>