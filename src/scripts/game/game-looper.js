

function GameLooper() {
  this.looping = false;
  this.lastTime = null;
  this.game = null;
  this.ctx = null;
  this._innerLoop = this._innerLoop.bind(this);
}

GameLooper.prototype._innerLoop = function(timestamp) {
  const dt = timestamp - this.lastTime;
  this.lastTime = timestamp;
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.game.update(dt / 1000);
  this.game.draw(this.ctx);
  if (this.looping) {
    requestAnimationFrame(this._innerLoop);  
  }
}

GameLooper.prototype.loop = function(canvas, game) {
  this.looping = true;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.game = game;
  this._innerLoop();
}

GameLooper.prototype.stop = function() {
  this.looping = false;
}

export default GameLooper;
