function EndGameState(map, actors, camera, game) {
  this.map = map;
  this.actors = actors;
  this.camera = camera;
  this.game = game;

  this.winner = this.game.getRoundWinner();
}

EndGameState.prototype.update = function(dt) {

}

EndGameState.prototype.draw = function(ctx) {
  ctx.font = "90px Arial";
  ctx.fillStyle = 'red';
  ctx.fillText(`${this.winner.getName()} wins!`, 50, 200);
}

export default EndGameState;