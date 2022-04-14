const player = {
  level: 5,
  time: 0,
  score: 0,
  lines: 0,

  updateLineCount(clearedRowsCount) {
    this.lines += clearedRowsCount;
    document.getElementById("lines").textContent = this.lines;
    this.updateScore(SCORE_MAP[clearedRowsCount]);
  },
  
  updateScore(addedPoints) {
    this.score += addedPoints; // * this.player.level
    document.getElementById("score").textContent = this.score;
  }
}