<?php
 $psswd = "root";
 $usr = "phpmyadmin";
	try{
		
		$dbh = new PDO("mysql:host=localhost;dbname=lightcyclefight;charset=UTF8",$usr,$psswd,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,));
		
	} catch(PDOException $e){
		echo $e->getMessage();
		die("Connexion impossible !");
    }

?>	