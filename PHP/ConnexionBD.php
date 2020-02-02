<?php
 $psswd = "t5n8O9FMkWEb4ssP";
	try{
		$dbh = new PDO("mysql:host=localhost;dbname=lightcyclefight;charset=UTF8",'debian-sys-maint',$psswd,array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,));
	} catch(PDOException $e){
		echo $e->getMessage();
		die("Connexion impossible !");
    }

?>	