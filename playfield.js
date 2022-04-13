class Playfield {
  constructor() {
    this.rows = 20;
    this.cols = 10;
    this.matrix = this.create();
  }

  create() {
    return Array.from(Array(this.rows), () => new Array(this.cols).fill(0));
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
          ctx.drawImage(images[value - 1], x, y, 1, 1);
        }
      })
    })
  }
  
  scanForFullRows() {
    outer: for (let y = this.rows - 1; y > 0; y--) {
      for (let x = 0; x < this.cols; x++) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      this.rowClear(y);
      y++;
    }
  }

  rowClear(y) {
    this.matrix.splice(y, 1);
    this.matrix.unshift(Array(this.cols).fill(0));
  }
}

const playfield = new Playfield();