let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;


/**
 * primary loop (mainLoop) draws
 * secondary loop (dropPiece) drops piece every [dropInterval ms]
 */
function mainLoop(time = 0) {
    const deltaTime = time - lastTime;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        //piece.drop();
    }

    lastTime = time;

    drawAll();
    requestAnimationFrame(mainLoop);
}
mainLoop();

