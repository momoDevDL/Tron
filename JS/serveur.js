var nomsJoueurs = [];
var nbJoueursConnectes = 0;

var express = require('express');
var app = express();
var serveur = require('http').createServer(app);
var io = require("socket.io")(serveur);
const nsp = io.of('/first-namespace');

serveur.listen(8888,function(){
    console.log("serveur est en ecoute sur le port num : "+ 8888);
});
/*
app.get('/',function(req,res){
    res.send('<h1>HEllo World</h1>');
});*/

var Rooms = []

var indiceInsertion = 0;
var Priority ;
nsp.on('connection', function (socket) {
    var inseré = false ;
   console.log('connetion');

   //console.log(nsp.adapter.rooms);

   socket.on('envoiDePriorite',function(data){
       console.log("this is data " + data );
        Priority = data ;
       console.log("this is data " +Priority);
   });

   /*
    if(nsp.adapter.rooms[Rooms[indiceRoom].name] && nsp.adapter.rooms[Rooms[indiceRoom].name].length > 1 ){
        indiceRoom++;
        Rooms.push({'name':'room'+indiceRoom , 'size':2 });
        console.log('===============room Created================="=');
    }*/
    
    //console.log(Rooms[indiceRoom].name);
    socket.on('CommencerRecherche',function(){
    Rooms.forEach(element => {
        if(Priority == 'null'){

            if(element.remaining > 0){
                if(element.Priority == 'null'){
                    
                    socket.join(element.name);
                    element.remaining-- ;
                    element.Priority = Priority;
                    inseré = true;
                    nsp.in(element.name).emit('connectedToRoom',indiceInsertion);
                    nsp.in(element.name).emit('CommenceBientot',indiceInsertion);
                }
            }
        
        }else{

            if(element.remaining > 0){
                if(element.Priority == Priority){
                    
                    socket.join(element.name);
                    element.remaining-- ;
                    element.Priority = Priority;
                    inseré = true;
                    nsp.in(element.name).emit('connectedToRoom',indiceInsertion);
                    nsp.in(element.name).emit('CommenceBientot',indiceInsertion);
                }
            }
        }
       

        indiceInsertion++;
    });

    if(!inseré){
        Rooms.push({'name':'room'+indiceInsertion , 'size':2,'remaining':2,'Priority':'null' });
        socket.join(Rooms[indiceInsertion].name);
        Rooms[indiceInsertion].remaining-- ;
        Rooms[indiceInsertion].Priority = Priority;
        inseré = true;
        nsp.in(Rooms[indiceInsertion].name).emit('connectedToRoom',indiceInsertion);
        console.log('===============room Created================="=');
    }
    console.log(Rooms);
    });

    socket.on('CommencerPartie',(indiceRoom) =>{
        console.log("Une Partie a commencé dans room " +indiceRoom);
    });
    
    socket.on('disconnect',function(){
        console.log('disconnected');
    });

});
