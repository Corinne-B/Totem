var divMouseDownTimeout;
var isMouseHeld = false
$("#main").mousedown(function(e) {
  divMouseDownTimeout = setTimeout(function() {
    isMouseHeld = true
  }, 1000);
});

document.body.onclick = appendSign

function appendSign (e) {
  if (isMouseHeld) {
    isMouseHeld = false
    var div = document.createElement('div');

    div.style.backgroundImage = "url('content/totem/totem_1.png')";
    div.style.indexZ = "0"
    div.style.backgroundSize = "cover";
    div.style.position = "absolute";
    div.style.left = e.clientX + document.body.scrollLeft;
    div.style.top = e.clientY + document.body.scrollTop;
    div.style.height = "20px";
    div.style.width = "20px";

    document.body.appendChild(div);
  } else {
  }
}

$('#main').mouseup(function() {
  if (divMouseDownTimeout) {
   clearTimeout(divMouseDownTimeout);
  }
});

