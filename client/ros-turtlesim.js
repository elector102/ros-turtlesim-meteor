if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

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
var i = 0;
var posE = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/pose',
  messageType : 'turtlesim/Pose'
});
posE.subscribe(function(message) {
  //console.log(i + ' - Received message on ' + posE.name + ': ' + JSON.stringify(message));
  drawTrutlePath(message);
  i++;
});
//----------------------

// Connect with turtle movement topic, in order to push some control vectors
var turtle_cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});
// payload
var twist = new ROSLIB.Message({
  linear : {
    x : 2.0,
    y : 0.0,
    z : 0.0
  },
  angular : {
    x : 0.0,
    y : 0.0,
    z : 0.0
  }
});
turtle_cmdVel.publish(twist); // draw turtle path

var oldX;
var oldY;

var drawTrutlePath = function (message) {
  
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