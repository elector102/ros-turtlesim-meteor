/*
*		ROS link functions 
*/

window.subscriptionCallback = function (message){
	console.log(JSON.stringify(message));
};

/*
*		Control Vector functions
*/
window.getControlVector = function(linear, angular){
	var vector = new ROSLIB.Message({
		linear : {
			x : linear,
			y : 0.0,
			z : 0.0
		},
		angular : {
			x : 0.0,
			y : 0.0,
			z : angular
		}
	});
	return vector;
};
