
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
board, joystickPin2, joystickPin3, joystickPin4, joystickPin5, buttonArcade, buttonRectangle;

board = new five.Board();

board.on("ready", function() {

  // Create a new `joystickPin2` hardware instance.
  // This example allows the joystickPin2 module to
  // create a completely default instance
  joystickPin2 = new five.Button(2); //joystick pins digita
  joystickPin3 = new five.Button(3);
  joystickPin4 = new five.Button(4);
  joystickPin5 = new five.Button(5);

  buttonArcade = new five.Button(6); //Arcade Button

  buttonRectangle = new five.Button(7); //Start Button

  // Inject the `joystickPin2` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    joystickPin2: joystickPin2
  });
  board.repl.inject({
    joystickPin3: joystickPin3
  });
  board.repl.inject({
    joystickPin4: joystickPin4
  });
  board.repl.inject({
    joystickPin5: joystickPin5
  });

  board.repl.inject({
    buttonArcade: buttonArcade
  });

  board.repl.inject({
    buttonRectangle: buttonRectangle
  });


  // Button Event API

  // "down" the joystickPin2 is pressed
  joystickPin2.on("down", function() {
    console.log("pin2 : down");
    io.emit("pin2 : down");
  });
  joystickPin3.on("down", function() {
    console.log("pin3 : down");
    io.emit("pin3 : down");
  });
  joystickPin4.on("down", function() {
    console.log("pin4 : down");
    io.emit("pin4 : down");
  });
  joystickPin5.on("down", function() {
    console.log("pin5 : down");
    io.emit("pin5 : down");
  });


  buttonArcade.on("down", function() {
    console.log("buttonArcade : down");
    io.emit("buttonArcade : down");
  });

  buttonRectangle.on("down", function() {
    console.log("buttonRectangle : down");
    io.emit("buttonRectangle : down");
  });


  // "hold" the joystickPin2 is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  joystickPin2.on("hold", function() {
    console.log("pin2 : hold");
    io.emit("pin2 : hold");
  });
  joystickPin3.on("hold", function() {
    console.log("pin3 : hold");
    io.emit("pin3 : hold");
  });
  joystickPin4.on("hold", function() {
    console.log("pin4 : hold");
    io.emit("pin4 : hold");
  });
  joystickPin5.on("hold", function() {
    console.log("pin5 : hold");
    io.emit("pin5 : hold");
  });



  buttonArcade.on("hold", function() {
    console.log("buttonArcade : hold");
    io.emit("buttonArcade : hold");
  });

  buttonRectangle.on("hold", function() {
    console.log("buttonRectangle : hold");
    io.emit("buttonRectangle : hold");
  });



  // "up" the joystickPin2 is released
  joystickPin2.on("up", function() {
    console.log("pin2 : up");
    io.emit("pin2 : up");
  });
  joystickPin3.on("up", function() {
    console.log("pin3 : up");
    io.emit("pin3 : up");
  });
  joystickPin4.on("up", function() {
    console.log("pin4 : up");
    io.emit("pin4 : up");
  });
  joystickPin5.on("up", function() {
    console.log("pin5 : up");
  });



  buttonArcade.on("up", function() {
    console.log("buttonArcade : up");
  });


  buttonRectangle.on("up", function() {
    console.log("buttonRectangle : up");
    io.emit("buttonArcade : up")
  });
});


//Serveur écoute le port 80
http.listen(80, function(){
  console.log('listening on *:80');
});
