<?php
require_once('ConnexionBD.php');
if(!isset($_SESSION)){session_start();}
$PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
// $res= $dbh->query("SELECT EMAIL FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
$PSEUDO_ADVERSAIRE = $_POST['pseudoAdv'];

$res= $dbh->query("SELECT * FROM UTILISATEUR WHERE PSEUDO='$PSEUDO'");
$res2= $dbh->query("SELECT * FROM UTILISATEUR WHERE PSEUDO='$PSEUDO_ADVERSAIRE'");


foreach($res as $row){

  $email = $row['EMAIL'];
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
<div id='FinDePartiePopUp' style='display:none;'>
    <div id='popUp'>
      <h3 id='popUpTitle' ></h3>
      <div id='popUpAction'>
      <button class='btn btn-primary' id='rejouer'>Rejouer</button>
      <button class='btn btn-secondary' id='quitter'>Quitter</button>
      </div>
    </div>
</div>
<div id='User-dashboard'>
<p id='logo'>LCF</p>
<span id='ScoreBanner'>
  <h3 id='score'> SCORE : </h3>
  <span id='gameInfo_firstRow'>

    <div id='timer'>
      <h5>Decompte Demarrage :</h5>
      <p id='timer_partie'> 00:00</p>
    </div>

    <div id='manche'>
    <h5>nbr de manche :</h5>
    <p id='nbr_manche'> 00:00 </p>
    </div>
  </span>

  <span id='gameInfo_SecondRow'>

    <div id='time'>
    <h5>Temp de partie</h5>
    <p id='tmp'> 00:00 </p>
    </div>
     
  </span>

  <div id='container'>
  
      <div id='playerOne'>
      0
     </div>
    
      <div id='playerTwo'>
      0
     </div>
    
  </div>
</span>      
<div id='logOut'>
    <a href='dashboardUser.php'>Quitter</a>
</div> 
  
</div>
  
</div>

<div id='game'>

<div id='damier'> </div>

     <div id='User-info'>

          <div id='homePlayerInfo'>
          
          <div id='avatar'>
              <img src=".$avatar." width='100px' height='100px'>
              </div>
              <div class='mmr'>
                  <p>Niveau : $niveau</p>
                  <p>MMR :$mmr</p>
              </div>
              <div id='info'>
              <p id='pseudo'>Pseudo : $PSEUDO</p>
              </div>
          </div>
          
          <div id='AwayPlayerInfo'>
          
          <div id='avatar'>
              <img src=".$avatar_adv." width='100px' height='100px'>
              </div>
              <div class='mmr'>
                  <p>Niveau : $niveau_adv</p>
                  <p>MMR :$mmr_adv</p>
              </div>
              <div id='info'>
              <p id='pseudo'>Pseudo : $PSEUDO_ADVERSAIRE</p>
              </div>
          </div>
     </div>
     
</div> ";
?>
