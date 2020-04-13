<?php

    if(isset($_POST['submit'])){
        require_once('ConnexionBD.php');
        $pseudo = $_POST['Pseudo'] ;
        $email = $_POST['email'];
        $passwd = $_POST['passwd'];
        $coulM = $_POST['colorM'];
        $coulG = $_POST['colorG'];  
        
        
            if(isset($_POST['Pseudo']) && isset($_POST['email']) && isset($_POST['passwd']) && isset($_POST['colorG']) && isset($_POST['colorM'])  ){
                
                $query = "SELECT PSEUDO FROM UTILISATEUR WHERE PSEUDO='$pseudo'";
                $checkExistance = $dbh->query($query);
                
                if($checkExistance->rowCount() == 0 ){
                $sql  = "INSERT INTO UTILISATEUR VALUES('$pseudo',md5('$passwd'),'JOUEUR','$email',1,100,0.99,NULL,'$coulG','$coulM','null','-wooden-pingpong-table-709134.jpg')";  
                //$query = "INSERT INTO UTILISATEUR VALUES('$pseudo',md5($passwd),'JOUEUR','$email',1,100,1.00,'NULL','ORANGE','BLEU')";
                
                $req = $dbh->query($sql);
                
                session_start();
                $_SESSION['id_utilisateur']= $pseudo;
                $_SESSION['id_role']="JOUEUR";
                header("Location:dashboardUser.php");

                }else{
                    session_start();
                    $_SESSION["pseudoExistant"] = "true";
                    header("Location:login.php");
                }
            }
        
        }

?>  