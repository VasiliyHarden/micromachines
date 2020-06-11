import Camera from "../camera/camera";
import ActionCameraStrategy from "../camera/action-camera-strategy";
import CountdownGameState from "./countdown-game-state";
import EndGameState from './end-game-state';
import ProgressTracker from "../progress-tracker";

function Game(map, actors, canvasDims) {
  this.map = map;
  this.actors = actors;
  this.canvasDims = canvasDims;
  this.progressTracker = new ProgressTracker(this.actors, this.map.getSections(), this);

  this.state = new CountdownGameState(
    this.map,
    this.actors,
    new Camera(
      new ActionCameraStrategy(this.actors),
      this.canvasDims, 
      this.map.getDims()
    ),
    this
  );
  this.gameEnded = false;
}

Game.prototype.changeState = function(state) {
  if (this.gameEnded) {
    this.state = new EndGameState(this.map,
      this.actors,
      new Camera(
        new ActionCameraStrategy(this.actors),
        this.canvasDims, 
        this.map.getDims()
      ),
      this);
  } else {
    this.state = state;
    this.state.update();
  }

}

Game.prototype.finishRound = function() {
  this.progressTracker.finishRound();
}

Game.prototype.getRoundWinner = function() {
  return this.progressTracker.getRoundWinner();
}

Game.prototype.setTrackSection = function() {
  this.map.setSection(this.progressTracker.getSection());
}

Game.prototype.endGame = function() {
  this.gameEnded = true;
}

Game.prototype.update = function(dt) {
  if (!this.gameEnded) {
    this.state.update(dt);
    this.progressTracker.update();
  }
}

Game.prototype.draw = function(ctx) {
  this.state.draw(ctx);
}

export default Game;