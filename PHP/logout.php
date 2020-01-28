<?php
	session_start();
	session_destroy();

	header('location:../index.php'); // à mettre l'endroit où renvoyer aprés déconnexion
	?>