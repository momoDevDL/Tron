<?php
	
	session_start();
    
	if ($_POST) {
		extract($_POST);
			require_once("ConnexionBD.php");
		$password = md5($password);		
		$sql="SELECT * FROM UTILISATEUR WHERE PSEUDO ='$user_name' AND PASSWORD='$password'";
		$resultat=$dbh->query($sql);
		
		if($resultat){
			
			if($resultat->rowCount()==0){
				echo 'Utilisateur ou mot de passe incorrecte';
                                
                    $_SESSION['ErreurPassword'] = "true";

				header('Location:login.php');
			}
			
			else{
				$user = $resultat->fetch();
				$_SESSION['id_utilisateur']=$user['PSEUDO'];
				$_SESSION['id_role']=$user['ROLE'];
				header('Location:dashboardUser.php');
			}
			if($bdd){
   				 $bdd = NULL;
			}
			$resultat = NULL;
		}
		
	}
?>	