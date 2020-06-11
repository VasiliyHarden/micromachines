const cars = require('../../assets/cars.json');

function SpriteManager() {
  this.sprites = [];
  cars.cars.forEach((c) => {
    this.sprites.push({
      car: c,
      available: true
    });
  });
  this.subscribers = [];
}

SpriteManager.prototype.initSubscriber = function(sub) {
  if (this.subscribers.length === this.sprites.length) {
    throw new Error('Not enough sprites for players');
  }
  const indx = this._findFirstAvailableSprite();
  this.subscribers.push({
    sub: sub,
    spriteIndx: indx
  });
  this.sprites[indx].available = false;
  return this.sprites[indx].car;
}

SpriteManager.prototype.requestPrevious = function(sub) {
  const subIndx = this._findSubscriber(sub);
  const currSprite = this.subscribers[subIndx].spriteIndx;
  this.sprites[currSprite].available = true;
  for (let i = currSprite - 1; i > currSprite - this.sprites.length - 1; i--) {
    const nextIndx = (i + this.sprites.length) % this.sprites.length;
    if (this.sprites[nextIndx].available) {
      this.sprites[nextIndx].available = false;
      this.subscribers[subIndx].spriteIndx = nextIndx;
      return this.sprites[nextIndx].car;
    }
  }
}

SpriteManager.prototype.requestNext = function(sub) {
  const subIndx = this._findSubscriber(sub);
  const currSprite = this.subscribers[subIndx].spriteIndx;
  this.sprites[currSprite].available = true;
  for (let i = currSprite + 1; i < currSprite + this.sprites.length + 1; i++) {
    const nextIndx = i % this.sprites.length;
    if (this.sprites[nextIndx].available) {
      this.sprites[nextIndx].available = false;
      this.subscribers[subIndx].spriteIndx = nextIndx;
      return this.sprites[nextIndx].car;
    }
  }
}

SpriteManager.prototype._findFirstAvailableSprite = function() {
  for (let i = 0; i < this.sprites.length; i++) {
    if (this.sprites[i].available) {
      return i;
    }
  }
}

SpriteManager.prototype._findSubscriber = function(sub) {
  for (let i = 0; i < this.subscribers.length; i++) {
    if (this.subscribers[i].sub === sub) {
      return i;
    }
  }
  throw new Error('Subscriber not founded');
}

export default SpriteManager;