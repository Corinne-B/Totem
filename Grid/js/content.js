

function GenerateContent(raw, foldername) {
  //console.log(raw);
  var projects = JSON.parse(raw);
  //console.log(projects);
  
  
      
  var section = document.createElement('section');
  var header = document.createElement('div');
  var title = document.createElement('h2');
  var content = document.createElement('div');
  
  //section.style.backgroundImage = "url('content/img/" + i + ".jpg')";
  //section.style.backgroundImage = "url('content/hopeandbike/cover.jpg')";
  //section.style.indexZ = "0"
  section.className += "box container";
  section.style.backgroundSize = "cover";
  section.style.left = Math.random()*document.getElementById('main').offsetWidth;
  section.style.top = Math.random()*document.getElementById('main').offsetHeight;
  //section.style.position = "absolute";
  section.style.height = "200px";
  section.style.width = "200px";
  section.style.backgroundImage = "url('/content/"+ foldername+"/cover.jpg')";
    
  var grid_size = 10;
  
  $(section)
  .draggable({ grid: [ grid_size, grid_size ] })
  .resizable({ grid: grid_size * 2 })
  .on("mouseover", function(){
    $( this ).addClass("move-cursor")
  })
  .on("mousedown", function(){
    $( this )
      .removeClass("move-cursor")
      .addClass("grab-cursor")
      .addClass("opac");
    $(" .text ").hide();
  })
  .on("mouseup", function(){
    $( this )
      .removeClass("grab-cursor")
      .removeClass("opac")
      .addClass("move-cursor");
  });
  
  $(section).on("click", function(event) {
    var container = event.target;
    $(container).toggleClass('active');
    console.log(container);
    if ($(container).hasClass('active')) {
      $(".box").addClass('hidden');
      $(container).removeClass('hidden');
      TweenMax.to('.hidden', 0.3, {opacity:0});
      TweenMax.staggerFromTo('.content > div', 0.2, {opacity:0, y: 100}, {opacity:1, y: 0}, 0.3);
    } else {
      $(".box").removeClass('hidden');
      TweenMax.to('.box', 0.3, {opacity:1}); 
    } 
  });


/*function isCollide(a, b) {
  console.log(a.offsetTop);
  console.log(a.clientHeight);
  return !(
    ((a.offsetTop + a.clientHeight) < (b.offsetTop)) ||
    (a.offsetTop > (b.offsetTop + b.clientHeight)) ||
    ((a.offsetLeft + a.clientWidth) < b.offsetLeft) ||
    (a.offsetLeft > (b.offsetLeft + b.clientWidth))
    ) && a != b;
};


  $(section).on('drag', function(event){
    var elements = document.querySelectorAll('section');

    for (var i = elements.length - 1; i >= 0; i--) {
      var element = elements[i];
      if(isCollide(section, element)){
        console.log("collision");
      }
    };
  });*/

var Target = document.getElementById('targetJoy');
Target.style.top = screen.height/2 - Target.clientHeight; //position target center vertically


////////////////////////////////////////Display last sign////////////////////////////////////////////////
document.getElementById("targetJoy").style.backgroundImage = "url('content/totem/totem_1.png')";


////////////////////////////////////////////Generate Sign Totem on press Arcade Button/////////////////////////////////////
var socket = io();  
socket.on("buttonArcade : down", function(button){
    divMouseDownTimeout = setTimeout(function() {
      isMouseHeld = true;
      generateTotem();
      console.log(isMouseHeld);
    }, 1000);
  });

  function generateTotem(e){
    if (isMouseHeld) {
      isMouseHeld = false
      console.log("clique");
      var div = document.createElement('div');

      div.style.backgroundImage = "url('content/totem/totem_1.png')";
      div.style.indexZ = "0"
      div.style.backgroundSize = "cover";
      div.style.position = "absolute";
        /*div.style.left = document.body.scrollLeft;
        div.style.top = document.body.scrollTop;*/
        div.style.left = pageXOffset + sizeScreenX / 2;
        div.style.top = pageYOffset + sizeScreenY / 2;
        div.style.height = "20px";
        div.style.width = "20px";

        document.body.appendChild(div);
      }
    };
    socket.on("buttonArcade : up", function(button){   
      if (divMouseDownTimeout) {
        clearTimeout(divMouseDownTimeout);
      }
    });


////////////////////////////////////////FONCTION TO CHECK IF IS COLLIDE//////////////////////////////////////////////////////////////////

function isCollide(a, b) {
  return !(
    ((a.offsetTop + document.body.scrollTop + a.clientHeight) < (b.offsetTop)) ||
    (a.offsetTop + document.body.scrollTop > (b.offsetTop + b.clientHeight)) ||
    ((a.offsetLeft + document.body.scrollLeft + a.clientWidth) < b.offsetLeft) ||
    (a.offsetLeft + document.body.scrollLeft > (b.offsetLeft + b.clientWidth))
    );
};


  socket.on("buttonArcade : down", function(button){
    var elements = document.querySelectorAll('section');

    for (var i = elements.length - 1; i >= 0; i--) {
      var element = elements[i];
      if(isCollide(document.getElementById('targetJoy'), element)){
        console.log("collision");
      }
    };
  });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  header.className += "header";
  content.className += "content";
  

  document.getElementsByTagName('body')[0].appendChild(section);
  (section).appendChild(header);
  (header).appendChild(title);
  (section).appendChild(content);

  //aside.style.backgroundSize = "cover";
  title.innerHTML += projects.title;
  
  for(var i = 0;i<projects.content.length;i++){
    var project = projects.content[i];
    //console.log(project);
    content.innerHTML += project.html;
    var element = content.lastChild;
    
    element.style.left = project.initial.x;
    element.style.top = project.initial.y;
    //console.log(element);
  }
    
          
     
      
    

}


    




///////////////////////////////////LANCEMENT DE LA GENERATION DES PROJETS//////////////////////////////////////////////     




$( function() {
  var folders = ["figurines3d", "hopeandbike", "imprimanteprusai3", "onewheel", "treasurebox", "tshirtstormtrooper"];       
      
  for (let i=0;i<folders.length;i++){
    var req = new XMLHttpRequest();
    req.open('GET', 'content/'+ folders[i]+'/textContent.json');
    req.onreadystatechange = (event) => {
      console.log(folders[i], this, event);
      // XMLHttpRequest.DONE === 4
      if (event.target.readyState === XMLHttpRequest.DONE) {
        if (event.target.status === 200) {
          console.log(folders[i]);
          GenerateContent(event.target.responseText, folders[i]);
        //}
          
        } else {
          console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
      }
    }
    req.send();
  }
})


