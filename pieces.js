class Piece {
  constructor({ matrix, color }) {
    this.pos = {
      x: 3,
      y: 0,
    };
    this.matrix = matrix;
    this.rows = this.cols = this.matrix.length;
    this.color = color;
  }

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
    this.pos.y = 0;
  }
}

const piece = new Piece({
  matrix: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  color: "tomato",
});

const zPiece = new Piece({
  matrix: [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  color: "lime",
});

const ipiece = new Piece({
  matrix: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  color: "cyan",
});
