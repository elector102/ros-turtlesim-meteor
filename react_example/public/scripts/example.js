var TurtleCanvas = React.createClass({
  getInitialState: function() {
    return {
      pos: {
        x : 0,
        y : 0,
        z : 0,
        li: 0,
        av: 0,
        t : 0
      },
      oldX: 0,
      oldY: 0
    };
  },

  componentDidMount: function() {
    let pose = this.state.pos;
    this.props.posTopic.subscribe(message => {
      // only draws if the control vector of turtlesim has changed
      if (message.x != pose.x || message.y != pose.y || message.z != pose.z || message.theta != pose.t ||
        message.linear_velocity != pose.li || message.angular_velocity != pose.av){
        this.setState ( {
          pos: {
            x: message.x,
            y: message.y,
            z: message.z,
            t: message.theta,
            li: message.linear_velocity,
            av: message.angular_velocity
          }
        });
        this.drawTrutlePath();
      }
    });
  },

  drawTrutlePath: function() {
    let message = this.state.pos;
    let oldX = this.state.oldX;
    let oldY = this.state.oldY;

    var canvasSize = 300; // 300x300 in html
    var zoom = canvasSize / 12; // tutle sim is 12x12 in size
    var x = message.x * zoom;
    var y = canvasSize - message.y * zoom; // coordinates for y are reversed

    var c = document.getElementById("turtle");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    if (!oldX || !oldY){
      this.setState({oldX: x});
      this.setState({oldY: y});
    }
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(x, y);
    this.setState({oldX: x});
    this.setState({oldY: y});
    ctx.stroke();
  },

  render: function() {
    return (
      <div id="turtlesim">
        <br /><br />

        <button type="button" onclick="reset()">Reset</button>
        <button type="button" onclick="draw()">Draw</button>

        <br /><br />

        <div>
          <canvas
            id="turtle"
            width="300"
            height="300"
            style={{
              border: '3px solid #000000',
              background: '#0000ff'
            }}>
          </canvas>
        </div>
      </div>
    );
  }
});

var FileLoader = React.createClass({
  render: function() {
    return (
      <div></div>
    );
  }
});

var Header = React.createClass({
  render: function() {
    let status = this.props.connected ? 'Connected' : 'Disconnected'
    return (
      <div id="statusIndicator">
          <p>rosbridge status: {status}</p>
      </div>
    );
  }
});

var TurtleSim = React.createClass({
  componentWillMount: function() {
    this.subscribeToROS();
  },

  getInitialState: function() {
    return {
      connected: false
    };
  },

  subscribeToROS: function() {
    // ROS connection
    var connectionUrl = 'ws://localhost:9090';
    var ros = new ROSLIB.Ros({
      url: connectionUrl
    });

    ros.on('error', () => {
      this.setState({connected: false})
    });
    ros.on('connection', () => {
      this.setState({connected: true})
    });
    ros.on('close', () => {
      this.setState({connected: false})
    });

    // Connect with turtle movement topic, in order to push some control vectors
    var turtle_cmdVel = new ROSLIB.Topic({
      ros : ros,
      name : '/turtle1/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    // Connect with turtle position, in order to draw movements
    var turtle_pose = new ROSLIB.Topic({
      ros : ros,
      name : '/turtle1/pose',
      messageType : 'turtlesim/Pose'
    });

    // Service connection for reseting turtlesim
    var resetSlate = new ROSLIB.Service({
      ros : ros,
      name : '/reset',
        serviceType : 'std_srvs/Empty'
    });

    this.setState({
      cmdVel: turtle_cmdVel,
      pose: turtle_pose,
      reset: resetSlate,
    });
  },

  render: function() {
    //<FileLoader renderFile={this.renderFromFile} />
    return (
      <div className="turtleSim">
        <div>
          <Header connected={this.state.connected} />
          <TurtleCanvas posTopic={this.state.pose} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <TurtleSim />, document.getElementById('content')
);
