<?php
    require_once('ConnexionBD.php');
    
    if(!isset($_SESSION)){session_start();}

        $User_id = isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
        
    	if($User_id){
            $sql = "SELECT COULEUR_GENTIL,COULEUR_MECHANT FROM UTILISATEUR WHERE PSEUDO='$User_id'";
            
    	    $row = $dbh->query($sql);
    	
			$resultat = [];
			
    	    if($row){

        		foreach($row as $res){
                    $resultat[0] = $res['COULEUR_GENTIL'];
                    $resultat[1] = $res['COULEUR_MECHANT'];
    			}
    
    			
    		
    		}
		}
        $colors=json_encode($resultat);
    echo $colors;
?>