function GenerateContent(raw) {
  console.log(raw);
  var projects = JSON.parse(raw);
  console.log(projects);
        
        
        

  var section = document.createElement('section');
  var header = document.createElement('div');
  var title = document.createElement('h2');
  var content = document.createElement('div');
  
  //section.style.backgroundImage = "url('content/img/" + i + ".jpg')";
  section.style.indexZ = "0"
  section.className += "box container";
  section.style.backgroundSize = "cover";
  section.style.left = Math.random()*document.getElementById('main').offsetWidth;
  section.style.top = Math.random()*document.getElementById('main').offsetHeight;
  //section.style.position = "absolute";
  section.style.height = "200px";
  section.style.width = "200px";
    
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
  //var description = document.createElement('');
  //content.content;
  
  $(section).on("click", function(event) {
    var container = event.target;
    $(container).toggleClass('active');
    console.log(container);
    if ($(container).hasClass('active')) {
      $(".box").addClass('hidden');
      $(container).removeClass('hidden');
      TweenMax.to('.hidden', 0.3, {opacity:0});
    } else {
      $(".box").removeClass('hidden');
      TweenMax.to('.box', 0.3, {opacity:1}); 
    } 
  });
  
  //description.innerHTML += content.description;
  header.className += "header";
  content.className += "content";
  
  
  document.getElementsByTagName('body')[0].appendChild(section);
  (section).appendChild(header);
  (header).appendChild(title);
  (section).appendChild(content);
  
  //    var arr = ["Hope & Bike", "Figurines imprimées en 3D", "Imprimante prusa I3", "Onewheel", "TreasureBox", "T-shirt Stromtrooper"];
  //    title.innerHTML = arr[i];
  //title.innerHTML += content.title;
  //    aside.style.backgroundImage = "url('content/img/" + i + ".jpg')";
  //    aside.style.backgroundSize = "cover";
  //    console.log(i);
  title.innerHTML += projects.title;
  content.innerHTML += projects.content;

}

///////////////////////////////////LANCEMENT DE LA GENERATION DES PROJETS//////////////////////////////////////////////     




$( function() {
  var folders = ["figurines3d", "hopeandbike", "imprimanteprusai3", "onewheel", "treasurebox", "tshirtstormtrooper"];       
      
  for (var i=0;i<folders.length;i++){
    var req = new XMLHttpRequest();
    req.open('GET', 'content/'+ folders[i]+'/textContent.json')      
    req.onreadystatechange = function(event) {
      // XMLHttpRequest.DONE === 4
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
          GenerateContent(this.responseText);
        } else {
          console.log("Status de la réponse: %d (%s)", this.status, this.statusText);10
        }
      }
    };
    req.send();
  }
})