const game = {
  loop: {
    dropCounter: 0,
    dropInterval: 1500,
    lastTime: 0,
    fr: null,
  },

  config: {
    //ghostPiece: true,
  },

  piece: null,
  nextThreePieces: [],

  reset() {
    // do stuff maybe
  },

  start() {
    this.createPlayfield();
    this.newPiece();
    playfield = new Playfield();
    game.mainLoop();
  },

  newPiece() {
    this.piece = Piece.select()
  },
  
  resume() {
    this.mainLoop();
  },
  
  stop() {
    cancelAnimationFrame(this.loop.fr);
    this.killscreen();
  },

  killscreen() {
    const outer = document.createElement("div");
    outer.setAttribute("class", "killscreen");
    const  inner = document.createElement("div");
    const text = document.createTextNode("Game Over :(");
    const btn = document.createElement("button");
    btn.innerHTML = "Restart";
    btn.addEventListener("click", this.start);
    inner.appendChild(text);
    inner.appendChild(btn);
    outer.appendChild(inner);
    document.querySelector(".container").appendChild(outer);
  },



  createPlayfield() {
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
    this.piece.draw();
    this.piece.getGhost();
  },

  drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },

  mainLoop(time = 0) {
    this.loop.fr = requestAnimationFrame(this.mainLoop.bind(this));

    const deltaTime = time - this.loop.lastTime;
  
    this.loop.dropCounter += deltaTime;

    if (this.loop.dropCounter > this.loop.dropInterval) {
      this.piece.drop();
    }
  
    this.loop.lastTime = time;
  
    game.drawAll();
  }
}


