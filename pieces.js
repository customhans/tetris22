class Piece {
  constructor({ matrix, color }) {
    this.pos = {
      x: 3,
      y: 1,
    };
    this.matrix = matrix;
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
    piece.pos.y++;
    dropCounter = 0;
  }

  move(dir) {
    this.pos.x += dir;
  }

  rotate(dir) {
    for (let y = 0; y < this.matrix.length; y++) {
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
}

const piece = new Piece({
  matrix: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  color: "tomato",
});
