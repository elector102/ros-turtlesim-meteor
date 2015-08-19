# ros-turtlesim-meteor

## Synopsis

This is a simple meteor app thats connects to a ROS Node running Turtlesim and draws a turtle's path as it moves. 
The connection is done using roslibJS (on the client-side) and ros-indigo-rosbridge-server (on the server-side).

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
After meteor launches the app, you can check it out in the browser at:
```
http://localhost:3000/
```

### Uploading your own examples
You can upload you own drawings in ***JSON*** format.
The file consists of an array of instructions that will be executed in series.
Each command has two properties:
- `li`: is the linear velocity (draws a line)
- `an`: is the angular velocity (rotates)

Check out this simple example:
```json
{
  "commands": [
    {
      "li": "2.0",
      "an": "0.0"
   },
  {
      "li": "0.0",
      "an": "2.0"
   },
    {
      "li": "3.0",
      "an": "0.0"
   }
  ]
}
```
Here we draw a line, then we rotate, and then we draw a longer line.
Try it out and see what happens!

### Configuring the roslibjs and rosbridge connection
The ***url*** and ***port*** of the server to which ***roslibjs*** connects to the ***rosbridge*** can be configured in:
```
public/config.json
```
```json
{
  "connectionUrl": "ws://localhost:9090"
}
```
The app connects to `ws://localhost:9090` by default.

## Contributors

This is just a test, feel free to fork and use at your own risk! ***This is repo is not maintained***.
