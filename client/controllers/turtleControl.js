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

// TODO: As for now, this is unused
// clean and reset helpers
clean = function () {
  var canvas = document.getElementById("turtle");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 300, 300);
  cleanSlate.callService({}, function(result) {
    console.log('clean ok');
  });
};

turtlesimReset = function () {
  resetSlate.callService({}, function(result) {
    console.log('reset ok');
  });
};


