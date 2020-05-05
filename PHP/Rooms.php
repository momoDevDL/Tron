<?php
if(!isset($_SESSION)){session_start();}
$PSEUDO= isset($_SESSION['id_utilisateur']) ? $_SESSION['id_utilisateur'] : 0;
$Rooms = json_decode($_POST['R']);
$resultat ="<div id='rechercheMatch' style='display:none'>
<p>Recherche d'adversaire en cours . . .</p>
</div>
<div id='User-dashboard'>
<p id='logo'>LCF</p>
<div id='links'>
<a href='../index.php'>Acceuil</a>
<a>Jouer Vs IA</a>
<a id='1V1'>Jouer En Ligne</a>
<a>Mes Tournois</a>
<a href='ListOfPlayers.php' id='ListeJoueurs'>Liste des Joueurs</a>
<a href='dashboardUser.php'>MonDashboard</a>
</div>
<div id='logOut'>
<a href='logout.php'>Se deconnecter</a>
</div> 
  
</div>
<section id='sectionRooms'>
<div class='RoomsRow'>
";
foreach($Rooms as $room) { 
    $resultat .= " <div class='RoomsCards'>
    <div class='RoomsData'>
    <p>ID_Partie: ".$room->idPartie."</p>
    <p>player1: ".$room->p1."</p>
    <p>player2: ".$room->p2."</p>
    <p>score: p1 [".$room->score[0]."] / p2 [".$room->score[1]."]</p>
    </div>
    <div class='RoomsTitle'>
        <p>".$room->name."</p>
    </div>
</div>";
}

$resultat .="
</div>
</section>
<section>

<div id='Contact'>
    <div id='contact-container'>
      <div id='contact-form'>
          <h2>Contactez-nous</h2>
          <form method='post' action='contact-submit.php'> 
          <label for='first-name'> Prénom:  </label>
              <input type='text' name='first-name' placeholder='First-Name'>
</br>
          
          <label for='last-name'> Nom :  </label>
              <input type='text' name='last-name' placeholder='Last-Name'>
          
</br> 
          <label for='email'> Email :  </label>
              <input type='text' name='email' value='".$email."'  required></br>
      
          <label class='emailContent' for='emailContent' >Contenu de message:  </label></br>
              <textarea class='emailContent' name='emailContent'  placeholder='text'></textarea></br>
              <input id='submitContactForm' type='submit' name='submit' class='btn btn-primary' value='Submit'>
          
          </form>
      </div>
  
  </div>
     <div id='membre'>
         <h3>Membres</h3>
          <span class='dot col-sm-6'>
          <img class='in' src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
          <img src='../IMAGES/31543101_102282713975787_7975195690995286016_o.jpg' width='150px' height='150px'/>
            </span>
        <span class='dot col-sm-6'>
        <img class='in' src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
        <img src='../IMAGES/40313576_642691499489932_8305937623378034688_o.jpg' width='150px' height='150px'/>
        </span>
        <span class='dot col-sm-6'>
        <img class='in' src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
        <img src='../IMAGES/23004546_713516668850307_9057302007055486628_o.jpg' width='150px' height='150px'/>
    </span>
        <span class='dot col-sm-6'>
        <img class='in' src='../IMAGES/linkdn.jpeg' width='150px' height='150px'/>
        <img src='../IMAGES/48380390_342138316604462_2327487200549142528_o.jpg' width='150px' height='150px'/>
        </span>
        <p>ALL COPYRIGHTS RESERVED @2020</p>
    </div>
    
</div>

</section>
";
echo $resultat;
?>