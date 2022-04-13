const game = {
  loop: {
    dropCounter: 0,
    dropInterval: 500,
    lastTime: 0,
    fr: null,
  },

  config: {
    //ghostPiece: true,
  },

  status: {
    //running: true,
  },

  reset() {
    // do stuff maybe
  },

  start() {
    this.createCanvas();
    piece = Piece.select()
    this.mainLoop();
  },
  
  stop() {
    cancelAnimationFrame(this.loop.fr);
  },

  createCanvas() {
    document.querySelector(".container").innerHTML = "<canvas>";
    canvas = document.querySelector("canvas");
    canvas.width = 300;
    canvas.height = 600;
    ctx = canvas.getContext("2d");
    ctx.scale(30, 30);
  },

  drawAll() {
    this.drawCanvas();
    playfield.draw();
    piece.draw();
  },

  drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },

  mainLoop(time = 0) {
    const deltaTime = time - this.loop.lastTime;
  
    this.loop.dropCounter += deltaTime;
    if (this.loop.dropCounter > this.loop.dropInterval) {
      piece.drop();
    }
  
    this.loop.lastTime = time;
  
    game.drawAll();
    this.loop.fr = requestAnimationFrame(this.mainLoop.bind(this));
  }
}


