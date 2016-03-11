var server = require('websocket').server
var http = require('http');
var ROSLIB = require('roslib');

// ROS connection
ros = new ROSLIB.Ros();
ros.connect('ws://localhost:9090');  
ros.on('error', function(error) {
  console.log(error);
});

// websocket
var socket = new server({
    httpServer: http.createServer().listen(5000)
});

var connection = null;
socket.on('request', function(request) {
    connection = request.accept(null, request.origin);

    connection.on('close', function(connection) {
        console.log('connection closed');
    });
});

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

// Connect with turtle position, in order to draw movements
turtle_pose = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/pose',
  messageType : 'turtlesim/Pose'
});

// pose sub
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
    if (connection) {
      connection.sendUTF(JSON.stringify(pos));
    }
  }
});
