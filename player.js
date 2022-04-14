const player = {
  level: 1,
  time: 0,
  score: 0,
  lines: 0,

  updateLineCount(clearedRowsCount) {
    this.lines += clearedRowsCount;
    document.getElementById("lines").textContent = this.lines;
    this.updateScore(SCORE_MAP[clearedRowsCount]);

    this.checkIfLevelUp(clearedRowsCount);
  },
  
  updateScore(addedPoints) {
    this.score += addedPoints * this.level;
    document.getElementById("score").textContent = this.score;
  },

  checkIfLevelUp(clearedRowsCount) {
    const newLineCountTens = Math.floor(this.lines / 10);
    const oldLineCountTens = Math.floor((this.lines - clearedRowsCount) / 10);
    if (newLineCountTens > oldLineCountTens) {
      this.levelUp();
    }
  },

  levelUp() {
    this.level++;
    document.getElementById("level").textContent = this.level;
  }
}