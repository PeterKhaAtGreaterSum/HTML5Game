var app = {};

function startGame() {
  app.canvas = document.getElementById("canvas");
  app.context = app.canvas.getContext("2d");

  drawBackground();

  var hero = {
    position: {x: 400, y: 400},
    size: 60,
  };

  app.context.fillStyle = "yellow";
  app.context.fillRect(hero.position.x, hero.position.y, hero.size, hero.size);
}

function drawBackground() {
  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}
