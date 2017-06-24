var socket = io();

socket.on("buttonRectangle2 : down", function(button){
	var nbreSection = Math.round(Math.random() * document.getElementsByTagName("section").length);	
	var sectionTar = document.getElementsByTagName('section')[nbreSection];

	var posSecX = sectionTar.offsetLeft;
	var posSecY = sectionTar.offsetTop;
  	
  	scrollTo(posSecX, posSecY);
	
  });

