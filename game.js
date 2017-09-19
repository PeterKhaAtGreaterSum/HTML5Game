var app = {};

function startGame() {
  app.canvas = document.getElementById("canvas");
  app.context = app.canvas.getContext("2d");

  app.shipImage = new Image();
  app.shipImage.src = "images/ship.png";
  app.rockImage = new Image();
  app.rockImage.src = "images/rock.png";
  app.explodedImage = new Image();
  app.explodedImage.src = "images/exploded.png";

  spawnHero();
  spawnRocks();
  spawnRock();
  app.canvas.addEventListener("mousemove", onMouseMove, false);
  window.requestAnimationFrame(nextGameStep);
}

function spawnHero() {
  app.hero = {
    position: {x: 400, y: 400},
    size: 60,
    image: app.shipImage,
  };
}

function spawnRocks() {
  app.rocks = [];
  for (var i = 0; i < 10; i++) {
    
  }
}

function spawnRock() {
  app.rock = {
    position: {
      x: Math.random() * app.canvas.width,
      y: Math.random() * -app.canvas.height,
    },
    size: 120,
    speed: 3,
    image: app.rockImage,
    move: function() {
      this.position.y += this.speed;
    }
  };
}

function onMouseMove(event) {
  if (app.hero.state !== "exploded") {
    app.hero.position.x = event.pageX;
    app.hero.position.y = event.pageY;
  }
}

function drawObject(object) {
  var context = app.context;
  context.save();
  context.translate(object.position.x, object.position.y);
  context.drawImage(object.image, -object.size/2, -object.size/2, object.size, object.size);
  context.restore();
}

function drawBackground() {
  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}

function nextGameStep(timestamp) {
  window.requestAnimationFrame(nextGameStep);

  var rock = app.rock;
  app.rock.move();
  if (rock.position.y > app.canvas.height + rock.size) {
    spawnRock();
  }

  if (getDistance(app.hero, app.rock) < 50) {
    app.hero.image = app.explodedImage;
    app.hero.state = "exploded";
  }

  drawFrame();
}

function getDistance(object1, object2) {
  var dx = object1.position.x - object2.position.x;
  var dy = object1.position.y - object2.position.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function drawFrame() {
  drawBackground();
  drawObject(app.hero);
  drawObject(app.rock);
}