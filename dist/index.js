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
    create: create
  }
};

var game = new Phaser.Game(config);

function preload() {
  this.load.audio("theme", ["PopBanner.mp3"]);
}

function create() {
  var graphics = this.add.graphics({ fillStyle: { color: 0xcff1fa } });
  var sfx = this.sound.add("theme");

  var circles = [];

  for (var x = 0; x < 8; x++) {
    circles[x] = [];
    for (var y = 0; y < 6; y++) {
      circles[x][y] = new Phaser.Geom.Circle(50 + x * 100, 50 + y * 100, 45);
    }
  }

  this.input.on("pointerdown", function(pointer) {
    var x = Math.floor(pointer.x / 100);
    var y = Math.floor(pointer.y / 100);

    circles[x][y].setEmpty();
    sfx.play();

    redraw();
  });

  redraw();

  function redraw() {
    graphics.clear();

    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 6; y++) {
        graphics.fillCircleShape(circles[x][y]);
      }
    }
  }
}
