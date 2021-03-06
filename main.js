// //Make the DIV element draggagle:
// dragElement(document.getElementById("mydiv"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     /* otherwise, move the DIV from anywhere inside the DIV:*/
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
// function changeText(){
//     var newtext = document.getElementById("text").value;
//     document.getElementById("text1").innerHTML = newtext
// }


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var image;
// variables used to get mouse position on the canvas
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var scrollX = $canvas.scrollLeft();
var scrollY = $canvas.scrollTop();

// variables to save last mouse position
// used to see how far the user dragged the mouse
// and then move the text by that distance
var startX;
var startY;

// some text objects
var texts = [];

// some test texts
texts.push({
    text: "text 1",
    x: 20,
    y: 20
});
texts.push({
    text: "text 2",
    x: 20,
    y: 70
});

// calculate width of each text for hit-testing purposes
ctx.font = "16px verdana";
for (var i = 0; i < texts.length; i++) {
    var text = texts[i];
    text.width = ctx.measureText(text.text).width;
    text.height = 16;
}

// this var will hold the index of the selected text
var selectedText = -1;

// START: draw all texts to the canvas
draw();
canvas.width = 500;

// clear the canvas draw all texts
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(image != null){
      console.log("image not null")
      if(image.height > 200){
        canvas.height = image.height *.25
        canvas.width = image.width *.25
      }else{
        canvas.width = image.width;
        canvas.height = iamge.height;
      }
      ctx.drawImage(image,0,0);
    }
    for (var i = 0; i < texts.length; i++) {
        var text = texts[i];
        ctx.fillText(text.text, text.x, text.y);
        console.log("loop")
    }
}

// test if x,y is inside the bounding box of texts[textIndex]
function textHittest(x, y, textIndex) {
    var text = texts[textIndex];
    return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
}

// handle mousedown events
// iterate through texts[] and see if the user
// mousedown'ed on one of them
// If yes, set the selectedText to the index of that text
function handleMouseDown(e) {
    e.preventDefault();
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);

    // Put your mousedown stuff here
    for (var i = 0; i < texts.length; i++) {
        if (textHittest(startX, startY, i)) {
            selectedText = i;
        }
    }
}

// done dragging
function handleMouseUp(e) {
    e.preventDefault();
    selectedText = -1;
}

// also done dragging
function handleMouseOut(e) {
    e.preventDefault();
    selectedText = -1;
}

// handle mousemove events
// calc how far the mouse has been dragged since
// the last mousemove event and move the selected text
// by that distance
function handleMouseMove(e) {
    if (selectedText < 0) {
        return;
    }
    e.preventDefault();
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    var text = texts[selectedText];
    text.x += dx;
    text.y += dy;
    draw();
}
function changeText1(){
  var newtext1 = document.getElementById("text1").value
  var oldx = texts[0].x
  var oldy = texts[0].y
  texts[0] = {
    text: newtext1,
    x: oldx,
    y: oldy
  }
  texts[0].width = ctx.measureText(text.text).width;
  texts[0].height = 16;
  draw();
}

function changeText2(){
  var newtext2 = document.getElementById("text2").value
  var oldx = texts[1].x
  var oldy = texts[1].y
  texts[1] = {
    text: newtext2,
    x: oldx,
    y: oldy
  }
  texts[1].width = ctx.measureText(text.text).width;
  texts[1].height = 16;
  draw();
}

function handleImage(e){
  var reader = new FileReader();
  reader.onload = function(event){
    var img = new Image();
    img.onload = function(){
        console.log("image load")

            // set size proportional to image

            // step 1 - resize to 50%
        if(img.height > 200){
          canvas.height = img.height *.25
          canvas.width = img.width *.25
        }else{
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        ctx.drawImage(img,0,0);
        image = img
      }
      img.src = event.target.result;
    }
  reader.readAsDataURL(e.target.files[0]);     
  draw();
  }


// listen for mouse events
$("#canvas").mousedown(function (e) {
    handleMouseDown(e);
});
$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mouseup(function (e) {
    handleMouseUp(e);
});
$("#canvas").mouseout(function (e) {
    handleMouseOut(e);
});