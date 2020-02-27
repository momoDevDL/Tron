<html>
  <head>
    <meta charset="UTF-8" />
     
    <title> Client web socket (ou presque) </title>
    <style type="text/css"> td {padding: 20px; } </style>

    <script src="../JS/node_modules/socket.io-client/dist/socket.io.js"></script>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    
    <!--script src="../JS/game-client.js" type="text/javascript">
    </script-->
  </head>

  <body id="main"> 
  <h1 id='tmp'>Temps de Jeu :</h1> <!-- Vous avez pu initier la création du damier autrement -->
     <div>
        Rejoindre la partie <input type="text" name="joueur"> </input> <button onClick="rejoindrePartie()"> Hello </button>
        <br/>
        Quitter les vivants <button onClick="quitterPartie()"> Bye Bye </button><br/><br/>
        <table>
          <td> Joueur 1 : <label id="joueur0"> </label> </td>
          <td> Joueur 2 : <label id="joueur1"> </label> </td>
          <td> Joueur 3 : <label id="joueur2"> </label> </td>
          <td> Joueur 4 : <label id="joueur3"> </label> </td>
        </table>
        <br/>
     </div>
     
     <div id="damier">
     </div>

     <button id="Space">Space</button><label id="etatSpace">Ready</label>

     <script src="../Jeu/config.js"></script>
     <script src="../Jeu/objet.js"></script>
     <script src="../Jeu/Plateau.js"></script>
     <!--script>
        //QUESTION A POSER : IL SEMBLERAIT QUE LE EU "LAG" PLUS QUAND LES OUTILS DEV NE SONT PAS ACTIVES :(
         // INITIALISATION DU PLATEAU DE JEU
      let pl = new Plateau();
      let x0,y0; var touches = [];
      var timer = TMP_PARTIE;
      var svgContainer = d3.select("#damier").append("svg").attr("width",PL_NBCOL*PL_L).attr("height",PL_NBLIG*PL_L);
      pl.newPlateau(PL_L,PL_NBCOL,PL_NBLIG);
      pl.newGrandeCases(PL_NBCOL*PL_L,PL_NBLIG*PL_L,5,5);
      
     
      var moto1;
      var moto2;
      var timerMur = 0;
      var murActif = false;

      
      
      InitGame();
      defEvent(moto2);
     var myVar = setInterval(Frame, INTERVAL);
      



   
     </script-->

  </body>
</html>
