import CONFIG from "../config";
import ActionGameState from "./action-game-state";

function CountdownGameState(map, actors, camera, game) {
  this.map = map;
  this.actors = actors;
  this.camera = camera;
  this.game = game;
  this.timeLeft = CONFIG.COUNTDOWN;
  this.initActorsPosition();
  this.camera.update();
}

CountdownGameState.prototype.initActorsPosition = function() {
  this.game.setTrackSection();
  this.actors.forEach((actor) => {
    actor.setPosition(this.map.getActorPosition());
  });
}

CountdownGameState.prototype.update = function(dt) {
  if (!dt) {
    return;
  }
  this.timeLeft -= dt;
  if (this.timeLeft < 0) {
    this.game.changeState(new ActionGameState(
      this.map,
      this.actors,
      this.camera,
      this.game
    ));
  }
}

CountdownGameState.prototype.draw = function(ctx) {
  const camPos = this.camera.getPos();
  this.map.draw(ctx, camPos.x, camPos.y);
  this.actors.forEach((actor) => {
    actor.draw(ctx, camPos.x, camPos.y);
  });

  ctx.font = "120px Arial";
  ctx.fillStyle = 'red';
  ctx.fillText(this.timeLeft.toFixed(2), 50, 200);
}

export default CountdownGameState;