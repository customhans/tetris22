const game = {
  drawAll() {
    this.drawCanvas();
    playfield.draw();
    piece.draw();
  },

  drawCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
};
