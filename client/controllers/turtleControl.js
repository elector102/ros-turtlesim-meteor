/*
* Control vector functions
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

// publish a list of commands to turtle_cmdVel
drawCommandList = function(cList){
  for(var k = 0; k<cList.length; k++){
    var elem = cList[k];
    publishCmd(elem, k*1000);
  }
};
publishCmd = function(cmd, delay){
  setTimeout(function(){
    turtle_cmdVel.publish(cmd);
  }, delay);
}

// Example: draw a 5-pointed star
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

turtlesimReset = function () {
  resetSlate.callService({}, function(result) {});
};


