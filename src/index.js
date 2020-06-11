import PlayerPanel from './scripts/player-panel';
import SpriteManager from './scripts/sprite/sprite-manager';
import GameLooper from './scripts/game/game-looper';
import GameFactory from './scripts/game/game-factory';
import MapManager from './scripts/map/map-manager';


import './styles/index.scss';
import App from './scripts/app';

let app = new App();


// let spriteManager = new SpriteManager();

// const firstPlayerDomElems = {
//   nameField: document.getElementById('first-player-name-field'),
//   icon: document.getElementById('first-player-icon'),
//   scoreContainer: document.getElementById('first-player-score'),
//   nameInput: document.getElementById('first-player-name-input'),
//   spriteImg: document.getElementById('first-player-sprite-img'),
//   leftButton: document.getElementById('first-player-left-button'),
//   rightButton: document.getElementById('first-player-right-button'),
// }
// let firstPlayerPanel = new PlayerPanel(firstPlayerDomElems, spriteManager);

// const secondPlayerDomElems = {
//   nameField: document.getElementById('second-player-name-field'),
//   icon: document.getElementById('second-player-icon'),
//   scoreContainer: document.getElementById('second-player-score'),
//   nameInput: document.getElementById('second-player-name-input'),
//   spriteImg: document.getElementById('second-player-sprite-img'),
//   leftButton: document.getElementById('second-player-left-button'),
//   rightButton: document.getElementById('second-player-right-button'),
// }
// let secondPlayerPanel = new PlayerPanel(secondPlayerDomElems, spriteManager);

// console.log('working');

// var canvas = document.getElementById('canvas');
// const canvasDims = {
//   width: canvas.width,
//   height: canvas.height
// };

// // MAP
// const mapManager = new MapManager();
// let map = mapManager.load(data);

// // GAME
// let gameLooper = new GameLooper();
// let gameFactory = new GameFactory();

// document.getElementById('new-game-button').addEventListener('click', (e) => {
//   let g = gameFactory.create([firstPlayerPanel, secondPlayerPanel], map, canvasDims);
//   gameLooper.loop(canvas, g);
// });