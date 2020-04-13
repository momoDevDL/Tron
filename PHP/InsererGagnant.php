<?php
    require_once('ConnexionBD.php');
    if(!isset($_SESSION)){session_start();}
    $PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
    $gagnant = $_POST['vainceur'];
    $idPartie = $_POST['idPartie'];
    $sc = $_POST['scorefinal'];
    //echo $sc;
    $res = $dbh->query("UPDATE PARTIE SET GAGNANT='$gagnant', SCORE='$sc' WHERE ID_PARTIE='$idPartie' ");

?>