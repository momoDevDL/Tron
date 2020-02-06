<?php

    if(isset($_POST['submit'])){
        require_once('ConnexionBD.php');
        $pseudo = $_POST['Pseudo'] ;
        $email = $_POST['email'];
        $passwd = $_POST['passwd'];
        
        
            if(isset($_POST['Pseudo']) && isset($_POST['email']) && isset($_POST['passwd']) ){
                
                $query = "SELECT PSEUDO FROM UTILISATEUR WHERE PSEUDO='$pseudo'";
                $checkExistance = $dbh->query($query);
                
                if($checkExistance->rowCount() == 0 ){
                $sql  = "INSERT INTO UTILISATEUR VALUES('$pseudo',md5('$passwd'),'JOUEUR','$email',1,100,0.99,NULL,'ORANGE','BLEU')";  
                //$query = "INSERT INTO UTILISATEUR VALUES('$pseudo',md5($passwd),'JOUEUR','$email',1,100,1.00,'NULL','ORANGE','BLEU')";
                $req = $dbh->query($sql);
             
                header("Location:dashboardUser.php");
                }else{
                    session_start();
                    $_SESSION["pseudoExistant"] = "true";
                    header("Location:login.php");
                }
            }
        
        }

?>  