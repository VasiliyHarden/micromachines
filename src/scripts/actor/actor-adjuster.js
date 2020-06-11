function ActorAdjuster() {
  this.adjust = (actor, controlButtons) => {
    document.addEventListener('keydown', (e) => {
      if (e.key === controlButtons.up) {
        actor.goUp();
      }
      if (e.key === controlButtons.down) {
        actor.goDown();
      }
      if (e.key === controlButtons.left) {
        actor.goLeft();
      }
      if (e.key === controlButtons.right) {
        actor.goRight();
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === controlButtons.up) {
        actor.stopUp();
      }
      if (e.key === controlButtons.down) {
        actor.stopDown();
      }
      if (e.key === controlButtons.left) {
        actor.stopLeft();
      }
      if (e.key === controlButtons.right) {
        actor.stopRight();
      }
    });
  }
}

export default ActorAdjuster;