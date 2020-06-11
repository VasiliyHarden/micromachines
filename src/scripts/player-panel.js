import CONFIG from "./config";

const DEFAULT_NAME = "Anonym";

function PlayerPanel(domElements, spriteManager) {
  this.domElements = domElements;
  this.spriteManager = spriteManager;
  this.sprite = this.spriteManager.initSubscriber(this);
  this.domElements.spriteImg.src = this.sprite.filename;

  this.score = 0;
  this.trophies = [];
  this._initScorePanel();

  this.domElements.leftButton.addEventListener('click', (e) => {
    this.sprite = this.spriteManager.requestPrevious(this);
    this.domElements.spriteImg.src = this.sprite.filename;
  });
  this.domElements.rightButton.addEventListener('click', (e) => {
    this.sprite = this.spriteManager.requestNext(this);
    this.domElements.spriteImg.src = this.sprite.filename;
  });
}

PlayerPanel.prototype.setProperties = function() {
  const name = this.domElements.nameInput.value;
  if (name) {
    this.domElements.nameField.innerHTML = name;
  } else {
    this.domElements.nameField.innerHTML = DEFAULT_NAME;
  }
  this.domElements.icon.style.color = this.sprite.color;
  this.clearScore();
}

PlayerPanel.prototype.getSprite = function() {
  return this.sprite;
}

PlayerPanel.prototype.getName = function() {
  if (this.domElements.nameInput.value) {
    return this.domElements.nameInput.value;
  }
  return DEFAULT_NAME;
}

PlayerPanel.prototype.increaseScore = function() {
  this.trophies[this.score].style.color = this.sprite.color;
  this.score += 1;
}

PlayerPanel.prototype.clearScore = function() {
  this.score = 0;
  this.trophies.forEach((trophy) => {
    trophy.style.color = "";
  })
}

PlayerPanel.prototype._initScorePanel = function() {
  for (let i = 0; i < CONFIG.MAX_SCORE; i++) {
    let icon = document.createElement('i');
    icon.classList.add('fas');
    icon.classList.add('fa-trophy');
    this.domElements.scoreContainer.appendChild(icon);
    this.trophies.push(icon);
  }
}

export default PlayerPanel;