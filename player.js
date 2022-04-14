const player = {
  level: 5,
  time: 0,
  score: 0,
  lines: 0,

  updateAchievments(clearedRowsCount) {
    console.log("update --- " + clearedRowsCount)
    // update lines
    this.lines += clearedRowsCount;

    // update score
    this.score += SCORE_MAP[clearedRowsCount]; // * this.player.level

    document.getElementById("lines").textContent = this.lines;
    document.getElementById("score").textContent = this.score;
  },
}