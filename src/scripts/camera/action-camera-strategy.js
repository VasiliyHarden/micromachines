function ActionCameraStrategy(goals) {
  this.goals = goals;
}

ActionCameraStrategy.prototype.calcPos = function(dims) {
  let max = {
    x: -Infinity,
    y: -Infinity
  };
  let min = {
    x: Infinity,
    y: Infinity
  };
  let pos = {
    x: 0,
    y: 0
  };
  for (let i = 0; i < this.goals.length; i++) {
    const p = this.goals[i].getPosition();
    max = {
      x: Math.max(max.x, p.x),
      y: Math.max(max.y, p.y)
    };
    min = {
      x: Math.min(min.x, p.x),
      y: Math.min(min.y, p.y)
    };
    pos = {
      x: pos.x + p.x,
      y: pos.y + p.y
    };
  }

  if ((max.x - min.x > dims.width) || (max.y - min.y > dims.height)) {
    return undefined;
  }

  return {
    x: pos.x / this.goals.length - dims.width / 2,
    y: pos.y / this.goals.length - dims.height / 2
  };
}

export default ActionCameraStrategy;