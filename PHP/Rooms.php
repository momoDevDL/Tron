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
";
echo $resultat;
?>