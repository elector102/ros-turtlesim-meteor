var server = require('websocket').server;
var http = require('http');
var RosTopicWrapper = require('./RosTopicWrapper');

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

// ROS
var turtle_pose = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/pose',
  messageType : 'turtlesim/Pose'
});

var posEqFunction = function (posA, posB) {
  return posA.x == posB.x && posA.y == posB.y && posA.z == posB.z && posA.theta == posB.theta &&
    posA.linear_velocity == posB.linear_velocity && posA.angular_velocity == posB.angular_velocity;
}

var RTW = new RosTopicWrapper(turtle_pose, posEqFunction);

if (connection && RTW) {
  RTW.startSubscription(connection);
}
