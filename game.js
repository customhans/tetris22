let dropCounter = 0;
let dropInterval = 300;
let lastTime = 0;
var fr;

const game = {
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
    const deltaTime = time - lastTime;
  
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
      piece.drop();
    }
  
    lastTime = time;
  
    game.drawAll();
    fr = requestAnimationFrame(this.mainLoop.bind(this));
  }
}


