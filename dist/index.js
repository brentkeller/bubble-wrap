var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#e8faff",
  physics: {
    default: "arcade"
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var graphics;
var circles;
var game = new Phaser.Game(config);
var circleRadius = 45;

function preload() {
  this.load.audio("pop", ["PopBanner.mp3"]);
}

function create() {
  graphics = this.add.graphics({ fillStyle: { color: 0xcff1fa } });
  var sfx = this.sound.add("pop");

  circles = [];

  for (var x = 0; x < 8; x++) {
    circles[x] = [];
    for (var y = 0; y < 6; y++) {
      circles[x][y] = new Phaser.Geom.Circle(
        50 + x * 100,
        50 + y * 100,
        circleRadius
      );
    }
  }

  this.input.on("pointerdown", function(pointer) {
    var x = Math.floor(pointer.x / 100);
    var y = Math.floor(pointer.y / 100);
    var targetCircle = circles[x][y];

    if (targetCircle.radius > 0) {
      targetCircle.radius--;
      sfx.play();
    }
  });
}

function update() {
  graphics.clear();

  for (var x = 0; x < 8; x++) {
    for (var y = 0; y < 6; y++) {
      var circle = circles[x][y];
      if (circle.radius > 0 && circle.radius < circleRadius)
        circle.radius = circle.radius * 0.7;
      if (circle.radius < 2) circle.setEmpty();
      graphics.fillCircleShape(circle);
    }
  }
}
