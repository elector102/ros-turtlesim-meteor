/*
 *		ROS link functions
 */

// Connect with turtle movement topic, in order to push some control vectors
turtle_cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/turtle1/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});

drawStar = function (){
  for(var i = 0; i<10; i=i+2){
    setTimeout(function(){
      turtle_cmdVel.publish(getControlVector(5.0,0.0));
    }, i*1000); 
    setTimeout(function(){
      turtle_cmdVel.publish(getControlVector(0.0,2.5));
    }, i*1000 + 1000);
  }
};

subscriptionCallback = function (message) {
  console.log(JSON.stringify(message));
};

/*
 *		Control Vector functions
 */
getControlVector = function (linear, angular) {
  var vector = new ROSLIB.Message({
    linear: {
      x: linear,
      y: 0.0,
      z: 0.0
    },
    angular: {
      x: 0.0,
      y: 0.0,
      z: angular
    }
  });
  return vector;
};