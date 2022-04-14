class Playfield {
  constructor() {
    this.rows = 20;
    this.cols = 10;
    this.matrix = this.create();
    this.rowClearDelay = 250;
    this.rowClearEffect = "opacity(25%)";
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
    let rowsToClear = [];

    outer: for (let y = this.rows - 1; y > 0; y--) {
      for (let x = 0; x < this.cols; x++) {

        /**
        * if at least one value is < 1,
        * the row can't be full -> continue in next row
        */
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      rowsToClear.push(y);
      ctx.filter = this.rowClearEffect;
    }
    setTimeout(() => {
      this.clearRows(rowsToClear);
      ctx.filter = 'none';
    }, this.rowClearDelay);
  }

  clearRows(rowsToClear) {
    rowsToClear.forEach(row => this.matrix.splice(row, 1));
    rowsToClear.forEach(_ => this.matrix.unshift(Array(this.cols).fill(0)));
  }
}