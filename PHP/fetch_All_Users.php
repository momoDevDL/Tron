<?php
    require_once('ConnexionBD.php');
    
    if(!isset($_SESSION)){session_start();}
    if($_SESSION['id_role']=='ADMIN'){
    	$User_id = isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
    	if($User_id){
    	    $sql = "SELECT * FROM UTILISATEUR ORDER BY ROLE";
    	    $row = $dbh->query($sql);
    	
			$resultat = "";
			
    	    if($row){
    			$resultat .= "<div id='AllUsersTable'><table class='UsersTable'>
    	    	<tr>
        		<th>Role</th> 
        		<th>Pseudo</th> 
        		<th>Niveau</th>
        		<th>MMR</th>
        		<th>Email</th>
        		<th></th></tr>  ";
        		foreach($row as $res){
        		   
        			$resultat .= "<tr id='".$res['PSEUDO']."'>
        			<td>".$res['ROLE']."</td>
        			<td>".$res['PSEUDO']."</td>
        			<td>".$res['NIVEAU']."</td>
        			<td>".$res['MMR']."</td>
        			<td>".$res['EMAIL']."</td>";
        			if ($res['ROLE']!='ADMIN'){
        				$resultat .="
        				<td><button id='SuppressionUtilisateur' class='btn btn-danger'> Delete</button></td>";
        			}else{
        	                 $resultat.="<td></td>";
        	                }
        			$resultat .="</tr>"; 
    		
    			}
    			$resultat .= "</table></div>";
    			
    		
    		}
		}
		echo $resultat;
    }
    
?>