/*
* Main app controller
*/

// read file upload
window.onload = function() {
  document.getElementById('turtlesim').style.display = 'none';
  generateStarJSON();
  var fileList = document.getElementById('controlFile');
  var display = document.getElementById('fileDisplay');

  fileList.addEventListener('change', function(event) {
    if (fileList.files.length !== 0){
      var file = fileList.files[0];
      var textType = /.*/;

      if (file.type.match(textType)) {
        var reader = new FileReader();

        reader.onload = function(event) {
          fileDisplay.value = reader.result;
        }
        reader.readAsText(file);
      } else {
        display.value = "File not supported!"
      }
    }
  });
}

draw = function (){
  var fileList = document.getElementById('controlFile');
  var display = document.getElementById('fileDisplay');
  if (display.value !== "") {
    var json = JSON.parse(display.value);
    var cList = json.commands;
    var commands = [];

    for (var i=0; i<cList.length; i++) {
      var cmd = getControlVector(Number(cList[i].li),Number(cList[i].an));
      commands.push(cmd);
    };
    drawCommandList(commands);
  }
};

// reset function
reset = function (){
  var canvas = document.getElementById("turtle");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 300, 300);
  resetPosition();
  turtlesimReset();
};

clean = function(){
  var fileList = document.getElementById('controlFile');
  var display = document.getElementById('fileDisplay');
  display.value = "";
  fileList.value = "";
};

generateStarJSON = function(){
  var display = document.getElementById('fileDisplay');
  var star = { commands:[
    {li : 2.5, an : 0.0},
    {li : 0.0, an : 2.525},
    {li : 2.5, an : 0.0},
    {li : 0.0, an : 2.525},
    {li : 2.5, an : 0.0},
    {li : 0.0, an : 2.525},
    {li : 2.5, an : 0.0},
    {li : 0.0, an : 2.525},
    {li : 2.5, an : 0.0},
    {li : 0.0, an : 2.525}
  ]};
  display.value = JSON.stringify(star);
};
