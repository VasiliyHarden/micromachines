import Sprite from "../sprite/sprite"
import ActorAdjuster from "./actor-adjuster";
import Actor from "./actor";


function ActorFactory() {
  this.actorAdjuster = new ActorAdjuster();
}

ActorFactory.prototype.create = function(spriteInfo, controlButtons, name) {
  let sprite = new Sprite(spriteInfo.filename, spriteInfo.width, spriteInfo.height);
  let actor = new Actor(sprite, name);
  this.actorAdjuster.adjust(actor, controlButtons);
  return actor;
}

export default ActorFactory;