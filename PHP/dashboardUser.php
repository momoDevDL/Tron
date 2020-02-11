<?php
    require_once('ConnexionBD.php');
    if(!isset($_SESSION)){session_start();}
    $PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
   // $res= $dbh->query("SELECT EMAIL FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
    
    $res2= $dbh->query("SELECT * FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
    /*$res3= $dbh->query("SELECT NIVEAU FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
    $res4= $dbh->query("SELECT MMR FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
    $res5= $dbh->query("SELECT COULEUR_GENTIL FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
    $res6= $dbh->query("SELECT COULEUR_MECHANT FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");*/
    
    foreach($res2 as $row){
        $PSEUDO = $row['PSEUDO'];
        $email = $row['EMAIL'];
        $role = $row['ROLE'];
        $niveau = $row['NIVEAU'];
        $mmr= $row['MMR'];
        $couleurG = $row['COULEUR_GENTIL'];
        $couleurM = $row['COULEUR_MECHANT'];
        $mdp= $row['PASSWORD'];
        $avatar = $row['AVATAR'];
    } 

    $sql =" SELECT T.ID_TOURNOI,T.TITRE_EVENEMENTS,T.DATE_DEBUT,T.TYPE_TOURNOI FROM INSCRIT I,TOURNOI T WHERE I.ID_TOURNOI = T.ID_TOURNOI AND PSEUDO = '$PSEUDO' ORDER BY T.DATE_DEBUT DESC ";
    $res7 = $dbh->query($sql);
    $tabTournoi;
    
    foreach($res7 as $row){
       $tabTournoi[]= array("ID"=>$row['ID_TOURNOI'],"TITRE"=>$row['TITRE_EVENEMENTS'],"DD"=>$row['DATE_DEBUT'],"TYPE"=>$row['TYPE_TOURNOI']);
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
    <script src="../JS/jquery-3.4.1.min.js"></script>
    <script src="https://kit.fontawesome.com/e2aac98496.js" crossorigin="anonymous"></script>
</head>
<body>
    <div id="User-dashboard">
        <p id="logo">LCF</p>
        <div id="links">
            <a href="../index.php">Acceuil</a>
            <a>Jouer Vs IA</a>
            <a>Jouer En Ligne</a>
            <a>Mes Tournois</a>
            <a id="Joueur">Mon profile</a>
        </div>
        <div id="logOut">
            <a href="logout.php">Se deconnecter</a>
        </div> 
          
    </div>
    <section id="intro">
    <h1>LCF</h1>
    <button type='button' id="playIAButton" class='btn btn-primary btn-lg'>JOUER MAINTENANT</button>
     </section>

     <section id="profil">

     <div id="Info">

     <div id="Profil">
        <div id="profil-container">
        <h2>Profil</h2>
            <div id="avatar">
            <img src='<?php echo $avatar;?>' width="200px" height="200px">
            </div>
            <div class="niveauMmr">
                <p>Niveau : <?php echo $niveau; ?></p>
            <p>MMR : <?php echo $mmr; ?></p>
                </div>
            <div id="info-profile">
            <p id="pseudo">Pseudo : <?php echo $PSEUDO; ?></p>
            <p id="email" >email : <?php echo $email; ?></p>
            <p id="mdp" >mot de passe :<?php for($i=0 ;$i < strlen($mdp) ;$i++){
                echo '*';
            } ?></p>
                <p id="couleur_g">AUTOBOTS : <?php echo $couleurG; ?></p>
                <p id="couleur_m">DECEPTICONS : <?php echo $couleurM; ?></p>
               
            </div>
            <button id='modifyProfile' class='btn btn-primary'>Modifier</button>
      </div>
    </div>

    <div id="Tournois">
        <div id="TournoiContainer">
        <h2>Tournois</h2>
        <?php 
        switch(sizeof($tabTournoi)){
            case 0:
                echo "<p id='aucunTournoi'>VOUS N'ETES PAS INSCRIT DANS UN DE NOS PROCHAINS TOURNOIS</p>
                <button id='ConsulterTournoi' >INSCRIVEZ-VOUS MAINTENANT</button>";
            break;
            default:
            echo "<div id='TournoiInfo'>";
            for( $i = 0 ; $i < sizeof($tabTournoi) ; $i++ ){
             
             echo "<div class='detailsTournoi'>
                 <h4>
                    ".$tabTournoi[$i]['TITRE']."
                 </h4>
                 <p>".$tabTournoi[$i]['DD']."</p>
                 <button class='afficheDetailsTournoi' id='".$tabTournoi[$i]['ID']."'>savoir plus</button>
             </div>" ;
            }
             echo "</div>";
        break;
        }
        
        ?>
       
        </div>
    </div>

     <div class="StatsRow">
        <div class="statsCards">
            <div class="statsData">
            <p>
                <?php
                    $sql = "SELECT COUNT(*) as NBPARTIETOTAL FROM PARTIE WHERE JOUEUR_1 = '$PSEUDO' OR JOUEUR_2 = '$PSEUDO' ";
                    $res= $dbh->query($sql);
                    foreach($res as $row)
                    echo $row['NBPARTIETOTAL'];
                ?>
            </p>
            </div>
            <div class="statsTitle">
                <p>Nombre de partie joué</p>
            </div>
        </div>
        
        <div class="statsCards">
            <div class="statsData">
                <p>
                    <?php
                $sql = "SELECT COUNT(*) as NBPARTIEG FROM PARTIE WHERE ( JOUEUR_1 = '$PSEUDO' OR JOUEUR_2 = '$PSEUDO' )AND GAGNANT = '$PSEUDO' ";
                $res= $dbh->query($sql);
                foreach($res as $row)
                    echo $row['NBPARTIEG'];
                    ?>
                </p>
            </div>
            <div class="statsTitle">
                <p>Nombre de partie gagnée</p>
            </div>
        </div>

        <div class="statsCards">
            <div class="statsData">
                <p>
                <?php
                $sql1 = "SELECT COUNT(*) as NBPARTIEG FROM PARTIE WHERE ( JOUEUR_1 = '$PSEUDO' OR JOUEUR_2 = '$PSEUDO' )AND GAGNANT = '$PSEUDO' ";
                $sql2= "SELECT COUNT(*) as NBPARTIETOTAL FROM PARTIE WHERE JOUEUR_1 = '$PSEUDO' OR JOUEUR_2 = '$PSEUDO' ";
                $res1= $dbh->query($sql1);
                $res2= $dbh->query($sql2);
                foreach($res1 as $row1)
                    $pgaigne = $row1['NBPARTIEG'];

                foreach($res2 as $row2)
                    $ptot = $row2['NBPARTIETOTAL'];
                $taux =  floatval($pgaigne)/floatval($ptot) *100;
                echo round($taux ).'%';
                    ?>
                </p>
            </div>
            <div class="statsTitle">
                <p>Taux de partie gagnée</p>
            </div>
        </div>

        <div class="statsCards">
            <div class="statsData">
                <p>
                <?php
               $sql = "SELECT COUNT(*) as NBPARTIEIA FROM PARTIE WHERE ( JOUEUR_1 = '$PSEUDO' OR JOUEUR_2 = '$PSEUDO' )AND TYPE_MATCH='IA'";
               $res= $dbh->query($sql);
               foreach($res as $row)
                   echo $row['NBPARTIEIA'];
                    ?>
                </p>
            </div>
            <div class="statsTitle">
                <p>Nombre de partie Vs IA</p>
            </div>
        </div>
        
    </div>

    </div>
     </section>
     
    <section>

    <div id="Contact">
        <div id="contact-container">
          <div id="contact-form">
              <h2>Contactez-nous</h2>
              <form method="post" > 
              <label for="first-name"> Prénom:  </label>
                  <input type="text" name="first-name" placeholder="First-Name">
</br>
              
              <label for="last-name"> Nom :  </label>
                  <input type="text" name="last-name" placeholder="Last-Name">
              
</br> 
              <label for="email"> Email :  </label>
                  <input type="text" name="email" placeholder="exemple@exemple.com"></br>
          
              <label class="emailContent" for="emailContent">Contenu de message:  </label></br>
                  <textarea class="emailContent" name="emailContent" placeholder="text"></textarea></br>
                  <input id='submitContactForm' type='submit' name='submit' class='btn btn-primary' value="Submit">
              
              </form>
          </div>
      
      </div>
         <div id="membre">
             <h3>Membres</h3>
              <span class="dot">
              <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
              <img src='../IMAGES/31543101_102282713975787_7975195690995286016_o.jpg' width='150px' height='150px'/>
                </span>
            <span class="dot">
            <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
            <img src='../IMAGES/40313576_642691499489932_8305937623378034688_o.jpg' width='150px' height='150px'/>
            </span>
            <span class="dot">
            <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
            <img src='../IMAGES/23004546_713516668850307_9057302007055486628_o.jpg' width='150px' height='150px'/>
        </span>
            <span class="dot">
            <img class="in" src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
            <img src='../IMAGES/48380390_342138316604462_2327487200549142528_o.jpg' width='150px' height='150px'/>
            </span>
            <p>ALL COPYRIGHTS RESERVED @2020</p>
        </div>
        
    </div>
    
    </section>

      <script src="../JS/dashboard.js"></script>
      
</body>
</html>