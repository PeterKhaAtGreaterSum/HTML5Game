var app = {};

function startGame() {
  app.canvas = document.getElementById("canvas");
  app.context = app.canvas.getContext("2d");

  drawBackground();
  spawnHero();
}

function spawnHero() {
  app.hero = {
    position: {x: 400, y: 400},
    size: 60,
  };
  drawHero();
}

function drawHero() {
  app.context.fillStyle = "yellow";
  app.context.fillRect(app.hero.position.x, app.hero.position.y, app.hero.size, app.hero.size);
}

function drawBackground() {
  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}

function drawFrame() {
  drawBackground();
  drawHero();
}