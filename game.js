var app = {};

function startGame() {
  app.canvas = document.getElementById("canvas");
  app.context = app.canvas.getContext("2d");

  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}