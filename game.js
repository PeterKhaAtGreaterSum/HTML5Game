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
    color: "yellow",
  };
}

function spawnRock() {
  app.rock = {
    position: {
      x: Math.random() * app.canvas.width,
      y: Math.random() * -app.canvas.height,
    },
    size: 120,
    speed: 3,
    color: "gray",
  };
}

function onMouseMove(event) {
  app.hero.position.x = event.pageX;
  app.hero.position.y = event.pageY;
}

function drawObject(object) {
  app.context.fillStyle = object.color;
  app.context.fillRect(object.position.x, object.position.y, object.size, object.size);
}

function drawBackground() {
  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}

function nextGameStep(timestamp) {
  window.requestAnimationFrame(nextGameStep);

  var rock = app.rock;
  rock.position.y += rock.speed;
  if (rock.position.y > app.canvas.height + rock.size) {
    spawnRock();
  }

  drawFrame();
}

function drawFrame() {
  drawBackground();
  drawObject(app.hero);
  drawObject(app.rock);
}