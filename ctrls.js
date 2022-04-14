addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "ArrowLeft":
    case "KeyA":
      game.piece.move(-1);
      break;

    case "ArrowRight":
    case "KeyD":
      game.piece.move(1);
      break;

    case "ArrowDown":
    case "KeyS":
      game.piece.drop();
      break;

    case "Space":
      game.piece.hardDrop();
      break;

    case "ArrowUp":
    case "KeyW":
      game.piece.rotate(1);
      break;

    case "ControlRight":
    case "KeyQ":
      game.piece.rotate(-1);
      break;

    default:
      break;
  }
})