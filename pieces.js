class Piece {
  constructor({ type, matrix, color }) {
    this.type = type;
    this.pos = { x: 3, y: 0 };
    this.matrix = matrix;
    this.rows = this.cols = this.matrix.length;
    this.color = color;
  }

  static select() {
    const randNr = Math.floor(Math.random() * 7);
    return new Piece(pieces[randNr]);
  }

  static colors = ["cyan", "blue", "orange", "yellow", "green", "purple", "red"];

  draw() {
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          ctx.fillStyle = this.color;
          ctx.fillRect(x + this.pos.x, y + this.pos.y, 1, 1);
        }
      });
    });
  }

  drop() {
    this.pos.y++;
    dropCounter = 0;
    if (this.collision(playfield)) {
      this.lock();
    }
  }

  move(dir) {
    this.pos.x += dir;
    if (this.collision(playfield)) {
      this.pos.x -= dir;
    }
  }

  rotate(dir) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < y; x++) {
        [
          [this.matrix[y][x]],
          [this.matrix[x][y]],
        ] = [
            [this.matrix[x][y]],
            [this.matrix[y][x]],
          ];
      }
    }
    dir > 0 ? this.matrix.forEach(row => row.reverse()) : this.matrix.reverse();
  }

  collision(playfield) {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (
          this.matrix[y][x] &&
          (
            playfield.matrix[y + this.pos.y] &&
            playfield.matrix[y + this.pos.y][x + this.pos.x]
          ) !== 0
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
    piece = Piece.select();
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
    color: "cyan",
  },

{
  type: "jPiece",
  matrix: [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  color: "blue",
},
{
  type: "lPiece",
  matrix: [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  color: "orange",
},

  {
    type: "oPiece",
    matrix: [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "yellow",
  },

  {
    type: "sPiece",
    matrix: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    color: "green",
  },

  {
    type: "tPiece",
    matrix: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: "purple",
  },

  {
    type: "zPiece",
    matrix: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    color: "red",
  }
]