import SpriteManager from "./sprite/sprite-manager";
import MapManager from "./map/map-manager";
import GamePanel from "./game-panel";
import GameFactory from "./game/game-factory";
import GameLooper from "./game/game-looper";
import PlayerPanel from "./player-panel";
import CONFIG from "./config";


function App() {
  this.spriteManager = new SpriteManager();
  this.mapManager = new MapManager();
  this.canvas = document.getElementById('canvas');
  this.gameLooper = new GameLooper();
  this.gameFactory = new GameFactory();
  this.game = null;

  this.gamePanel = new GamePanel({
    newGameButton: document.getElementById('new-game-button'),
    mapIcon: document.getElementById('map-icon'),
    leftButton: document.getElementById('map-picker-left-button'),
    rightButton: document.getElementById('map-picker-right-button')
  }, this.mapManager, this);

  this.playerPanels = [new PlayerPanel({
    nameField: document.getElementById('first-player-name-field'),
    icon: document.getElementById('first-player-icon'),
    scoreContainer: document.getElementById('first-player-score'),
    nameInput: document.getElementById('first-player-name-input'),
    spriteImg: document.getElementById('first-player-sprite-img'),
    leftButton: document.getElementById('first-player-left-button'),
    rightButton: document.getElementById('first-player-right-button'),
  }, this.spriteManager), 
  new PlayerPanel({
    nameField: document.getElementById('second-player-name-field'),
    icon: document.getElementById('second-player-icon'),
    scoreContainer: document.getElementById('second-player-score'),
    nameInput: document.getElementById('second-player-name-input'),
    spriteImg: document.getElementById('second-player-sprite-img'),
    leftButton: document.getElementById('second-player-left-button'),
    rightButton: document.getElementById('second-player-right-button'),
  }, this.spriteManager)];
}

App.prototype.startGame = function() {
  this.game = this.gameFactory.create(
    this.playerPanels, 
    this.mapManager.load(),
    {
      width: CONFIG.CANVAS_WIDTH,
      height: CONFIG.CANVAS_HEIGHT
    }
  );
  this.gameLooper.loop(this.canvas, this.game);
}

export default App;