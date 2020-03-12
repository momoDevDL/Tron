

    var PriorityClient ; // variable qui va contenir la priorité de joueur  
    let indiceRoom = -1 ;
    let id_player_html;
    
    let x0,y0;
    var touches = [];
    var timer = TMP_PARTIE;
    
    let moto1;
    let moto2;
    //let moto2;
    var socket;
    var timerMur = 0;
    var murActif = false;
    var pl ;
    var svgContainer;


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
                console.log(data);
                $("#profil-container").html(data);
                },
                complete:function(data){
                    console.log(data);
                },
                error: function(data){
                    console.log("error");
                        console.log(data);
                }
        });
    });

    $('body').on('click',"#Joueur",function(e){
        $.ajax({
                    url : "fetch_All_Users.php",
                    method : "POST",
                    dataType: "text",
                    success:function(data){
                        console.log(data);
                    $("#Contact").html(data);    
                    },
                    complete:function(data){
                        console.log("lol");
                        console.log(data);
                    },
                    error: function(data){
                            console.log('error');
                            console.log(data);
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


      function DemareJeu(id_,svgContainer){
 
        InitGame(id_,svgContainer);
        defEvent(moto1);
        console.log("l'indice de la room est :" + indiceRoom);
        socket.emit('envoi_autre_joueur_serveur',moto1,indiceRoom);

        var myVar = setInterval(Frame, INTERVAL, moto1);


     }

       
          $.ajax({
            url : "fetchPlayerPriority.php",
            method : "POST",
            dataType: "text",
            success:function(data){
                PriorityClient = data;
                console.log("this is data " +data);
                console.log("this is data " +PriorityClient);

            },
            complete:function(data){
                console.log("after lol");
                console.log(data);
            },
            error: function(data){
                    console.log('error');
                    console.log(data);
            }
            
        });

        
      socket.on('connect',function(){
        socket.emit('envoiDePriorite',PriorityClient);
      });

      socket.emit('CommencerRecherche');

      socket.on('connectedToRoom',function(indiceRoomS){
        console.log("You Are Connected to Room " + indiceRoomS);
        indiceRoom = indiceRoomS ;
        console.log(indiceRoom);
      });

      socket.on('CommenceBientot',function(indiceRoom){

        $("body #rechercheMatch").append("<p id='PartieEnConst'>Votre partie va bientot commencer</p>");

        $("body #PartieEnConst").css({
            'position':'relative',
            'top':'60%',
            'color':'white' 
        });
        
        $.ajax({
            url : "LoadGamePage.php",
            method : "POST",
            dataType: "text",
            success:function(data){
                
                console.log("this is data " +data);
                $('#main').html(data);


            },
            complete:function(data){
                console.log("after lol");
                console.log(data);
                pl = new Plateau();
                svgContainer = d3.select('#damier').append('svg').attr('width',PL_NBCOL*PL_L).attr('height',PL_NBLIG*PL_L);
                pl.newPlateau(PL_L,PL_NBCOL,PL_NBLIG);
                pl.newGrandeCases(PL_NBCOL*PL_L,PL_NBLIG*PL_L,5,5);
                console.log( " this is the pl " + pl);
                console.log(" this is the svgContainer " +svgContainer);
                console.log(" this is the end" );
                socket.emit('CommencerPartie',indiceRoom);
            },
            error: function(data){
                    console.log('error');
                    console.log(data);
            }
            
        });


        


        console.log("===========================LA PARTIE DOIT COMMENCER MNT===================");
      });
      

      
         //nous alerte lors d'une collision de nous ou de l'autre joueur
         socket.on('collision', function(message){
            alert(message);
         });

         //nous donne l'id du joueur pour la partie en cours (sert pour initialiser la moto)
         socket.on('id_joueur', function(id){
          
            id_player_html = id;
            console.log("id joueur est : "+ id);

         });

         //quand les deux joueurs sont pret on lance la partie
         socket.on('joueurs_pret', function(){

            DemareJeu(id_player_html,svgContainer);
         });

         //il faut arriver à récupérer la moto du joueur adverse
         socket.on('autre_joueur', function(motoE){
            moto2 = new Moto(motoE.id_player);
            moto2.dessinerMoto(svgContainer);
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
        
     
    });

});
