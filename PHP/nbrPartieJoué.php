<?php
    require_once("ConnexionBD.php");
    $sql = "SELECT COUNT(*) FROM PARTIE WHERE PSEUDO = $_SESSION['id_utilisateur'] ";
?>