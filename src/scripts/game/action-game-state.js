import CollisionDetector from "../collision-detection";
import EndRoundGameState from "./end-round-game-state";
import EndRoundCameraStrategy from "../camera/end-round-camera-strategy";
import Camera from "../camera/camera";

function ActionGameState(map, actors, camera, game) {
  this.collisionDetector = new CollisionDetector();
  this.map = map;
  this.actors = actors;
  this.camera = camera;
  this.game = game;
  this.initActorsPosition();
}

ActionGameState.prototype.initActorsPosition = function() {
  this.game.setTrackSection();
  this.actors.forEach((actor) => {
    actor.setPosition(this.map.getActorPosition());
  });
}

ActionGameState.prototype.update = function(dt) {
  this.collisionDetector.resolveCollisions(this.actors, this.map.getPolygons());

  this.actors.forEach((actor) => {
    actor.update(dt);
  });

  this.camera.update();
  if (!this.camera.isUpdated()) {
    this.game.finishRound();
    this.game.changeState(new EndRoundGameState(
      this.map,
      this.actors,
      new Camera(
        new EndRoundCameraStrategy(
          this.game.getRoundWinner(),
          this.camera.getPos(),
          this.camera.getDims()
        ),
        this.camera.getDims(),
        this.camera.getMapDims()
      ),
      this.game
    ));
  }
}

ActionGameState.prototype.draw = function(ctx) {
  const camPos = this.camera.getPos();
  this.map.draw(ctx, camPos.x, camPos.y);
  this.actors.forEach((actor) => {
    actor.draw(ctx, camPos.x, camPos.y);
  });
}

export default ActionGameState;