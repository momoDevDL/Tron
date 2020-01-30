<?php
	try{
		$dbh = new PDO('mysql:host=lightcycbrfight.mysql.db;dbname=lightcycbrfight;charset=UTF8','lightcycbrfight','Halellujah19',array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,));
	} catch(PDOException $e){
		echo $e->getMessage();
		die("Connexion impossible !");
    }

?>	