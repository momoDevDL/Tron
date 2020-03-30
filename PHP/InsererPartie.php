<?php
    require_once('ConnexionBD.php');
    if(!isset($_SESSION)){session_start();}
    $PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
    $j1 = $_POST['pseudo1'];
    $j2 = $_POST['pseudo2'];
    $resultat;
    $checkRequest = $dbh->query("SELECT MAX(ID_PARTIE) AS PartieCourante FROM PARTIE WHERE JOUEUR_1 ='$j1' AND  JOUEUR_2 ='$j2' AND HOUR(DATE_MATCH)= HOUR(NOW()) AND MINUTE(DATE_MATCH)= MINUTE(NOW()) AND GAGNANT=NULL");
    foreach($checkRequest as $row){
        if($row['PartieCourante'] == NULL){
   
            $res = $dbh->query("INSERT INTO PARTIE(JOUEUR_1,JOUEUR_2,DATE_MATCH,TYPE_MATCH,MODE) VALUES('$j1','$j2',NOW(),'1V1',1)");
            $res2 = $dbh->query("SELECT MAX(ID_PARTIE) AS PartieCourante FROM PARTIE WHERE JOUEUR_1 ='$j1' AND  JOUEUR_2 ='$j2' ");

            foreach($res2 as $row){
             $resultat = $row['PartieCourante'];
            }
        }else{
            $resultat = 'null';
        }
 }
 echo $resultat;
?>