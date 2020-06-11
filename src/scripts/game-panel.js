

function GamePanel(domElements, mapManager, app) {
  this.domElements = domElements;
  this.mapManager = mapManager;
  this.domElements.mapIcon.src = this.mapManager.getCurrIcon();
  this.app = app;

  this.domElements.leftButton.addEventListener('click', (e) => {
    this.domElements.mapIcon.src = this.mapManager.getPreviousIcon();
  });
  this.domElements.rightButton.addEventListener('click', (e) => {
    this.domElements.mapIcon.src = this.mapManager.getNextIcon();
  });

  this.domElements.newGameButton.addEventListener('click', (e) => {
    this.app.startGame();
  });
}

export default GamePanel;