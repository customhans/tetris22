class Playfield {
  constructor() {
    this.rows = 20;
    this.cols = 10;
    this.matrix = this.create();
  }

  create() {
    const m = [];
    while (this.rows--) {
      m.push(Array(this.cols).fill(0));
    }
    return m;
  }

  merge(piece) {
    piece.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          this.matrix[y + piece.pos.y][x + piece.pos.x] = value;
        }
      })
    })
  }

  draw() {
    this.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          
          ctx.fillStyle = Piece.colors[value - 1];
          ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  
}

const playfield = new Playfield();