var ROSLIB = require('roslib');

function RosTopicWrapper(topic, eqFun) { 
  this.topic = topic;
  this.eq = eqFun;
  this.currentData = null;
  this.ros = new ROSLIB.Ros();
  this.ros.connect('ws://localhost:9090');  
  this.ros.on('error', function(error) {
    console.log(error);
  });
};

RosTopicWrapper.prototype.startSubscription = function(conn) {
  var self = this;
  this.topic.subscribe(function(message) {
    if (self.currentData == null || !self.eq(self.currentData,message)) {
      self.currentData = message;
      conn.sendUTF(JSON.stringify(this.currentData));
    }
  });
};

module.exports = RosTopicWrapper;
