<?php

require_once('ConnexionBD.php');
    
    
$sql = "SELECT * FROM RECHERCHE_MATCH";
$row = $dbh->query($sql);
foreach($row as $res){
    $resultat[] = $res ;
}

echo json_encode($resultat);

?>