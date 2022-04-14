const player = {
  stats: {
    level: 0,
    time: 0,
    score: 0,
    lines: 0,
  },

  updateLineCount(clearedRowsCount) {
    this.stats.lines += clearedRowsCount;
    this.updateStats();
    this.updateScore(SCORE_MAP[clearedRowsCount]);
    
    this.checkIfLevelUp(clearedRowsCount);
  },
  
  updateScore(addedPoints) {
    this.stats.score += addedPoints * this.stats.level;
    this.updateStats();
  },
  
  checkIfLevelUp(clearedRowsCount) {
    const newLineCountTens = Math.floor(this.stats.lines / 10);
    const oldLineCountTens = Math.floor((this.stats.lines - clearedRowsCount) / 10);
    if (newLineCountTens > oldLineCountTens) {
      this.levelUp();
    }
  },
  
  levelUp() {
    this.stats.level++;
    this.updateStats();
    console.log("level up")
    if (game.loop.dropInterval >= 100) {
      game.loop.dropInterval -= 50;
      //console.log("new drop interval: " + game.loop.dropInterval)
    }
  },
  
  clearStats() {
    Object.keys(this.stats).forEach((i) => this.stats[i] = 0);
    this.stats.level = 1;
    this.updateStats();
  },

  updateStats() {
    document.getElementById("lines").textContent = this.stats.lines;
    document.getElementById("score").textContent = this.stats.score;
    document.getElementById("level").textContent = this.stats.level;
  }
}