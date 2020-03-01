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

       

      var socket = io('http://localhost:8888/first-namespace');
      var PriorityClient ; // variable qui va contenir la priorité de joueur  
      let indiceRoom = -1 ;


       
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

      socket.on('connectedToRoom',function(indiceRoom){
        console.log("You Are Connected to Room " + indiceRoom);
        indiceRoom = indiceRoom ;
      
      });

      socket.on('CommenceBientot',function(indiceRoom){
        $("body #rechercheMatch").append("<p id='PartieEnConst'>Votre partie va bientot commencer</p>");
        $("body #PartieEnConst").css({
            'position':'relative',
            'top':'60%',
            'color':'white' 
        });
        socket.emit('CommencerPartie',indiceRoom);
      });

     /* */
    });

});
