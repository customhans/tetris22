import game from "./game.js";

addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "ArrowLeft":
    case "KeyA":
      game.piece.current.move(-1);
      break;

    case "ArrowRight":
    case "KeyD":
      game.piece.current.move(1);
      break;

    case "ArrowDown":
    case "KeyS":
      game.piece.current.drop("byPlayer");
      break;

    case "Space":
      game.piece.current.hardDrop();
      break;

    case "ArrowUp":
    case "KeyW":
      game.piece.current.rotate(1);
      break;

    case "ControlRight":
    case "KeyQ":
      game.piece.current.rotate(-1);
      break;

    default:
      break;
  }
})
