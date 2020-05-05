<?php
    require_once('ConnexionBD.php');
    if(!isset($_SESSION)){session_start();}
    $PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
    $ROLE =  isset($_SESSION['id_role']) ? $_SESSION['id_role'] : 0;
    $res2= $dbh->query("SELECT * FROM UTILISATEUR");
    
    function niveau($experience){
        $niveau = 1;
        $exp = $experience;
	
	while ($exp > 0){
		if($niveau < 8){
			$exp = $exp - 256;
		}else if($niveau < 16){
			$exp = $exp - 512;
		}else if($niveau < 32){
			$exp = $exp - 1024;
		}else if($niveau < 64){
			$exp = $exp - 2048;
		}else if($niveau < 128){
			$exp = $exp - 4096;
		}else {
			$exp = $exp - 8192;
		}
		$niveau++;
	}
	if ($exp < 0){
		$niveau--;
	}
	return $niveau;
}
      
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LfcDashboard</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet">  
    <link rel="stylesheet" href="../CSS/dashboard.css">
    <script type="text/javascript">
    var Replay = '<?php if( isset($_SESSION['replay'])){
        $replay = $_SESSION['replay'] ;
        $_SESSION['replay'] = 'false';
       echo $replay == 'false' ? 'false' : 'true' ;
    }?>';
    </script>
    <script src="../JS/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script src="../JS/jquery-3.4.1.min.js"></script>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="../JS/config.js"></script>
     <script src="../JS/objet.js"></script>
     <script src="../JS/Plateau.js"></script>
    <script src='../JS/dashboard.js'></script> 
    <script src="https://kit.fontawesome.com/e2aac98496.js" crossorigin="anonymous"></script>
    
</head>


<body id="main">
<div id='rechercheMatch' style="display:none">
<p>Recherche d'adversaire en cours . . .</p>
</div>
    <div id="User-dashboard">
        <p id="logo">LCF</p>
        <div id="links">
        <a href="../index.php">Acceuil</a>
            <a>Jouer Vs IA</a>
            <a id="1V1">Jouer En Ligne</a>
            <a>Mes Tournois</a>
            <?php 
                if($ROLE == 'ADMIN'){
                    echo " <a href='ListOfPlayers.php'>Liste des joueurs</a>
                    <a id='PartiesEnCours'>Parties En cours</a> ";
                }
            ?>
        </div>
        <div id="logOut">
            <a href="logout.php">Se deconnecter</a>
        </div> 
          
    </div>
    <section id="intro">
    <h1>LCF</h1>
    <div id="PlayersList">
 <?php

 foreach($res2 as $row){
        $PSEUDO = $row['PSEUDO'];
        $email = $row['EMAIL'];
        $role = $row['ROLE'];
        $elo= $row['ELO'];
        $XP = $row['EXPERIENCE'];
        $couleurG = $row['COULEUR_GENTIL'];
        $couleurM = $row['COULEUR_MECHANT'];
        $mdp= $row['PASSWORD'];
        $avatar = $row['AVATAR'];
        $niveau = niveau($XP);
        echo "
        <div id='PlayersCard'>
        <div id='infoPlayer'>
        <div id='PlayerAvatar'>
        <img src=".$avatar." width='100%' height='200px'>
        </div>
        <div class='mmr'>
            <p>Niveau : $niveau</p>
            <p>MMR :$elo</p>
        </div>
        </div>
        <div id='PseudoPlayer'>
        <p id='pseudo'>$PSEUDO</p>
        </div>
        </div>";
    } 
?>
    </div>
     </section>

 <section>

    <div id="Contact">
        <div id="contact-container">
          <div id="contact-form">
              <h2>Contactez-nous</h2>
              <form method="post" action='contact-submit.php'> 
              <label for="first-name"> Prénom:  </label>
                  <input type="text" name="first-name" placeholder="First-Name">
</br>
              
              <label for="last-name"> Nom :  </label>
                  <input type="text" name="last-name" placeholder="Last-Name">
              
</br> 
              <label for="email"> Email :  </label>
                  <input type="text" name="email" value='<?php echo $email;?>'  required></br>
          
              <label class="emailContent" for="emailContent" >Contenu de message:  </label></br>
                  <textarea class="emailContent" name="emailContent"  placeholder="text"></textarea></br>
                  <input id='submitContactForm' type='submit' name='submit' class='btn btn-primary' value="Submit">
              
              </form>
          </div>
      
      </div>
         <div id="membre">
             <h3>Membres</h3>
              <span class="dot col-sm-6">
              <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
              <img src='../IMAGES/31543101_102282713975787_7975195690995286016_o.jpg' width='150px' height='150px'/>
                </span>
            <span class="dot col-sm-6">
            <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
            <img src='../IMAGES/40313576_642691499489932_8305937623378034688_o.jpg' width='150px' height='150px'/>
            </span>
            <span class="dot col-sm-6">
            <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
            <img src='../IMAGES/23004546_713516668850307_9057302007055486628_o.jpg' width='150px' height='150px'/>
        </span>
            <span class="dot col-sm-6">
            <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
            <img src='../IMAGES/48380390_342138316604462_2327487200549142528_o.jpg' width='150px' height='150px'/>
            </span>
            <p>ALL COPYRIGHTS RESERVED @2020</p>
        </div>
        
    </div>
    
    </section>
