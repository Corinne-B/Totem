
//Lancer le serveur express et le serveur IO

var express = require('express'); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/Grid/index.html');
});

app.use(express.static('Grid'));

//Identifier quand quelqu'un se connecte et se déconnecte
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//Écrire un message reçu dans la console
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});





//Connexion à l'arduino via le module johnny-five
var five = require("johnny-five"),
  board, buttonPin2, buttonPin3, buttonPin4, buttonPin5;

board = new five.Board();

board.on("ready", function() {

  // Create a new `buttonPin2` hardware instance.
  // This example allows the buttonPin2 module to
  // create a completely default instance
  buttonPin2 = new five.Button(2);
  buttonPin3 = new five.Button(3);
  buttonPin4 = new five.Button(4);
  buttonPin5 = new five.Button(5);

  // Inject the `buttonPin2` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    buttonPin2: buttonPin2
  });
  board.repl.inject({
    buttonPin3: buttonPin3
  });

  board.repl.inject({
    buttonPin4: buttonPin4
  });

  board.repl.inject({
    buttonPin5: buttonPin5
  });


  // Button Event API

  // "down" the buttonPin2 is pressed
  buttonPin2.on("down", function() {
    console.log("pin2 : down");
    io.emit("pin2 : down");
  });
  buttonPin3.on("down", function() {
    console.log("pin3 : down");
    io.emit("pin3 : down");
  });
  buttonPin4.on("down", function() {
    console.log("pin4 : down");
    io.emit("pin4 : down");
  });
  buttonPin5.on("down", function() {
    console.log("pin5 : down");
    io.emit("pin5 : down");
  });

  // "hold" the buttonPin2 is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  buttonPin2.on("hold", function() {
    console.log("pin2 : hold");
    io.emit("pin2 : hold");
  });
  buttonPin3.on("hold", function() {
    console.log("pin3 : hold");
    io.emit("pin3 : hold");
  });
  buttonPin4.on("hold", function() {
    console.log("pin4 : hold");
    io.emit("pin4 : hold");
  });
  buttonPin5.on("hold", function() {
    console.log("pin5 : hold");
    io.emit("pin5 : hold");
  });

  // "up" the buttonPin2 is released
  buttonPin2.on("up", function() {
    console.log("pin2 : up");
    io.emit("pin2 : up");
  });
  buttonPin3.on("up", function() {
    console.log("pin3 : up");
    io.emit("pin3 : up");
  });
  buttonPin4.on("up", function() {
    console.log("pin4 : up");
    io.emit("pin4 : up");
  });
  buttonPin5.on("up", function() {
    console.log("pin5 : up");
  });
});



//Serveur écoute le port 80
http.listen(80, function(){
  console.log('listening on *:80');
});
