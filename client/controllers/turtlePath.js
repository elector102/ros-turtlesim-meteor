// turtle path canvas controller

// Connect with turtle position, in order to draw movements
posE = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/pose',
  messageType : 'turtlesim/Pose'
});

var pos = {
  x : 0, 
  y : 0,
  z : 0,
  li: 0,
  av: 0,
  t : 0
}; 

posE.subscribe(function(message) {
  if (message.x != pos.x || message.y != pos.y || message.z != pos.z || message.theta != pos.t ||
    message.linear_velocity != pos.li || message.angular_velocity != pos.av){
    pos.x = message.x;
    pos.y = message.y;
    pos.z = message.z;
    pos.t = message.theta;
    pos.li = message.linear_velocity;
    pos.av = message.angular_velocity;
  }
  drawTrutlePath(message);
});

//

var oldX;
var oldY;

drawTrutlePath = function (message) {
  
  var canvasSize = 300; // 300x300 in html
  var zoom = canvasSize / 12; // tutle sim is 12x12 in size
  
  var x = message.x * zoom;
  var y = canvasSize - message.y * zoom; // coordinates for y are reversed
  
  if (!(x === oldX && y === oldY)) {
    var c = document.getElementById("turtle");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    if (!oldX && !oldY) {
      oldX = x;
      oldY = y;
    };
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(x, y);
    ctx.stroke();
    oldX = x;
    oldY = y;
  }
};