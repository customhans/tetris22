import game from "./game.js";
import { IMAGES } from "./pieceData.js";
import SCORE_MAP from "./scoring.js";

class Piece {
  constructor({ type, matrix }) {
    this.type = type;
    this.pos = { x: 3, y: 0 };
    this.matrix = matrix;
    this.rows = this.cols = this.matrix.length;
    this.ghost = null;
  }

   /**
    * This draw function is used both for drawing
    * the piece as well as the ghost (shadow), 
    * depending on the input parameter "part"
    * 
    * The default parameters refer to the piece
    */
  draw(
    part,
    matrix = this.matrix,
    posX = this.pos.x,
    posY = this.pos.y
    ) {
    
    /**
     * Losing condition: If piece is immediately blocked
     * at spawn location (pos.y === 0), the game is over
     */
    if (!this.pos.y && this.collision()) {
      game.stop();
    }
    
    if (part === "ghost") {
        matrix = this.ghost.matrix;
        posX = this.ghost.pos.x;
        posY = this.ghost.pos.y;
    }

    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.drawImage(IMAGES[value - 1][part], x + posX, y + posY, 1, 1);
        }
      })
    })
  }

  drop(type) {
    this.pos.y++;

    /**
     * Update score (+1 per drop), but 
     * only for player-initiated drops
     */
    if (type === "byPlayer") {
      player.updateScore(SCORE_MAP.softDrop);
    }

    game.loop.dropCounter = 0;
    if (this.collision()) {
      this.lock();
    }
  }

  getGhost() {
    this.ghost = structuredClone(this);
    while (!this.collision(this.ghost)) {
      this.ghost.pos.y++;
    }
    this.ghost.pos.y--;
    this.draw("ghost");
  }

  hardDrop() {
    let lineCounter = 0;
    while (!this.collision()) {
      this.pos.y++;
      lineCounter++;
    }
    this.pos.y--;
    player.updateScore(lineCounter * SCORE_MAP.hardDrop);
    game.loop.lastTime = 0;
  }

  move(dir) {
    this.pos.x += dir;
    if (this.collision()) {
      this.pos.x -= dir;
    }
  }

  rotate(dir) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < y; x++) {
        [
          [this.matrix[y][x]],
          [this.matrix[x][y]]
        ] = [
          [this.matrix[x][y]],
          [this.matrix[y][x]],
        ]
      }
    }
    dir > 0
      ? this.matrix.forEach((row) => row.reverse())
      : this.matrix.reverse();

    if (this.collision()) {
      this.wallKick();
    }
  }

  wallKick() {
    let offset = 1;
    while (this.collision()) {
      this.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
    }
  }

  collision(ghost = false) {
    const posX = ghost ? this.ghost.pos.x : this.pos.x;
    const posY = ghost ? this.ghost.pos.y : this.pos.y;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (
          // check if piece value is not 0
          this.matrix[y][x] &&

          // check if row exists
          (playfield.matrix[y + posY] &&

            // check if playfield value is also not 0
            playfield.matrix[y + posY][x + posX]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  lock() {
    this.pos.y--;
    playfield.merge(this);
    playfield.scanForFullRows();

    game.newPiece();
  }
}

export default Piece;