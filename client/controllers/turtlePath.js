/*
* Turtle path canvas controller
*/

// position variables
var pos = {
  x : 0, 
  y : 0,
  z : 0,
  li: 0,
  av: 0,
  t : 0
};
var oldX;
var oldY;

// subscription to turtle_pose topic
turtle_pose.subscribe(function(message) {
  // only draws if the control vector of turtlesim has changed
  if (message.x != pos.x || message.y != pos.y || message.z != pos.z || message.theta != pos.t ||
    message.linear_velocity != pos.li || message.angular_velocity != pos.av){
    pos.x = message.x;
    pos.y = message.y;
    pos.z = message.z;
    pos.t = message.theta;
    pos.li = message.linear_velocity;
    pos.av = message.angular_velocity;
    drawTrutlePath(pos);
  }
});

// draws in the canvas, according to turtlesim position
drawTrutlePath = function (message) {
  var canvasSize = 300; // 300x300 in html
  var zoom = canvasSize / 12; // tutle sim is 12x12 in size
  var x = message.x * zoom;
  var y = canvasSize - message.y * zoom; // coordinates for y are reversed
  
  var c = document.getElementById("turtle");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  if (!oldX || !oldY){
    oldX = x;
    oldY = y;  
  }
  ctx.moveTo(oldX, oldY);
  ctx.lineTo(x, y);
  oldX = x;
  oldY = y;
  ctx.stroke();
};

resetPosition = function(){
  oldX = null;
  oldY = null;
};