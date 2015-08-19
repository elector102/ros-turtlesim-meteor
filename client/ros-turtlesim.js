/*
* Main app controller
*/

// draw a star
drawStar();

// reset function
reset = function (){
  var canvas = document.getElementById("turtle");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 300, 300);
  resetPosition();
  turtlesimReset();
}
