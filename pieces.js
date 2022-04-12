class Piece {
    constructor({ matrix, color }) {
        this.pos = {
            x: 3,
            y: 1
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
            })
        })
      }

    move(dir) {
        this.pos.x += dir;
    }

    drop() {
        piece.pos.y++;
        dropCounter = 0;
    }
}

const piece = new Piece({
    matrix: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ],
    color: "tomato",
})
