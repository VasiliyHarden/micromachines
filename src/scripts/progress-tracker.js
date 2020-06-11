import CollisionDetector from "./collision-detection";
import CONFIG from "./config";

const LOOK_AHEAD = 7;
const LOOK_BEHIND = 3;

function ProgressTracker(actors, sections, game) {
  this.actors = actors.map((actor) => {
    return {
      actor: actor,
      score: 0,
      section: 0,
      progress: 0
    }
  });
  this.game = game;
  this.sections = sections;
  this.sLen = this.sections.length;
  this.cd = new CollisionDetector();
  this.roundWinner = undefined;
  this.currSection = 0;
}

ProgressTracker.prototype.finishRound = function() {
  this.roundWinner = undefined;

  this.actors.forEach((a) => {
    if (!this.roundWinner || a.progress > this.roundWinner.progress) {
      this.roundWinner = a;
    }
  });
  this.roundWinner.score += 1;
  this.roundWinner.actor.notify();

  if (this.roundWinner.score === CONFIG.MAX_SCORE) {
    this.game.endGame();
    return;
  }
  this._updateSection();
  this._clearProgress();
}

ProgressTracker.prototype.getRoundWinner = function() {
  return this.roundWinner.actor;
}

ProgressTracker.prototype.getScore = function() {
  let score = [];
  this.actors.forEach((a) => {
    score.push(a.score);
  })
  return score;
}

ProgressTracker.prototype.getSection = function() {
  return this.currSection;
}

ProgressTracker.prototype.update = function() {
  this.actors.forEach((a) => {
    for (let i = LOOK_AHEAD; i > -LOOK_BEHIND; i--) {
      if (this.cd.isOverlap(a.actor, this.sections[(a.section + i + this.sLen) % this.sLen].polygon)) {
        a.progress += i;
        a.section = (a.section + i + this.sLen) % this.sLen;
        return;
      }
    }
  })
}

ProgressTracker.prototype._updateSection = function() {
  let loser = undefined;
  this.actors.forEach((a) => {
    if (!loser || a.progress < loser.progress) {
      loser = a;
    }
  });
  this.currSection = loser.section;
}

ProgressTracker.prototype._clearProgress = function() {
  this.actors.forEach((a) => {
    a.progress = 0;
    a.section = this.currSection;
  });
}

export default ProgressTracker;