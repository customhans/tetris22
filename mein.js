const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.scale(30, 30);

function drawCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//function 

function drawAll() {
    // console.log("drawing...")
    drawCanvas();
    piece.draw();
}

