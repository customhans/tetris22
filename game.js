const game = {
  loop: {
    dropCounter: 0,
    dropInterval: 300,
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
    /**
    * "This" is still referring to the button here,
    * so use "game" instead
    */
    game.createCanvas();
    playfield = new Playfield();
    piece = Piece.select()
    game.mainLoop();
  },
  
  resume() {
    game.mainLoop();
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
    this.loop.fr = requestAnimationFrame(this.mainLoop.bind(this));

    const deltaTime = time - this.loop.lastTime;
  
    this.loop.dropCounter += deltaTime;
    if (this.loop.dropCounter > this.loop.dropInterval) {
      piece.drop();
    }
  
    this.loop.lastTime = time;
  
    game.drawAll();
  }
}


