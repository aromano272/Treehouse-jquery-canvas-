// problem: no user interaction causes no change to application
// solution: when user interacts cause changes appropriatly

var color = $(".selected").css("background-color");
// initial value for lineSize for the first 3 swatches
var initial_lineSize = 1;
// this grabs the first element on the canvas element array for the drawing code
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var lineSizeCache;

// when clicking on control list items
// here we use the on method in the parent, and then pass in as a parameter the element that we actually want to listen to
// we do this way because the click() method only works on elements present when the page is loaded, and it will not
// listen on dynamicly added items like a newColor
$(".controls").on("click", "li", function() {
  // deselect sibling elements
  $(this).siblings().removeClass("selected");
  // select clicked element
  $(this).addClass("selected");
  // cache current color here
  color = $(this).css("background-color");

  // ainda nao foi definido
  lineSizeCache = $(this).children().css("width");
  console.log("lineSizeCache value: " + lineSizeCache);
});
  

// when clicking "New Color"
$("#revealColorSelect").click(function() {
  // changes the color preview when we click it
  changeColor();
  // show color select or hide the color select
  $("#colorSelect").toggle();
});


// update the new color span
var changeColor = function() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  lineSizeCache = $("#thickness").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
};

// when color sliders change
// $("input[type=range]").change(changeColor);

// update when sliders move instead of on change
$("input[type=range]").mousemove(changeColor);
  

// when clicking the "Add Color"
$("#addNewColor").click(function() {
  // append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);

  // adds the line thickness to the new color
  newColorStyle($("#thickness").val());

  // select the new color and deselect everything else
  // where we just trigger a click event instead of re writting the whole event handler above
  $newColor.click();

  // closes the menu after adding new color
  $("#colorSelect").hide();
  // resets sliders
  $("input[type=range]").val(0);
});
  

// on mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  // draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.lineWidth = parseInt(lineSizeCache, 10);  
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});

// clears the canvas
$("#clearCanvas").click(function() {
  context.clearRect(0, 0, $canvas[0].width, $canvas[0].height);
});

// css class

// starts at 3 since there is already 3 at the start
var i = 0;
var $colorSwatches = $(".controls ul li");



// $colorSwatches.eq(i).append($thicknessDisplay);

var newColorStyle = function(thickness) {
  var $thicknessDisplay = $("<span></span>");

  $(".controls ul li").eq(i).append($thicknessDisplay).children().addClass("colorSwatch").css({
    width: thickness * 2 + "px",
    height: thickness * 2 + "px"
  });
  console.log("newColorStyle()" + " i value " + i);
  i++
};

// initializes the thickness representation for the starting elements
for (var i = 0; i < $colorSwatches.length; i) {
  newColorStyle(initial_lineSize);;
};




