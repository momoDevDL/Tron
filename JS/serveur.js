var nomsJoueurs = [];
var nbJoueursConnectes = 0;

var express = require('express');
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
var id = 0;
var motoMouv;

var presD = 0; // pour la fct socket 'joueur_pret'
var pres = 0; // pour la fct socket 'CommencerPartie'
var Ppret = 0; //pour la fct socket 'ok_pret'
var coll = 0;

nsp.on('connection', function (socket) {


    var inseré = false ; console.log('connetion');

    
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
        Rooms.push({name:'room'+indiceInsertion , size:2,'remaining':2,Priority:'null' });
        socket.join(Rooms[indiceInsertion].name);
        Rooms[indiceInsertion].remaining-- ;
        Rooms[indiceInsertion].Priority = Priority;
        inseré = true;
        nsp.in(Rooms[indiceInsertion].name).emit('connectedToRoom',indiceInsertion);
        console.log('===============room Created================="=');
    }

    console.log(Rooms);
    });
   
    socket.on('demande_id',function(){
        id = id+1;
        socket.emit('id_joueur', id);
    });
   
    socket.on('joueur_pret', function(){
        presD += 1;
        if(presD ==2) {
            console.log("un des joueur est pret");
            socket.emit('generer_partie');
            presD = 0;
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
    socket.on('collision',(indiceRoom) =>{
        coll += 1;
        if(coll == 1){
            clearInterval(motoMouv);
            nsp.in(Rooms[indiceRoom].name).emit('fin_manche','coucou');
            //console.log("Serveur : message nouvelle partie / "+indiceRoom);
    
            nsp.in(Rooms[indiceRoom].name).emit('nouvelP','coucou');
        }
    });

    //quand un des clients est prêt on l'envoie à l'autre joueur
    socket.on('envoi_de_notre_moto', function(moto,indice){
        //console.log(indice);
        //console.log(moto);
        socket.to(Rooms[indice].name).emit('autre_joueur',moto);
    });

    socket.on('ok_pret', function(IR, tmppartie, temp_refresh){
        Ppret +=1;
        if(Ppret == 2){
            var seconde_left = 10;
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
    socket.on('joueur_bouge', function(moto,indice){
        socket.to(Rooms[indice].name).emit('update_joueur', moto);
        //socket.broadcast.emit('update_joueur', moto);
    });


   socket.on('envoiDePriorite',function(data){
       console.log("this is data " + data );
        Priority = data ;
       console.log("this is data " +Priority);
   });


    socket.on('disconnect',function(){
        console.log('disconnected');
    });

});


function TimerJeu(IR ,tempPartie, temp_refresh){
    var second_ = tempPartie;
    motoMouv = setInterval(function(){
        nsp.in(Rooms[IR].name).emit('timer_manche_affichage' , second_/1000);
        nsp.in(Rooms[IR].name).emit('frame');
        second_ -= temp_refresh;

        if(second_ <= 0){
            clearInterval(motoMouv);
            nsp.in(Rooms[IR].name).emit('fin_manche' , 'Temp écoulé');
            nsp.in(Rooms[IR].name).emit('nouvelP','coucou');
        }
    }, temp_refresh);
}
