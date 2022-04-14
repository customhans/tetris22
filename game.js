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
    while(counter++ < 3) {
      this.nextThreePieces.push(this.selectRandomPiece());
    }
  },

  updatePreviewPiecesDisplay() {
    arr = [...document.querySelectorAll("#preview > img")];
    arr.forEach((img, idx) => img.src = "./img/preview/" + game.nextThreePieces[idx].type + ".jpg");
  },

  selectRandomPiece() {
    const randNr = Math.random() * 7 | 0;
    return new Piece(pieces[randNr]);
  },

  start() {
    this.createPlayfield();
    this.updatePreviewPieces();
    this.newPiece();
    playfield = new Playfield();
    game.mainLoop();
  },

  newPiece() {
    this.updatePreviewPiecesDisplay();

    // cut first of the nextThreePieces
    this.piece = this.nextThreePieces.shift();
    
    // immediately replace it in the preview array
    this.updatePreviewPieces();
    this.updatePreviewPiecesDisplay();
    console.log(this.nextThreePieces)
    //updatePreviewDisplay();
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
      if (this.loop.gravity) this.piece.drop();
    }
  
    this.loop.lastTime = time;
  
    game.drawAll();
  }
}


