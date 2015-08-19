# ros-turtlesim-meteor

## Synopsis

This is a simple meteor app thats connects to a ROS Node running Turtlesim and draws the turtle's path as it moves. 
The connection is done using ROSLibJS (on the client-side) and ros-hydro-rosbridge-server (on the server-side).

## Installation

### Pre-requisites

- [Ubuntu 14.4](http://www.ubuntu.com/download/)
- [ROS (indigo)](http://wiki.ros.org/indigo/Installation/Ubuntu)
- [rosbridge_suite](http://wiki.ros.org/rosbridge_suite)
- [Meteor](https://www.meteor.com/install)

### Installing and Running the app
```
> git clone https://github.com/luisbosch/ros-turtlesim-meteor.git
> cd ros-turtlesim-meteor
> meteor
```

The server to which roslib connects to can be configured in:
```
client\config\config.json
```

## Contributors

This is just a test, feel free to fork and use at your own risk!. ***This is repo is not maintained***

## License

A short snippet describing the license (MIT, Apache, etc.)