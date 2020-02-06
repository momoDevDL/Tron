<?php
    require_once('ConnexionBD.php');
    if(!isset($_SESSION)){session_start();}
    $PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
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
            <a>Mon profile</a>
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
          <div id="profil-form">
              <h2>Profil</h2>
              <form method="post" > 
              <label for="first-name"> Prénom:  </label>
                  <input type="text" name="first-name" placeholder="First-Name">
            
              
              <label for="last-name"> Nom :  </label>
                  <input type="text" name="last-name" placeholder="Last-Name">
              
      
              <label for="email"> Email :  </label>
                  <input type="text" name="email" placeholder="exemple@exemple.com"></br>
          
              <label class="emailContent" for="emailContent">Contenu de message:  </label></br>
                  <textarea class="emailContent" name="emailContent" placeholder="text"></textarea></br>
              <input id='submitContactForm' type='submit' name='submit' class='btn btn-primary' value="Submit">
              
              </form>
          </div>
      
      </div>
    </div>

    <div id="Tournois">
        <div id="TournoiContainer">
        <h2>Tournois</h2>
        <div id="TournoiInfo">
        <p>Pseudo :<?php echo $PSEUDO ;?></p>
        </div>

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
    </div>

    </section>

    
    
      
      <script src="../JSON/jquery-3.4.1.min.js" type="text/javascript"></script>
      <script src="../JS/dashboard.js"></script>
      
</body>
</html>