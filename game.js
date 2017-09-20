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
  app.canvas.addEventListener("mousemove", onMouseMove, false);
  app.startTime = performance.now();
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
    spawnRock();
  }
}

function spawnRock() {
  var rock = {
    position: {
      x: Math.random() * app.canvas.width,
      y: Math.random() * -app.canvas.height,
    },
    size: 120,
    speed: 3,
    image: app.rockImage,
    angle: Math.random() * 2 * Math.PI,
    rotateSpeed: Math.random() * 2 * Math.PI / 150,
    nextRockStep: function() {
      this.move();
      this.angle += this.rotateSpeed;
      this.respawnRock();
      this.didRockHitHero();
    },
    move: function() {
      this.position.y += this.speed;
    },
    respawnRock: function() {
      if (this.position.y > app.canvas.height + this.size) {
        this.position = {
          x: Math.random() * app.canvas.width,
          y: Math.random() * -app.canvas.height,
        }
        if (app.hero.state !== "exploded") {
          this.speed += 1;
        }
      }
    },
    didRockHitHero: function(){
      if (getDistance(app.hero, this) < 50) {
        app.hero.image = app.explodedImage;
        app.hero.state = "exploded";
      }
    }
  };
  app.rocks.push(rock);
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
  context.rotate(object.angle);
  context.drawImage(object.image, -object.size/2, -object.size/2, object.size, object.size);
  context.restore();
}

function drawBackground() {
  app.context.fillStyle = "black";
  app.context.fillRect(0, 0, app.canvas.width, app.canvas.height);
}

function nextGameStep(timestamp) {
  window.requestAnimationFrame(nextGameStep);
  if (app.hero.state !== "exploded") {
    app.score = Math.floor((timestamp - app.startTime) / 1000);
  }
  app.rocks.forEach(function(rock) {
    rock.nextRockStep();
  });
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
  app.rocks.forEach(function(rock) {
    drawObject(rock);
  });
  drawScore();
}

function drawScore() {
  var context = app.context;
  context.textAlign = "center";
  context.fillStyle = "yellow";
  if (app.hero.state === "exploded") {
    context.font = "italic 125px Calibri";
    context.fillText("Score " + app.score, app.canvas.width/2, app.canvas.height/2);
  } else {
    context.font = "italic 30px Calibri";
    context.fillText("Score " + app.score, app.canvas.width/2, 40);
  }
}