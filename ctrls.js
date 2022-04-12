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
    
        case "ArrowBottom":
        case "KeyS":
            piece.drop();
            break;
    
        case "ArrowUp":
        case "KeyW":
            // rotate right
            break;
    
        case "ControlRight":
        case "Q":
            // rotate left
            break;
    
        default:
            break;
    }
})