
var fr;

const game = {
  loop: {
    dropCounter: 0,
    dropInterval: 300,
    lastTime: 0,
  },

  start() {
    this.mainLoop();
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

  end() {
    cancelAnimationFrame(fr);
  },

  mainLoop(time = 0) {
    const deltaTime = time - this.loop.lastTime;
  
    this.loop.dropCounter += deltaTime;
    if (this.loop.dropCounter > this.loop.dropInterval) {
      piece.drop();
    }
  
    this.loop.lastTime = time;
  
    game.drawAll();
    fr = requestAnimationFrame(this.mainLoop.bind(this));
  }
}


