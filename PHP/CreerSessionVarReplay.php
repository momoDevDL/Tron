<?php
if(!isset($_SESSION)){session_start();}
$PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;

 $_SESSION['replay'] = 'true';
echo $_SESSION['replay'] ;
?>
