const game = {
  loop: {
    dropCounter: 0,
    dropInterval: 1500,
    lastTime: 0,
    fr: null,
    gravity: true,
  },

  config: {
    //ghostPiece: true,
  },

  piece: null,
  nextThreePieces: [],

  reset() {
    // do stuff maybe
  },

  updatePreviewPieces() {
    let counter = this.nextThreePieces.length;
    while (counter++ < 3) {
      this.nextThreePieces.push(this.selectRandomPiece());
    }

    this.updateDisplayPreviewPieces();
  },

  updateDisplayPreviewPieces() {
    imgs = [...document.querySelectorAll("#preview > img")];
    const path = "./img/preview/";
    const ext = ".png";
    
    imgs.forEach((img, idx) => {
      img.src = path + this.nextThreePieces[idx].type + ext;
    });
  },

  selectRandomPiece() {
    const randomNumber = (Math.random() * PIECES.length) | 0;

    // this needs to be a clone, otherwise source matrix gets changed
    return new Piece(structuredClone(PIECES[randomNumber]));
  },

  start() {
    timer.start();

    // "this" might refer to restart button, so use "game"
    game.createPlayfield();
    game.newPiece();
    playfield = new Playfield();
    game.mainLoop();
  },

  newPiece() {
    this.updatePreviewPieces();

    // cut first of the nextThreePieces
    this.piece = this.nextThreePieces.shift();
    
    /* // DEV: get certain piece
    this.piece = new Piece(PIECES[6]) */

    // immediately replace it in the preview array
    this.updatePreviewPieces();
  },

  resume() {
    this.mainLoop();
  },

  pause() {
    cancelAnimationFrame(this.loop.fr);
  },

  stop() {
    cancelAnimationFrame(this.loop.fr);
    this.killscreen();
  },

  killscreen() {
    const outer = document.createElement("div");
    outer.setAttribute("class", "killscreen");
    const inner = document.createElement("div");
    const text = document.createTextNode("Game Over :(");
    const btn = document.createElement("button");
    btn.innerHTML = "Restart";
    btn.addEventListener("click", this.start);
    inner.appendChild(text);
    inner.appendChild(btn);
    outer.appendChild(inner);
    document.getElementById("playfield").appendChild(outer);
  },

  createPlayfield() {
    document.getElementById("playfield").innerHTML = "<canvas>";
    canvas = document.querySelector("canvas");
    canvas.width = 300;
    canvas.height = 600;
    ctx = canvas.getContext("2d");
    ctx.scale(30, 30);
  },

  drawAll() {
    this.drawCanvas();
    playfield.draw();
    this.piece.draw("original");
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
      if (this.loop.gravity) this.piece.drop();
    }

    this.loop.lastTime = time;

    game.drawAll();
  },
};
