class Piece {
  constructor({ type, matrix }) {
    this.type = type;
    this.pos = { x: 3, y: 0 };
    this.matrix = matrix;
    this.rows = this.cols = this.matrix.length;
    this.ghost = null;
  }

  draw(part, matrix, posX, posY) {
    /**
     * Losing condition: If piece is immediately blocked
     * at spawn location (pos.y === 0), the game is over
     */
    if (!this.pos.y && this.collision()) {
      game.stop();
    }

    /**
     * This draw function is used both for drawing
     * the piece as well as the ghost (shadow), 
     * depending on the input parameter "part"
     */
    switch (part) {
      case "original":
        matrix = this.matrix;
        posX = this.pos.x;
        posY = this.pos.y;
        break;
      case "ghost":
        matrix = this.ghost.matrix;
        posX = this.ghost.pos.x;
        posY = this.ghost.pos.y;
        break;
    }

    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.drawImage(images[value - 1][part], x + posX, y + posY, 1, 1);
        }
      })
    })
  }

  drop() {
    this.pos.y++;
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
    while (!this.collision()) {
      this.pos.y++;
    }
    this.pos.y--;
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
        [[this.matrix[y][x]], [this.matrix[x][y]]] = [
          [this.matrix[x][y]],
          [this.matrix[y][x]],
        ];
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
    //this.pos.y = 0;
  }
}

const pieces = [
  {
    type: "iPiece",
    matrix: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    type: "jPiece",
    matrix: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
  },
  {
    type: "lPiece",
    matrix: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
  },
  {
    type: "oPiece",
    matrix: [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    type: "sPiece",
    matrix: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
  },
  {
    type: "tPiece",
    matrix: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
  },
  {
    type: "zPiece",
    matrix: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
  },
];

function createImageArray() {
  const imgs = [];
  const path = "./img/";
  const ext = ".png";

  pieces.forEach((piece) => {
    const original = new Image();
    const ghost = new Image();
    original.src = path + piece.type + ext;
    ghost.src = path + piece.type + "_ghost" + ext;

    imgs.push({
      original: original,
      ghost: ghost,
    });
  });
  return imgs;
}

const images = createImageArray();
