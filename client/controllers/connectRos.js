/*
* ROS Connection
*/

ros = new ROSLIB.Ros();
// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function(error) {
  document.getElementById('turtlesim').style.display = 'none';
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('error').style.display = 'inline';
  console.log(error);
});
// Find out exactly when we made a connection.
ros.on('connection', function() {
  console.log('Connection made!');
  document.getElementById('turtlesim').style.display = 'inline';
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('error').style.display = 'none';
  document.getElementById('closed').style.display = 'none';
  document.getElementById('connected').style.display = 'inline';
});
ros.on('close', function() {
  console.log('Connection closed.');
  document.getElementById('turtlesim').style.display = 'none';
  document.getElementById('turtlesim').style.display = 'none';
  document.getElementById('connecting').style.display = 'none';
  document.getElementById('connected').style.display = 'none';
  document.getElementById('closed').style.display = 'inline';
});
// Create a connection to the rosbridge WebSocket server.
ros.connect('ws://localhost:9090');

/*
* Configure connections to turtlesim Topics & Services
*/

// Connect with turtle movement topic, in order to push some control vectors
turtle_cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});

// Connect with turtle position, in order to draw movements
turtle_pose = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/pose',
  messageType : 'turtlesim/Pose'
});

// Service connection for reseting turtlesim
resetSlate = new ROSLIB.Service({
  ros : ros,
  name : '/reset',
    serviceType : 'std_srvs/Empty'
});
