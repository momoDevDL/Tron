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

var Rooms = [{'name':'room1', 'size':2 },{'name':'room2', 'size':2 }]
var indiceRoom = 0 ;
nsp.on('connection', function (socket) {
    var searchingPlayers = [];
   console.log('connetion');
   console.log(nsp.adapter.rooms);
   socket.on('hello',function(data){
       
        data.forEach(element => {
            
            searchingPlayers.push(element);
        });
        console.log(searchingPlayers);
   });

    if(nsp.adapter.rooms[Rooms[indiceRoom].name] && nsp.adapter.rooms[Rooms[0].name].length > 1  ){
        indiceRoom++;
        console.log('===============room Created================="=');
    }
    if(indiceRoom < 2){
    console.log(Rooms[indiceRoom].name);
    
    socket.join(Rooms[indiceRoom].name);

    console.log(nsp.adapter.rooms);

    io.in(Rooms[indiceRoom].name).emit('connectedRoom',indiceRoom);
    }
    socket.on('disconnect',function(){
        console.log('disconnected');
    });

});
