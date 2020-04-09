

    var PriorityClient ; // variable qui va contenir la priorité de joueur  
    let indiceRoom = -1 ;
    let ID_joueur;

    var touches = [];
    var timer = TMP_PARTIE;
    
    let moto1;
    let moto2;
    let score = 0;
    
    var socket;
    var timerMur = 0;
    var murActif = false;
    var pl ;
    var svgContainer;
    var Pseudo;
    var ID_Partie;
    var pseudoAdv;
    var nbrManche = NBR_MANCHE;

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

    $('body').on('click',"#Joueur",function(e){
        $.ajax({
                    url : "fetch_All_Users.php",
                    method : "POST",
                    dataType: "text",
                    success:function(data){
                        //console.log(data);
                    $("#Contact").html(data);    
                    },
                    complete:function(data){
                        //console.log("lol");
                        //console.log(data);
                    },
                    error: function(data){
                            console.log('error');
                            //console.log(data);
                    }
                    
            });               
    }); 
    
    

    $('body').on('click','#1V1',function(){
        
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

       

        socket = io('http://localhost:3333/first-namespace');

        function BoutonReady(){
                var btn = document.createElement("button");
                btn.setAttribute("id","btn_ready");
                btn.setAttribute("onclick","socket.emit('joueur_pret')");
                btn.innerHTML = 'Are You Ready ?';
                var elem = document.getElementById('damier');
                elem.appendChild(btn);
        }


        function GenerPlateau(){
            document.getElementById('nbr_manche').innerHTML = nbrManche;
            document.getElementById('playerOne').innerHTML = score;
            document.getElementById('playerTwo').innerHTML = 0;
            var elem = document.getElementById("btn_ready");
            elem.parentNode.removeChild(elem);
            pl = new Plateau();
            svgContainer = d3.select('#damier').append('svg').attr('width',PL_NBCOL*PL_L).attr('height',PL_NBLIG*PL_L).attr('id','plateau_');
            pl.newPlateau(PL_L,PL_NBCOL,PL_NBLIG);
            pl.newGrandeCases(PL_NBCOL*PL_L,PL_NBLIG*PL_L,5,5);
            //console.log(svgContainer);
            socket.emit('CommencerPartie',indiceRoom);

        }

        function DemarePartie(){
            //console.log(svgContainer);
            InitGame(ID_joueur, indiceRoom);
            defEvent(moto1);

            //console.log("l'indice de la room est :" + indiceRoom);

            socket.emit('envoi_de_notre_moto',moto1,indiceRoom);
        }

       
     $.ajax({
       url : "fetchPlayerPseudo&Priority.php",
       method : "POST",
       dataType: "json",
       success:function(data){
           
           PriorityClient = data.priorite;
           Pseudo = data.pseudo ;
           console.log("this is data : " +data);
           console.log("this is data priority : " +PriorityClient);
           console.log("this is data pseudo : " +Pseudo);
        console.log(Pseudo);

       },
       complete:function(data){
        console.log("after lol");
        console.log(data);

       },
       error: function(data){
               console.log('error');
               
       }
       
   });

        
      socket.on('connect',function(){
        socket.emit('envoiDePriorite',PriorityClient);
        socket.emit('envoiPseudo',Pseudo);
      });

      socket.emit('CommencerRecherche');

      socket.on('connectedToRoom',function(indiceRoomS){
        console.log("You Are Connected to Room " + indiceRoomS);
        indiceRoom = indiceRoomS ;
        console.log(indiceRoom);
      });

      socket.on('CommenceBientot',function(indiceRoom,pseudos){
        console.log("pseudo 2 est de :" + pseudos.p2);
        console.log("pseudo 1 est de :" + pseudos.p1);

        $("body #rechercheMatch").append("<p id='PartieEnConst'>Votre partie va bientot commencer</p>");

        $("body #PartieEnConst").css({
            'position':'relative',
            'top':'60%',
            'color':'white' 
        });

        pseudoAdv = (pseudos.p2 == Pseudo ? pseudos.p1 : pseudos.p2);

        $.ajax({
            url : "LoadGamePage.php",
            method : "POST",
            data : "pseudoAdv=" + pseudoAdv,
            dataType: "text",
            success:function(data){
                //console.log("this is data " +data);
                $('#main').html(data);

            },
            complete:function(data){
                socket.emit('demande_id');
                BoutonReady();
            },
            error: function(data){
                    console.log('error');
                    console.log(data);
            }
            
        });


        socket.emit("InsererPartie",indiceRoom);
       
        
        console.log("===========================LA PARTIE DOIT COMMENCER MNT===================");
      });
      
        socket.on("BeginInsertPartie",function(pseudos){
            console.log("============== Begin Insert ============\n")
            $.ajax({
                url : "InsererPartie.php",
                method : "POST",
                data : {pseudo1: pseudos.p1,pseudo2: pseudos.p2},
                dataType: "text",
                success:function(data){
                    console.log("L'id de la partie :"+data);
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
            console.log("l'id reçu par l'autre joueur est : "+ id );
            ID_Partie = id ;
        });
        
         //nous donne l'id du joueur pour la partie en cours (sert pour initialiser la moto)
        socket.on('id_joueur', function(id){
            ID_joueur = id;
            //console.log("id joueur est : "+ id);
        });

        socket.on('generer_partie',function(){
            //console.log("je genere la partie");
            GenerPlateau();
        });

        //il faut arriver à récupérer la moto du joueur adverse
        socket.on('autre_joueur', function(motoE){
            moto2 = new Moto(motoE.id_player);
            moto2.dessinerMoto();
            console.log(moto2);
            socket.emit('ok_pret', indiceRoom, TMP_PARTIE, INTERVAL);
        });

        //socket qui affiche le décompte avant le lancement de la manche
        socket.on('decompte_avant_demarage_parti', function(seconde_left){
            document.getElementById('timer_partie').innerHTML = seconde_left;
        });

        //socket qui est appelé toutes les 20 ms pour raffraichir les motos
        socket.on('frame', function(){
            Frame(moto1, moto2);
        });

        //socket qui permet de voir le timer d'une manche
        socket.on('timer_manche_affichage', function(seconde){
            document.getElementById('tmp').innerHTML = seconde;
        });

        //quand les deux joueurs sont pret on lance la partie
        socket.on('lance_partie', function(){
            DemarePartie();
        });

         //nous alerte lors d'une collision de nous ou de l'autre joueur
        socket.on('fin_manche', function(message){
            console.log("=========================FIN DE MANCHE===============  " + message);
            if(moto1.id_player != message){
                score += 20;
            }else{
                if(message < 0){
                    score+=10;
                }
            }
            moto1 = null;
            moto2 = null;
            svgContainer = null;
            pl = null;
            var elem = document.getElementById('plateau_');
            elem.parentNode.removeChild(elem);
        });


         /**
         lorsque on recoit le message du serveur comme quoi un joueur à bougé deux cas : 
         premier cas c'est nous alors on Update juste les deux motos
         deuxième cas on regarde si l'id de l'objet passé en paramètre est bien l'id de la moto adverse et dans ce cas on lui donne les arguments (de plus si la trainé est activé on la dessine)
         et ensuite on Update les deux motos
         */
        socket.on('update_joueur', function(moto){
            if(moto.id_player == moto2.id_player){

                moto2.X = moto.X;
                moto2.Y = moto.Y;
                moto2.ori = moto.ori;
                moto2.rot = moto.rot;
                moto2.speedX = moto.speedX;
                moto2.speedY = moto.speedY;
                moto2.train_act = moto.train_act;

                if(moto2.train_act){
                    pl.transformeCase(moto2.X+5,moto2.Y+25,moto2.color,'mur'); //permet de créer la trainée de la moto
                }
            }
            Update(moto1);
            Update(moto2);
        });

        socket.on('nouvelP', function(message){
            console.log("======================nouvelle manche=============================");
            nbrManche--;
            if(nbrManche <= 0){
                document.getElementById('nbr_manche').innerHTML = 'Fin de la partie';
                console.log("FIN DE PARTIE");
                socket.emit('score', score, ID_joueur, indiceRoom);
            }else{
                BoutonReady();
            }
        });

        socket.on('vainceur', function(sc1, sc2){
            if(ID_joueur==1){
                if(sc1 > sc2){
                    document.getElementById('score').innerHTML = "Vous avez Gagnez !!";
                }else if(sc1 < sc2){
                    document.getElementById('score').innerHTML = "Vous avez perdu...";
                }else{
                    document.getElementById('score').innerHTML = "Egalité !!!";
                }
            }else{
                if(sc1 < sc2){
                    document.getElementById('score').innerHTML = "Vous avez Gagnez !!";
                }else if(sc1 > sc2){
                    document.getElementById('score').innerHTML = "Vous avez perdu...";
                }else{
                    document.getElementById('score').innerHTML = "Egalité !!!";
                }
            }
        });
     
    });

});
