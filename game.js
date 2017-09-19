var app = {};

function startGame() {
  app.canvas = document.getElementById("canvas");
  app.context = app.canvas.getContext("2d");

  spawnHero();
  spawnRock();
  app.canvas.addEventListener("mousemove", onMouseMove, false);
  window.requestAnimationFrame(nextGameStep);
}

function spawnHero() {
  app.hero = {
    position: {x: 400, y: 400},
    size: 60,
  };
}

function spawnRock() {
  app.rock = {
    position: {x: 100, y: 100},
    size: 120,
    speed: 3,
  };
}

function onMouseMove(event) {
  app.hero.position.x = event.pageX;
  app.hero.position.y = event.pageY;
}

function drawHero() {
  app.context.fillStyle = "yellow";
  app.context.fillRect(app.hero.position.x, app.hero.position.y, app.hero.size, app.hero.size);
}

function drawRock() {
  app.context.fillStyle = "gray";
  app.context.fillRect(app.rock.position.x, app.rock.position.y, app.rock.size, app.rock.size);
}

function drawBackground() {
  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}

function nextGameStep(timestamp) {
  window.requestAnimationFrame(nextGameStep);

  app.rock.position.y += app.rock.speed;

  drawFrame();
}

function drawFrame() {
  drawBackground();
  drawHero();
  drawRock();
}