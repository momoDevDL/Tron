var nomsJoueurs = [];
var nbJoueursConnectes = 0;

var express = require('express');
var query = require('jquery');
var ajax = require('ajax');
var app = express();
var serveur = require('http').createServer(app);
var io = require("socket.io")(serveur);
const nsp = io.of('/first-namespace');

serveur.listen(3333,function(){
    console.log("serveur est en ecoute sur le port num : "+ 3333);
});


var Rooms = []
var pseudoPlayer1 = null;
var pseudoPlayer2 = null;
var indiceInsertion = 0;
var Priority ;

var id = 0;
var motoMouv;

var presD = 0; // pour la fct socket 'joueur_pret'
var pres = 0; // pour la fct socket 'CommencerPartie'
var Ppret = 0; //pour la fct socket 'ok_pret'0;


nsp.on('connection', function (socket) {

    
    var inseré = false ;
    console.log('connetion');
  
   
   socket.on('envoiDePriorite',function(data){
    console.log("this is data " + data );
     Priority = data ;
    console.log("this is data " +Priority);
});
 
socket.on('envoiPseudo',function(data){
    console.log("this is data " + data );
    if(pseudoPlayer1 == null)
     pseudoPlayer1 = data ;
     else
     pseudoPlayer2 = data ;
    console.log("this is pseudo1 : " +pseudoPlayer1 +  " /  and this is pseudo2 : " + pseudoPlayer2);
});
 
   

  /* Commencer la Recherche de joueur à la connection en regardant toutes les chambrescréant une nouvelle chambre
  dont il est membre s'il trouve pas un joueur qui matche avec ça priorité de recherche
et sinon inclu*/ 
    socket.on('CommencerRecherche',function(){
    Rooms.forEach(element => {
        if(Priority == 'null'){

            if(element.remaining > 0){
                if(element.Priority == 'null'){
                    
                    socket.join(element.name);
                    element.remaining-- ;
                    element.Priority = Priority;
                    Priority = 'null';
                    element.p2 = pseudoPlayer2;
                    inseré = true;
                    pseudoPlayer2 = null;
                    pseudoPlayer1 = null;
                    nsp.in(element.name).emit('connectedToRoom',element.position,element.name);
                    nsp.in(element.name).emit('CommenceBientot',{p2:element.p2,p1:element.p1} );
                    socket.to(element.name).emit('BeginInsertPartie',{p2:element.p2,p1:element.p1});
                }
            }
        
        }else{

            if(element.remaining > 0){
                if(element.Priority == Priority){
                    
                    socket.join(element.name);
                    element.remaining-- ;
                    element.Priority = Priority;
                    Priority = 'null';
                    element.p2 = pseudoPlayer2;
                    inseré = true;
                    pseudoPlayer2 = null; /*on remet les pseudos a null pour permettre de nouvelles connexion */
                    pseudoPlayer1 = null;
                    //enoyer au deux joueur le numero de la chambre dans laquelle ils joueront
                    nsp.in(element.name).emit('connectedToRoom',element.position,element.name);
                    //envoyer au deux joueur les pseudos pour et commencer le chargement de la page partie
                    nsp.in(element.name).emit('CommenceBientot',{p2:element.p2,p1:element.p1});
                    //envoyer à l'autre joueur deja present dans la room les pseudos pour inserer la partie dans la BD
                    socket.to(element.name).emit('BeginInsertPartie',{p2:element.p2,p1:element.p1});
                }
            }
        }
       

        indiceInsertion++;
    });

    if(!inseré){
        console.log("INDICE INSERTION" + indiceInsertion);
        indiceNouvelleRoom = Rooms.length;

         /*on donne comme position de la room la taille de l'ensemble des rooms et
         comme nom l'indice insertion qui represente le nombre de room créér depuis
         le lancemant de serveur , on garantit ainsi des noms differents des rooms,Aussi 
        un acces correct pour toute modification a la room avec la variable position*/

        Rooms.push({name:'room'+indiceInsertion , position:indiceNouvelleRoom ,size:2,remaining:2,Priority:'null', p1:'null',p2:'null',idPartie:-1, score:[0,0] });
        socket.join(Rooms[indiceNouvelleRoom].name);
        Rooms[indiceNouvelleRoom].remaining-- ;
        Rooms[indiceNouvelleRoom].Priority = Priority;
        Priority = 'null'; /*je remet la priorité a null pareil comme les pseudos pour permettre de nouvelles cnnx */
        Rooms[indiceNouvelleRoom].p1 = pseudoPlayer1;
        inseré = true;
        nsp.in(Rooms[indiceNouvelleRoom].name).emit('connectedToRoom',indiceNouvelleRoom,Rooms[indiceNouvelleRoom].name);
        console.log('===============room Created================="=');
    }

    console.log(Rooms);
    });

    socket.on('EnvoiIdPartieAutreJoueur',(id,indiceRoom)=>{
        Rooms[indiceRoom].idPartie = id ;
        console.log("===============Envoi ID Partie à l'Autre Joueur =========\n");
        console.log(Rooms[indiceRoom]);
        socket.to(Rooms[indiceRoom].name).emit('RecvIdPartie',id);
        
    });

    socket.on('demande_id',function(){
        id = id+1;
        idc = id;
        /* remettre l'id a zero pour permettre la cnnx de nouvelles paires des joueurs*/
        if(id == 2){
            id = 0;
        }
        socket.emit('id_joueur', idc);
        
    });

    socket.on('couleurAdversaire', function(coul,indiceR){
        console.log("========================"+coul+"================");
        socket.to(Rooms[indiceR].name).emit('couleurAdv', coul);  

    });

    socket.on('joueur_pret', function(){
        console.log("un des joueur est pret");
        presD += 1;
        if(presD == 2) {
            console.log("les des joueurs sont prets");
            presD = 0;
            socket.emit('generer_partie');
        }
        
    });

    socket.on('CommencerPartie',(indiceRoom) =>{
        pres +=1;

        if(pres==2){
            //console.log("Une Partie a commencé dans room " +indiceRoom);
            nsp.in(Rooms[indiceRoom].name).emit('lance_partie');
            pres = 0;
            coll = 0;
        }
    });

   //lors d'une collision un message est envoyé au client même et à l'autre client

    //quand un des clients est prêt on l'envoie à l'autre joueur
    socket.on('envoi_de_notre_moto', function(moto,indice){
        //console.log(indice);
        //console.log(moto);
        socket.to(Rooms[indice].name).emit('autre_joueur',moto);
    });

    socket.on('ok_pret', function(IR, tmppartie, temp_refresh){
        Ppret +=1;
        if(Ppret == 2){
            var seconde_left = 5;
            var interval = setInterval(function(){

                nsp.in(Rooms[IR].name).emit('decompte_avant_demarage_parti', seconde_left);

                --seconde_left;

                if(seconde_left <= 0){
                    clearInterval(interval);
                    TimerJeu(IR, tmppartie, temp_refresh);
                    Ppret = 0;
                }
            }, 1000);
        }
        
    });
    //si un joueur bouge on l'envoi à tout les clients
    socket.on('joueur_bouge', function(moto,indice, coll, ind, id_player){
        console.log(coll);
        if(coll){
            clearInterval(motoMouv);
            nsp.in(Rooms[indice].name).emit('fin_manche',ind, id_player);
        }else{
            socket.to(Rooms[indice].name).emit('update_joueur', moto);
        }
        //socket.broadcast.emit('update_joueur', moto);
    });


    socket.on('miseAjourScore', function(indiceRoom,sc,id_joueur){
        //score[id_joueur-1] = sc:
        Rooms[indiceRoom].score[id_joueur-1] = sc;
        nsp.in(Rooms[indiceRoom].name).emit('nouveauScore',Rooms[indiceRoom].score[0], Rooms[indiceRoom].score[1]);
    });


    socket.on('score', function(sc, id_joueur, indiceRoom){
        Rooms[indiceRoom].score[id_joueur-1] = sc[id_joueur-1];
        nsp.in(Rooms[indiceRoom].name).emit('vainceur',Rooms[indiceRoom].score[0], Rooms[indiceRoom].score[1]);
    });


   socket.on('JQuit',function(sc,idj,iR){
    Rooms[iR].score[0] = sc[0];
    Rooms[iR].score[1] = sc[1];
    nsp.in(Rooms[iR].name).emit('Joueur_A_Quitter',Rooms[iR].score[0], Rooms[iR].score[1],idj);
   });
   
    socket.on('FinDePartie',()=>{
        socket.emit("QuitterOuRejouer");
    });

    socket.on('Rejouer',function(idP,iR){
        console.log("================== Joueur Veut REJOUER  ===============\n");
        console.log(idP);
        console.log(iR);
        console.log(Rooms);
        if( typeof Rooms[iR] !== 'undefined'){
            console.log("LA ROOM EXISTE");
            if(Rooms[iR].idPartie == idP){
                console.log("Les ID SONT COMPATIBLES");
                Rooms.splice(iR,1);

                for(let i = iR ; i < Rooms.length;i++){

                    Rooms[i].position -= 1;
                    nsp.in(Rooms[i].name).emit("connectedToRoom",Rooms[i].position,Rooms[i].name);
    
                  }
                console.log(Rooms);
            }else{
                console.log("Les ID SONT INCOMPATIBLES");
            }
            
        }else{
            console.log("LA ROOM N'EXISTE PAS")
        }
    
        socket.emit("Replay");
    });

    socket.on('Quitter',function(idP,iR){
        console.log("================== Joueur A QUITTER ===============\n");
        console.log(idP);
        console.log(iR);
        console.log(Rooms);
        if( typeof Rooms[iR] !== 'undefined'){
            console.log("LA ROOM EXISTE");
            if(Rooms[iR].idPartie == idP){
                console.log("Les ID SONT COMPATIBLES");
                Rooms.splice(iR,1);

                for(let i = iR ; i < Rooms.length;i++){

                    Rooms[i].position -= 1;
                    nsp.in(Rooms[i].name).emit("connectedToRoom",Rooms[i].position,Rooms[i].name);
    
                  }

                console.log(Rooms);
            }else{
                console.log("Les ID SONT INCOMPATIBLES");
            }
            
        }else{
            console.log("LA ROOM N'EXISTE PAS")
        }
        socket.emit("redirectToDashBoard");
    });

    
    socket.on('clearInterval',function(){
        clearInterval(motoMouv);
    });

    socket.on('AdminRequestRooms',()=>{
        socket.emit('Rooms',Rooms);
    });

    socket.on('disconnect',function(){
        console.log('disconnected');
    });

});



function TimerJeu(IR ,tempPartie, temp_refresh){
    var second_ = tempPartie;
    motoMouv = setInterval(function(){
        if(typeof Rooms[IR] !== 'undefined'){
            nsp.in(Rooms[IR].name).emit('frame', second_/1000);
            second_ -= temp_refresh;
            if(second_ <= 0){
                clearInterval(motoMouv);
                nsp.in(Rooms[IR].name).emit('fin_manche' , -1);
            }
        }
    }, temp_refresh);
}
