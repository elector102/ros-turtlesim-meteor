// if (Meteor.isClient) {
//   // counter starts at 0
//   Session.setDefault('counter', 0);

//   Template.hello.helpers({
//     counter: function () {
//       return Session.get('counter');
//     }
//   });

//   Template.hello.events({
//     'click button': function () {
//       // increment the counter when button is clicked
//       Session.set('counter', Session.get('counter') + 1);
//     }
//   });
// }

// Connecting to ROS
// -----------------
var ros = new ROSLIB.Ros();
// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function(error) {
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('error').style.display = 'inline';
  console.log(error);
});
// Find out exactly when we made a connection.
ros.on('connection', function() {
  console.log('Connection made!');
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('connected').style.display = 'inline';
});
ros.on('close', function() {
  console.log('Connection closed.');
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'inline';
});
// Create a connection to the rosbridge WebSocket server.
ros.connect('ws://localhost:9090');

// Connect with turtle position, in order to draw movements
var posE = new ROSLIB.Topic({
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
});

// Connect with turtle movement topic, in order to push some control vectors
var turtle_cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});

var drawStar = function (){
  for(var i = 0; i<10; i=i+2){
    setTimeout(function(){
      turtle_cmdVel.publish(getControlVector(5.0,0.0));
    }, i*1000); 
    setTimeout(function(){
      turtle_cmdVel.publish(getControlVector(0.0,2.5));
    }, i*1000 + 1000);
  }
};

drawStar();
