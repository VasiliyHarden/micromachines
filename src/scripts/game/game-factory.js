import Game from "./game";
import ActorFactory from "../actor/actor-factory";

const CONTROL_BUTTONS = [{
    up: 'w',
    down: 's',
    left: 'a',
    right: 'd'
  },{
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
}];

const MAX_PLAYERS = CONTROL_BUTTONS.length;

function GameFactory() {
  this.actorFactory = new ActorFactory();
}

GameFactory.prototype.create = function(playerPanels, map, canvasDims) {
  let actors = [];
  for (let i = 0; i < Math.min(playerPanels.length, MAX_PLAYERS); i++) {
    playerPanels[i].setProperties();
    actors.push(this.actorFactory.create(playerPanels[i].getSprite(), CONTROL_BUTTONS[i], playerPanels[i].getName()));
    actors[actors.length - 1].registerSubscriber(playerPanels[i]);
  }
  return new Game(map, actors, canvasDims);
}

export default GameFactory;