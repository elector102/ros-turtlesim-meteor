# ros-turtlesim-meteor

## Synopsis

This is a simple meteor app thats connects to a ROS Node running Turtlesim and draws a turtle's path as it moves. 
The connection is done using roslibJS (on the client-side) and ros-hydro-rosbridge-server (on the server-side).

## Installation
The app should be run on a machine with ***Ubuntu 14.04*** OS and the ***Meteor*** framework installed.

The backend should be run on a machine with ***Ubuntu 14.04*** OS with ***ROS***, ***Turtlesim*** and the ***rosbridge_suite*** installed.

Dependencies for each environment are detailed below, with links for each installation.

### Pre-requisites

#### Back-end
- [Ubuntu 14.04](http://www.ubuntu.com/download/)
- [ROS (indigo)](http://wiki.ros.org/indigo/Installation/Ubuntu)
- [Turtlesim](http://wiki.ros.org/turtlesim)
- [rosbridge_suite](http://wiki.ros.org/rosbridge_suite)

#### Front-end
- [Meteor](https://www.meteor.com/install)

### Installing and running the app
```
> git clone https://github.com/luisbosch/ros-turtlesim-meteor.git
> cd ros-turtlesim-meteor
> meteor
```

The server to which roslib connects to can be configured in:
```
public\config.json
```
```json
{
  "connectionUrl": "ws://192.168.0.104:9090"
}
```

## Contributors

This is just a test, feel free to fork and use at your own risk!. ***This is repo is not maintained***

## License

A short snippet describing the license (MIT, Apache, etc.)
