<?php
	try{
		$dbh = new PDO('mysql:host=lightcycbrsentes.mysql.db;dbname=lightcycbrsentes;charset=UTF8','lightcycbrsentes','Halellujah19',array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,));
	} catch(PDOException $e){
		echo $e->getMessage();
		die("Connexion impossible !");
    }

?>	