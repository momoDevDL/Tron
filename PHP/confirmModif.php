<?php
    session_start();
    if(isset($_POST['submit'])){
        require_once("ConnexionBD.php");
        if(isset($_POST['Pseudo'])){
            
            $query = "SELECT PSEUDO FROM UTILISATEUR WHERE PSEUDO='".$_POST['Pseudo']."' ";
            $checkExistance = $dbh->query($query);
            
            if($checkExistance->rowCount() == 0 ){
            $sql = "UPDATE UTILISATEUR SET PSEUDO ='".$_POST['Pseudo']."' WHERE PSEUDO = '".$_SESSION['id_utilisateur']."' ";
            $res = $dbh->query($sql);
            session_start();
            $_SESSION['id_utilisateur'] = $_POST['Pseudo'];
            //header("Location:dashboardUser.php");

            }else{
                session_start();
                $_SESSION["pseudoExistant"] = "true";
                //header("Location:dashboardUser.php");   
            }
            
        }

        if(isset($_POST['email'])){
    
            $sql = "UPDATE UTILISATEUR SET EMAIL ='".$_POST['email']."' WHERE PSEUDO = '".$_SESSION['id_utilisateur']."' ";
            $res = $dbh->query($sql);
            
            
        }
        
        if(isset($_POST['password'])){
            $passwd = md5($_POST['password']);
            $sql = "UPDATE UTILISATEUR SET PASSWORD ='$passwd' WHERE PSEUDO = '".$_SESSION['id_utilisateur']."' ";
            $res = $dbh->query($sql);

            
        }
        //header("Location:dashboardUser.php");
        
            $repertoire_dest = "../IMAGES/";
            $file_path = $repertoire_dest.basename($_FILES["Avatar"]["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($file_path,PATHINFO_EXTENSION));
            echo $file_path ."</br>";
            echo $imageFileType."</br>";
            echo $_FILES["Avatar"]["name"];
            // Check if image file is a actual image or fake image

                $check = getimagesize($_FILES["Avatar"]["tmp_name"]);
                if($check !== false) {
                    echo "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    echo "File is not an image.";
                    $uploadOk = 0;
                }

                // Check if file already exists
                if (file_exists($file_path)) {
                    echo "Sorry, file already exists.";
                    $sql = "UPDATE UTILISATEUR SET AVATAR ='".$file_path."' WHERE PSEUDO = '".$_SESSION['id_utilisateur']."' ";
                    $res = $dbh->query($sql);
                    $uploadOk = 0;
                }
                
                if ($_FILES["Avatar"]["size"] > 500000) {
                    echo "Sorry, your file is too large.";
                    $uploadOk = 0;
                }

                if ($uploadOk == 0) {
                    echo "Sorry, your file was not uploaded.";
                // if everything is ok, try to upload file
                } else {
                    if (true) {
                        move_uploaded_file($_FILES["Avatar"]["tmp_name"],$file_path);
                        echo "The file ". basename( $_FILES["Avatar"]["name"]). " has been uploaded.";
                        $sql = "UPDATE UTILISATEUR SET AVATAR ='".$file_path."' WHERE PSEUDO = '".$_SESSION['id_utilisateur']."' ";
                        $res = $dbh->query($sql);
                    } else {
                        echo "Sorry,".$_FILES["Avatar"]["error"]." there was an error uploading your file.";
                    }
                }
          header("Location:dashboardUser.php");


            
    }

?>