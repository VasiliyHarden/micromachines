import ActionGameState from "./action-game-state";
import Camera from "../camera/camera";
import ActionCameraStrategy from "../camera/action-camera-strategy";
import CountdownGameState from "./countdown-game-state";

function EndRoundGameState(map, actors, camera, game) {
  this.map = map;
  this.actors = actors;
  this.camera = camera;
  this.game = game;

  this.actors.forEach((actor) => {
    actor.clearDynamics();
  });
}

EndRoundGameState.prototype.update = function(dt) {
  this.camera.update();
  if (!this.camera.isUpdated()) {
    this.game.changeState(new CountdownGameState(
      this.map,
      this.actors,
      new Camera(
        new ActionCameraStrategy(
          this.actors
        ),
        this.camera.getDims(),
        this.camera.getMapDims()
      ),
      this.game
    ));
  }
}

EndRoundGameState.prototype.draw = function(ctx) {
  const camPos = this.camera.getPos();
  this.map.draw(ctx, camPos.x, camPos.y);
  this.actors.forEach((actor) => {
    actor.draw(ctx, camPos.x, camPos.y);
  });  
}

export default EndRoundGameState;