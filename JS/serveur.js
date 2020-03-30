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
/*
app.get('/',function(req,res){
    res.send('<h1>HEllo World</h1>');
});*/

var Rooms = []

var indiceInsertion = 0;
var Priority ;
var pseudoPlayer1 = null;
var pseudoPlayer2 = null;
var id = 0;

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
 
    //lors d'une collision un message est envoyé au client même et à l'autre client
 /*  socket.on('collision', function(message){
        socket.emit('collision', 'vous etes en collision !');
        socket.broadcast.emit('collision', 'l\'autre joueur est en collision');
    });*/


  /* Commencer la Recherche de joueur à la connection en regardant toutes les chambres
   deja existantes et créer une nouvelle chambre
  dont il est membre s'il trouve pas un joueur qui matche avec ça priorité de recherche
et sinon joindre une chambre et commencer une partie */ 
    socket.on('CommencerRecherche',function(){
    Rooms.forEach(element => {
        if(Priority == 'null'){

            if(element.remaining > 0){
                if(element.Priority == 'null'){
                    
                    socket.join(element.name);
                    element.remaining-- ;
                    element.Priority = Priority;
                    element.p2 = pseudoPlayer2;
                    inseré = true;
                    nsp.in(element.name).emit('connectedToRoom',indiceInsertion);
                    nsp.in(element.name).emit('CommenceBientot',indiceInsertion,{p2:element.p2,p1:element.p1} );
                    socket.to(element.name).emit('BeginInsertPartie',{p2:element.p2,p1:element.p1});
                }
            }
        
        }else{

            if(element.remaining > 0){
                if(element.Priority == Priority){
                    
                    socket.join(element.name);
                    element.remaining-- ;
                    element.Priority = Priority;
                    element.p2 = pseudoPlayer2;
                    inseré = true;
                    //enoyer au deux joueur le numero de la chambre dans laquelle ils joueront
                    nsp.in(element.name).emit('connectedToRoom',indiceInsertion);
                    //envoyer au deux joueur les pseudos pour et commencer le chargement de la page partie
                    nsp.in(element.name).emit('CommenceBientot',indiceInsertion,{p2:element.p2,p1:element.p1});
                    //envoyer à l'autre joueur deja present dans la room les pseudos pour inserer la partie dans la BD
                    socket.to(element.name).emit('BeginInsertPartie',{p2:element.p2,p1:element.p1});
                }
            }
        }
       

        indiceInsertion++;
    });

    if(!inseré){
        Rooms.push({name:'room'+indiceInsertion , size:2,'remaining':2,Priority:'null', p1: pseudoPlayer1,p2:pseudoPlayer2,idPartie:'null'});
        socket.join(Rooms[indiceInsertion].name);
        Rooms[indiceInsertion].remaining-- ;
        Rooms[indiceInsertion].Priority = Priority;
        Rooms[indiceInsertion].p1 = pseudoPlayer1;
        inseré = true;
        nsp.in(Rooms[indiceInsertion].name).emit('connectedToRoom',indiceInsertion);
        console.log('===============room Created================="=');
    }

    console.log(Rooms);
    });

    socket.on('CommencerPartie',(indiceRoom) =>{

        console.log("Une Partie a commencé dans room " +indiceRoom);

        if(id < 2){
            id += 1;
            socket.emit('id_joueur', id);
        }
        
        if(id==2){
        nsp.in(Rooms[indiceRoom].name).emit('joueurs_pret');
        id = 0 ;
        //socket.broadcast.emit('joueurs_pret');
        }
    });


    socket.on('EnvoiIdPartieAutreJoueur',(id,indiceRoom)=>{
        Rooms[indiceRoom].idPartie = id ;
        console.log("===============Envoi ID PArtie Autre Joueur =========\n");
        console.log(Rooms[indiceRoom]);
        socket.to(Rooms[indiceRoom].name).emit('RecvIdPartie',id);
        
    });


    //quand un des clients est prêt on l'envoie à l'autre joueur
    socket.on('envoi_autre_joueur_serveur', function(moto,indice){
        console.log(indice);
        console.log(moto);
        socket.to(Rooms[indice].name).emit('autre_joueur',moto);
    });

    //si un joueur bouge on l'envoi à tout les clients
    socket.on('joueur_bouge', function(moto,indice){
        socket.to(Rooms[indice].name).emit('update_joueur', moto);
        //socket.broadcast.emit('update_joueur', moto);
    });
   //console.log(nsp.adapter.rooms);

   
    socket.on('disconnect',function(){
        console.log('disconnected');
    });

});
