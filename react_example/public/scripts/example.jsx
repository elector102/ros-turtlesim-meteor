var TurtleCanvas = React.createClass({
  getInitialState: function() {
    return {
      oldX: 0,
      oldY: 0
    };
  },

  componentDidMount: function() {
    let pose = this.state.pos;
    var self = this;
    var socket = new WebSocket('ws://localhost:5000');
    socket.onopen = function () {
        socket.send('hello from the client');
    };

    socket.onmessage = function (message) {
      console.log(message)
        self.drawTurtlePath(JSON.parse(message.data));
    };

    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error);
    };
  },

  drawTurtlePath: function(pos) {
    let message = pos;
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
  getInitialState: function() {
    return {
      connected: false
    };
  },

  render: function() {
    return (
      <div className="turtleSim">
        <div>
          <Header connected={this.state.connected} />
          <TurtleCanvas />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <TurtleSim />, document.getElementById('content')
);
