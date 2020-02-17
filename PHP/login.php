<?php
session_start();
if(!(isset($_SESSION['ErreurPassword']))){
    $_SESSION['ErreurPassword']= "false";
}
if(!(isset($_SESSION['pseudoExistant']))){
    $_SESSION['pseudoExistant']= "false";
}
 
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TronLogInPage</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet">  
    <link rel="stylesheet" href="../CSS/login.css">
    <script src="../JS/jquery-3.4.1.min.js"></script>
    <script src="https://kit.fontawesome.com/e2aac98496.js" crossorigin="anonymous"></script>
</head>
<body class="col-md-12">  
    

    
        <div id="formulaire">
        <h1 class="col-md-12">AUTHENTIFICATION</h1>
            <form id="logInForm" action='loginScript.php' method='POST'>
            <?php
    
        if($_SESSION["pseudoExistant"] == "true"){
            echo"<input type='hidden' name='erreur' value='true'/><br />";
            $_SESSION["pseudoExistant"]="false";
        }else{
        echo"<input type='hidden' name='erreur' value='false'/><br />";
        }
    

    
        if($_SESSION['ErreurPassword'] == "true"){
            echo"<input type='hidden' name='erreur' value='true'/><br />";
            $_SESSION['ErreurPassword']="false";
        }else{
        echo"<input type='hidden' name='erreur' value='false'/><br />";
        }
    
    ?>
                <input type="text" name="user_name" placeholder="pseudo">
                <span class="bar"></span>            
                <input type="password" name="password" placeholder="mot de passe">
                <span class="bar"></span>
               
                <button type="submit" id="submit" name="submit" class="btn btn-primary btn-lg" value="Soumettre">Soumettre</button>
                <div id="links">
                    <a href="../index.php">Revenir à l'acceuil</a>
                    <a id="signUp" href="#">Créer un compte</a>
                </div> 
            </form>
            
        </div>
        <script src="../JS/logIn.js"></script>
</body>
</html>