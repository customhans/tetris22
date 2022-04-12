const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.scale(30, 30);

function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPiece(matrix, pos) {
  matrix.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value) {
              ctx.fillStyle = "lime";
              ctx.fillRect(x + pos.x, y + pos.y, 1, 1);
          }
      })
  })
}

function draw() {
    // console.log("drawing...")
    drawCanvas();
    drawPiece(piece.matrix, piece.pos);
}

function dropPiece() {
    //piece.pos.y++;
    dropCounter = 0;
}