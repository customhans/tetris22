class Piece {
    constructor(matrix) {
        this.pos = {
            x: 3,
            y: 1
        };
        this.matrix = matrix;
    }
}

const piece = new Piece(
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ]
)
