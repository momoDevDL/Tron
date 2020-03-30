<?php
require_once('ConnexionBD.php');
if(!isset($_SESSION)){session_start();}
$PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
// $res= $dbh->query("SELECT EMAIL FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
$PSEUDO_ADVERSAIRE = $_POST['pseudoAdv'];

$res= $dbh->query("SELECT * FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
$res2= $dbh->query("SELECT * FROM UTILISATEUR WHERE PSEUDO='$PSEUDO_ADVERSAIRE'");


foreach($res as $row){

  $email = $row['EMAIL'];https://www.tutorialspoint.com/json/json_php_example.htm
  $role = $row['ROLE'];
  $niveau = $row['NIVEAU'];
  $mmr= $row['MMR'];
  $couleurG = $row['COULEUR_GENTIL'];
  $couleurM = $row['COULEUR_MECHANT'];
  $mdp= $row['PASSWORD'];
  $avatar = $row['AVATAR'];
} 
foreach($res2 as $row){
  $email_adv = $row['EMAIL'];
  $role_adv = $row['ROLE'];
  $niveau_adv = $row['NIVEAU'];
  $mmr_adv = $row['MMR'];
  $couleurG_adv = $row['COULEUR_GENTIL'];
  $couleurM_adv = $row['COULEUR_MECHANT'];
  $avatar_adv = $row['AVATAR'];
} 
echo   "
<div id='User-dashboard'>
<p id='logo'>LCF</p>
<span id='ScoreBanner'>
  <h3 id='score'> SCORE : </h3>
  <div id='container'>
    
      <div id='playerOne'>
        <h3>5</h3>
     </div>
    
      <div id='playerTwo'>
        <h3>5</h3>
     </div>
    
  </div>
</span>      
<div id='logOut'>
    <a href='dashboardUser.php'>Quitter</a>
</div> 
  
</div>
  
</div>

<div id='game'>

      <div id='damier'>
      </div>

     <div id='User-info'>

          <div id='homePlayerInfo'>
          
          <div id='avatar'>
              <img src=".$avatar." width='100px' height='100px'>
              </div>
              <div class='niveauMmr'>
                  <p>Niveau : $niveau</p>
              <p>MMR :$mmr</p>
              </div>
              <div id='info-profile'>
              <p id='pseudo'>Pseudo : $PSEUDO</p>
              </div>
          </div>
          
          <div id='AwayPlayerInfo'>
          
          <div id='avatar'>
              <img src=".$avatar_adv." width='100px' height='100px'>
              </div>
              <div class='niveauMmr'>
                  <p>Niveau : $niveau_adv</p>
              <p>MMR :$mmr_adv</p>
              </div>
              <div id='info-profile'>
              <p id='pseudo'>Pseudo : $PSEUDO_ADVERSAIRE</p>
              </div>
          </div>
     </div>
     
</div> ";
?>
