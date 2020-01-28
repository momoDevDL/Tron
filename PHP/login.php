<?php
	
	session_start();
    
	if ($_POST) {
		require_once('ConnexionBD.php');
		extract($_POST);
			
		$password = md5($password);		
		$sql="SELECT * FROM UTILISATEUR WHERE PSEUDO ='$user_name' AND PASSWORD='$password'";
		$resultat=$dbh->query($sql);
		
		if($resultat){
			
			if($resultat->rowCount()==0){
				echo 'Utilisateur ou mot de passe incorrecte';
                                
                                $_SESSION['ErreurPassword']= true;

				header('location:../index.php');// à mettre l'endroit où renvoyer aprés un échec
			}
			
			else{
				$user = $resultat->fetch();
				$_SESSION['id_utilisateur']=$user['PSEUDO'];
				$_SESSION['id_role']=$user['ROLE'];
				header('location:dashboardUser.php');// à mettre l'endroit où renvoyer aprés la reussite
			}
			if($bdd){
   				 $bdd = NULL;
			}
			$resultat = NULL;
		}
		
	}
?>	