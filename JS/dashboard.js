
    let indiceRoom = -1 ;
    let ID_joueur = -1;
    var nbTentatives = 1;
    var reconnect;
    var rangeTmp;

    var touches = [];
    var timer = TMP_PARTIE;
    
    let moto1;
    let moto2;
    let score = [ 0 , 0 ]; // [score de J2 ,score de J1]
    
    var socket;
    var timerMur = 0;
    var murActif = false;
    var pl;
    var svgContainer;
    var ID_Partie;
    var pseudoAdv;
    var nbrManche = NBR_MANCHE;
    var finManche = false;
    
$(document).ready(function(){

    $('body').on("click","#modifyProfile",function(){
        let niveau = $('.niveauMmr p:first').html();
        let mmr =$('.niveauMmr p:last').html();
        let pseudo = $('#pseudo').text();
        let email= $('#email').text();
        //let mdp = $('#mdp').text();
        let couleur_g = $('#couleur_g').text();
        let couleur_m = $('#couleur_m').text();
        let avatar = $('#avatar img').attr('src');

        $.ajax({
            url:"modifyProfileScript.php",
            method:"POST",
            data: {niveau: niveau , mmr: mmr,pseudo: pseudo, email: email,couleur_g: couleur_g , couleur_m: couleur_m, avatar:avatar},
            dataType:"text",
            success:function(data){
                //console.log(data);
                $("#profil-container").html(data);
                },
                complete:function(data){
                    //console.log(data);
                },
                error: function(data){
                    console.log("error");
                    //console.log(data);
                }
        });
    });

    
    $('body').on('click','#PartiesEnCours',()=>{
        socket = io('http://localhost:8888/first-namespace');

        socket.on('connect_error',()=>{
            console.log(socket.connected);
            if(socket.connected == false){
                socket.close();
                alert('Erreur de connexion au serveur');
            }
        });

        socket.on('connect',()=>{
            console.log(socket.connected);
            socket.emit('AdminRequestRooms');
        });

        let RefreshInfo = setInterval(()=>{
            socket.emit('AdminRequestRooms');
        },60000);

        socket.on('Rooms',(Rooms)=>{
            console.log(Rooms);
            $.ajax({
                url : "Rooms.php",
                method : "POST",
                data:{R:JSON.stringify(Rooms)},
                dataType: "text",
                success:function(data){
                    console.log('success getting the rooms');
                    console.log(data);
                    $('#main').html(data);
                },
                complete:function(data){
                 console.log("completed getting the Rooms");
                 console.log(data);
                 
                },
                error: function(data){
                    console.log('error');
                        
                }
                
            });
        });
    });


    $('body').on('click','#1V1',function(){
        
 
        socket = io('localhost:8888/first-namespace');
        
        socket.on('connect_error',()=>{
            console.log(socket.connected);
            if(socket.connected == false){
                socket.close();
                alert('Erreur de connexion au serveur, Veuillez Reessayer');
            }
        });

        function BoutonReady(){
                var btn = document.createElement("button");
                btn.setAttribute("id","btn_ready");
                btn.setAttribute("onclick","socket.emit('joueur_pret',"+ID_joueur+","+indiceRoom+")");
                btn.innerHTML = 'Prêt pour Jouer ?';
                var elem = document.getElementById('damier');
                elem.appendChild(btn);
        }


        function GenerPlateau(){
            document.getElementById('nbr_manche').innerHTML = nbrManche;    
            var elem = document.getElementById("btn_ready");
            elem.parentNode.removeChild(elem);
            pl = new Plateau();
            svgContainer = d3.select('#damier').append('svg').attr('width',PL_NBCOL*PL_L).attr('height',PL_NBLIG*PL_L).attr('id','plateau_');
            pl.newPlateau(PL_L,PL_NBCOL,PL_NBLIG);
            pl.newGrandeCases(PL_NBCOL*PL_L,PL_NBLIG*PL_L,5,5);
            
            socket.emit('CommencerPartie',indiceRoom);

        }

        function DemarePartie(){
            
            InitGame(ID_joueur, indiceRoom);
            defEvent(moto1);
            socket.emit('envoi_de_notre_moto',moto1,indiceRoom);
        }

       
        
        
      socket.on('connect',function(){
        //if( Niveau > 2){
        $('#rechercheMatch').css({
            'position':'fixed',
            'width':'100%', 
            'height':'100vh',
            'z-index':'3',
            'font-size':'24px',
            'background-color':'rgba(62, 74, 75, 0.7)',
            'text-align':'center',
            'justify-content':'center',
        });

        $('#rechercheMatch p').css({
            'color':'white',
            'position':'relative',
            'top':'50%'            
        });

        $('#rechercheMatch').fadeIn(); 
        console.log("========================================");
        console.log(NB_partJoue);
        console.log(Elo);
        console.log(boost);
        console.log(XP);
        console.log("========================================");

        if(PriorityClient)
        socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,0,indiceRoom,nbTentatives,XP,boost);
        else
        socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,250,indiceRoom,nbTentatives,XP,boost);

        //}else{
        /*
             $('#rechercheMatch').css({
            'position':'fixed',
            'width':'100%', 
            'height':'100vh',
            'z-index':'3',
            'font-size':'24px',
            'background-color':'rgba(62, 74, 75, 0.7)',
            'text-align':'center',
            'justify-content':'center',
        });

        $('#rechercheMatch p').css({
            'color':'white',
            'position':'relative',
            'top':'50%'            
        });
         $('#rechercheMatch p').html('Votre niveau ne vous permet pas de jouer en ligne veuillez augmenter votre
         niveau en s'entrainant avec L'IA avant de s'aventurer dans notre mode de jeu en ligne'); 
        $('#rechercheMatch').fadeIn(); 
        */
        //}
      });

      socket.on("MatchIntrouvable",()=>{
        socket.disconnect();
        $('#rechercheMatch p').html("Désolé aucun joueur en ligne ne correspond à vos priorité de recherche "); 
        $('#rechercheMatch').fadeIn();
      });

      socket.on("miseAjourIndRoom",(NouvindRoom)=>{
        clearTimeout(reconnect);
        console.log("mise a jour en cours ...");
        indiceRoom = NouvindRoom;
        switch(nbTentatives){
            case 2:
                reconnect = setTimeout(()=>{
                    if(PriorityClient)
                    socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,0,indiceRoom,nbTentatives,XP,boost);
                    else
                    socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,rangeTmp,indiceRoom,nbTentatives,XP,boost);
            
                },500);
            break;
            case 3:
                reconnect = setTimeout(()=>{
                    if(PriorityClient)
                    socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,0,indiceRoom,nbTentatives,XP,boost);
                    else
                    socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,rangeTmp+3000,indiceRoom,nbTentatives,XP,boost);
            
                },500);
            break;
            }
      });

    socket.on("RelanceDeRecherche",function(range,positionActuelleDansRooms){
        //Relancer la recherche avec le nouveau range au bout d'une minute
        indiceRoom = positionActuelleDansRooms;
        rangeTmp = range ;
        nbTentatives+=1;
       switch(nbTentatives){
        case 2:
            reconnect = setTimeout(()=>{
                if(PriorityClient)
                socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,0,indiceRoom,nbTentatives,XP,boost);
                else
                socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,range,indiceRoom,nbTentatives,XP,boost);
        
            },30000);
        break;
        case 3:
            reconnect = setTimeout(()=>{
                if(PriorityClient)
                socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,0,indiceRoom,nbTentatives,XP,boost);
                else
                socket.emit('CommencerRecherche',Pseudo,PriorityClient,NB_partJoue,Elo,range+3000,indiceRoom,nbTentatives,XP,boost);
        
            },30000);
        break;
        }
    });

    socket.on('clearTimeout',()=>{
        clearTimeout(reconnect);
    });

     socket.on('connectedToRoom',function(indiceRoomS,idjoueur){
        console.log("You Are Connected to Room " + indiceRoomS);
        indiceRoom = indiceRoomS ;
        if(ID_joueur == -1) ID_joueur = idjoueur;
        console.log(ID_joueur);
      });

      socket.on('CommenceBientot',function(pseudos){

        console.log("pseudo 2 est de :" + pseudos.p2);
        console.log("pseudo 1 est de :" + pseudos.p1);

        $("body #rechercheMatch").append("<p id='PartieEnConst'>Votre partie va bientot commencer</p>");

        $("body #PartieEnConst").css({
            'position':'relative',
            'top':'60%',
            'color':'white' 
        });

        pseudoAdv = (pseudos.p2 == Pseudo ? pseudos.p1 : pseudos.p2);

        setTimeout(() => {
            $.ajax({
                url : "LoadGamePage.php",
                method : "POST",
                data : "pseudoAdv=" + pseudoAdv,
                dataType: "text",
                success:function(data){
                    console.log("this is data after loading game page " +data);
                    $('#main').html(data);
                    
                },
                complete:function(data){

                    window.addEventListener("scroll", function (e){
                        e.preventDefault();
                        window.scrollTo(0,0);
                        
                    }, false);
                    
                    if(ID_joueur == 1){
                        $('#playerOne').css(
                            {
                                'background-color':couleurG
                            }
                        );
                        $('#homePlayerInfo').css(
                            {
                                'background-color':couleurG
                            }
                        );
                        socket.emit('couleurAdversaire',couleurG,indiceRoom);
                    }else{
                        $('#playerOne').css(
                            {
                                'background-color':couleurM
                            }
                        );
                        $('#homePlayerInfo').css(
                            {
                                'background-color':couleurM
                            }
                        );
                        socket.emit('couleurAdversaire',couleurM,indiceRoom);
                    }
                    
                    BoutonReady();
                },
                error: function(data){
                        console.log('error Loading GAme Page');
                        console.log(data);
                }
                
            });
        }, 3000);
        
            console.log("===========================LA PARTIE DOIT COMMENCER MNT===================");
      });
      
      socket.on('couleurAdv',function(coul){
        $('#playerTwo').css(
            {
                'background-color':coul
            }
        );
        $('#AwayPlayerInfo').css(
            {
                'background-color':coul
            }
        );
    });



        socket.on("BeginInsertPartie",function(pseudos){
            //console.log("============== Begin Insert ============\n")
            $.ajax({
                url : "InsererPartie.php",
                method : "POST",
                data : {pseudo1: pseudos.p1,pseudo2: pseudos.p2},
                dataType: "text",
                success:function(data){
                    //console.log("L'id de la partie :"+data);
                    if(data != "null"){
                        ID_Partie = data;
                        socket.emit('EnvoiIdPartieAutreJoueur',ID_Partie,indiceRoom);
                        }
                },
                complete:function(data){
                    console.log("L'id de la partie :"+data);
                    
                },
                error: function(data){
                        console.log('error');
                        console.log(data);
                }
                
            });
        });
      
        socket.on("RecvIdPartie",function(id){
            console.log("l'id de la partie reçu par l'autre joueur est : "+ id );
            ID_Partie = id ;
        });
        

        socket.on('generer_partie',function(){
            console.log("je genere la partie");
            GenerPlateau();
        });

        //il faut arriver à récupérer la moto du joueur adverse
        socket.on('moto_autre_joueur', function(motoE){
            moto2 = new Moto(motoE.id_player);
            moto2.dessinerMoto();
            socket.emit('ok_pret', indiceRoom, TMP_PARTIE, INTERVAL);
        });

        //socket qui affiche le décompte avant le lancement de la manche
        socket.on('decompte_avant_demarage_parti', function(seconde_left){
            document.getElementById('timer_partie').innerHTML = seconde_left;
        });

        //socket qui est appelé toutes les 20 ms pour raffraichir les motos
        socket.on('frame', function(seconde){
            Frame(moto1,moto2);
            document.getElementById('tmp').innerHTML = seconde;
        });

        //quand les deux joueurs sont pret on lance la partie
        socket.on('lance_partie', function(){
            finManche = false;
            DemarePartie();
        });

         //nous alerte lors d'une collision de nous ou de l'autre joueur
        socket.on('fin_manche', function(sc1,sc2){
            finManche = true;
            console.log("=========================FIN DE MANCHE===============  ");
            console.log(sc1);
            console.log(sc2);
            console.log(ID_joueur);
            score[0] += sc1;
            score[1] += sc2;

            if(ID_joueur == 1){    
                console.log(score);
                document.getElementById('playerOne').innerHTML = score[0];
                document.getElementById('playerTwo').innerHTML = score[1];
            }else{
                console.log(score); 
                document.getElementById('playerOne').innerHTML = score[1];
                document.getElementById('playerTwo').innerHTML = score[0];
            }
            
            moto1 = null;
            moto2 = null;
            svgContainer = null;
            pl = null;
            var elem = document.getElementById('plateau_');
            elem.parentNode.removeChild(elem);
            nouvellePartie();
        });

        
         /**
         lorsque on recoit le message du serveur comme quoi un joueur à bougé deux cas : 
         premier cas c'est nous alors on Update juste les deux motos
         deuxième cas on regarde si l'id de l'objet passé en paramètre est bien l'id de la moto adverse et dans ce cas on lui donne les arguments (de plus si la trainé est activé on la dessine)
         et ensuite on Update les deux motos
         */
        socket.on('update_joueur', function(moto_1,moto_2){
            if(moto2.id_player == moto_1.id_player ){
                moto2.X = moto_1.X;
                moto2.Y = moto_1.Y;
                moto2.ori = moto_1.ori;
                moto2.rot = moto_1.rot;
                moto2.speedX = moto_1.speedX;
                moto2.speedY = moto_1.speedY;
                moto2.train_act = moto_1.train_act;

                if(moto2.train_act){
                    pl.transformeCase(moto2.X+5,moto2.Y+25,moto2.color,'mur'); //permet de créer la trainée de la moto
                }
            }else{
                moto2.X = moto_2.X;
                moto2.Y = moto_2.Y;
                moto2.ori = moto_2.ori;
                moto2.rot = moto_2.rot;
                moto2.speedX = moto_2.speedX;
                moto2.speedY = moto_2.speedY;
                moto2.train_act = moto_2.train_act;

                if(moto2.train_act){
                    pl.transformeCase(moto2.X+5,moto2.Y+25,moto2.color,'mur'); //permet de créer la trainée de la moto
                }
            }
            Update(moto2);  Update(moto1);
        });

        function nouvellePartie(){
            console.log("======================nouvelle manche=============================");
            nbrManche--;
            if(nbrManche <= 0 || (nbrManche == 1 && (score[0] >= 2 || score[1] >= 2)) ){
                document.getElementById('nbr_manche').innerHTML = 'Fin de la partie';
                console.log("FIN DE PARTIE");
                socket.emit('score', NBR_MANCHE,score[ID_joueur-1], ID_joueur, indiceRoom,NB_partJoue,Elo,XP);
            }else{
                BoutonReady();
            }
        }

        socket.on('vainceur', function(sc1, sc2){
            let gagnant ='null';
            let sc = 0 ;
            if(ID_joueur==1){
                document.getElementById('FinDePartiePopUp').style.display = 'block';
                if(sc1 > sc2){
                    document.getElementById('popUpTitle').innerHTML = "Vous avez Gagnez !!";
                    gagnant = Pseudo;
                    sc = sc1;
                }else if(sc1 < sc2){
                    document.getElementById('popUpTitle').innerHTML = "Vous avez perdu...";
                    gagnant = pseudoAdv;
                    sc = sc2;
                }else{
                    document.getElementById('popUpTitle').innerHTML = "Egalité !!!";
                }
            }else{
                document.getElementById('FinDePartiePopUp').style.display = 'block';
                if(sc1 < sc2){
                    document.getElementById('popUpTitle').innerHTML = "Vous avez Gagnez !!";
                    gagnant = Pseudo;
                    sc = sc2 ;
                }else if(sc1 > sc2){
                    document.getElementById('popUpTitle').innerHTML = "Vous avez perdu...";
                    gagnant = pseudoAdv ;
                    sc = sc1 ;
                }else{
                    document.getElementById('popUpTitle').innerHTML = "Egalité !!!";
                }
            }

            //console.log(sc);

            $.ajax({
                url : "InsererGagnant.php",
                method : "POST",
                data : {vainceur:gagnant,idPartie:ID_Partie,scorefinal:sc},
                dataType: "text",
                
                success:function(data){
                    console.log('success Inserting game in data base');
                    console.log('data');
                },

                complete:function(data){
                    console.log("insertion de gagnant completed ");
                    console.log(data);
                },

                error: function(data){
                        console.log('error Inserting winner');
                        console.log(data);
                }
                
            });

            socket.emit("FinDePartie");

        });

            socket.on('QuitterOuRejouer',()=>{
                socket.emit('clearInterval');
                //console.log("ID_PARTIE = "+ ID_Partie);
                //console.log("INDICE ROOM = "+ indiceRoom);
                
                $('body').on('click','#rejouer',()=>{
                    console.log('RejouerClicked');
                    console.log(ID_Partie);
                    console.log(indiceRoom);
                    socket.emit("Rejouer",ID_Partie,indiceRoom);
                });

                $('body').on('click','#quitter',()=>{
                    console.log('QuitterClicked');
                    console.log(ID_Partie);
                    console.log(indiceRoom);
                    socket.emit("Quitter",ID_Partie,indiceRoom);
                });

            });

            socket.on('redirectToDashBoard',()=>{
                window.location.replace('../PHP/dashboardUser.php');
            });
            
            socket.on('Replay',()=>{
                $.ajax({
                    /*creer la variable SESSION['replay] = true si elle n'existe pas 
                    et sinon la remettre a true*/
                    url : "CreerSessionVarReplay.php",
                    method : "POST",
                
                    success:function(data){
                        //console.log('success');
                        //console.log(data);
                        if(data == 'true')
                        /*redirection vers le dashboard pour recommencer la recherche */
                              window.location.replace('../PHP/dashboardUser.php');
                              //console.log("Une Erreur est survenue lors de script de creation de la variable ");
                    },
    
                    complete:function(data){
                        //console.log('completed');
                        //console.log(data);
                    },
    
                    error: function(data){
                            //console.log('error');
                            //console.log(data);
                    }
                });

            
            });

            $('body').on('click','#btnQuit',()=>{
                if(ID_joueur == 1)
                score[1] += NBR_MANCHE;
                else
                score[0] += NBR_MANCHE;
                socket.emit('JQuit', NBR_MANCHE,score, ID_joueur,indiceRoom);
            });

            socket.on('Joueur_A_Quitter',function(sc1,sc2,idJoueur){
                
                score[0] = sc1;
                score[1] = sc2;
                let gagnant ='null';
               
                if(ID_joueur == idJoueur){
                document.getElementById('FinDePartiePopUp').style.display = 'block';
                $('#popUp').css({
                    'position':'relative',
                    'left':'20%',
                    'padding':'25px 25px 25px 25px',
                    'color':'white'
                });
                
                document.getElementById('popUpAction').innerHTML = '<p>Vous Quitter la partie Avant la fin Vous etes donc consideré perdant</p><p>Vous Allez etre redirigé vers votre dashboard</p>';
                document.getElementById('popUpTitle').innerHTML = "Vous Avez Perdu ..!";
                setTimeout(() => {
                    window.location.replace("../PHP/dashboardUser.php");
                }, 6000);
                }else{
                    gagnant = Pseudo;

                    $.ajax({
                        url : "InsererGagnant.php",
                        method : "POST",
                        data : {vainceur:gagnant,idPartie:ID_Partie,scorefinal:score[ID_joueur-1]},
                        dataType: "text",
                        
                        success:function(data){
                            //console.log('success');
                            //console.log('data');
                        },
        
                        complete:function(data){
                            //console.log("La BD est a jour : gagnant inséré ");
                            //console.log(data);
                        },
        
                        error: function(data){
                                //console.log('error');
                                //console.log(data);
                        }
                        
                    });
                    document.getElementById('FinDePartiePopUp').style.display = 'block';
                    document.getElementById('popUpTitle').innerHTML = "l'adversaire A Quitter \n Vous Avez Gagnez ! Félicitations !";

                    $('#popUp').css({
                        'position':'relative',
                        'left':'20%',
                        'padding':'25px 25px 25px 25px',
                        'color':'white'
                    });
    
                    $('body').on('click','#rejouer',()=>{
                 
                        socket.emit("Rejouer",ID_Partie,indiceRoom);
                    });
    
                    $('body').on('click','#quitter',()=>{
                        socket.emit("Quitter",ID_Partie,indiceRoom);
                    });
    
                    
                }
            });
    });

        

    

      /*function qui va declencher une nouvelle recherche si 
            la var global Replay == true;*/

            function replay(){

                if( Replay == 'true' ){
                    Replay = 'false';   
                 document.getElementById('1V1').click();
                }

             };
             replay();
});
