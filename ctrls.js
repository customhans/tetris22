addEventListener("keydown", ({ code }) => {
  switch (code) {
    case "ArrowLeft":
    case "KeyA":
      piece.move(-1);
      break;

    case "ArrowRight":
    case "KeyD":
      piece.move(1);
      break;

    case "ArrowDown":
    case "KeyS":
      piece.drop();
      break;

    case "ArrowUp":
    case "KeyW":
      piece.rotate(1);
      break;

    case "ControlRight":
    case "KeyQ":
      piece.rotate(-1);
      break;

    default:
      break;
  }
})