function EndRoundCameraStrategy(goal, currentPos, dims, time = 2000) {
  const goalPosition = goal.getPosition();
  this.target = {
    x: goalPosition.x - dims.width / 2,
    y: goalPosition.y - dims.height / 2
  };
  this.current = currentPos;
  this.time = time;
  this.targetTime = Date.now() + this.time;
}

EndRoundCameraStrategy.prototype.calcPos = function() {
  if (Date.now() < this.targetTime) {
    const delta = (this.targetTime - Date.now()) / this.time;
    return {
      x: this.current.x + (1 - delta) * (this.target.x - this.current.x),
      y: this.current.y + (1 - delta) * (this.target.y - this.current.y)
    }
  }
  return undefined;
}

export default EndRoundCameraStrategy;