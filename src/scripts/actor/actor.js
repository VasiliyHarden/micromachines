const TO_RAD = Math.PI * 2 / 360;

function Actor(sprite, name) {
  this.sprite = sprite;
  this.name = name;
  this.speed = 0;
  this.maxSpeed = 12;
  this.acc = 8;
  this.dec = 3;
  this.turnSpeed = 3;

  this.left = false;
  this.right = false;
  this.up = false;
  this.down = false;

  this.subscribers = [];
}

Actor.prototype.clearDynamics = function() {
  this.speed = 0;
}

Actor.prototype.setPosition = function(pos) {
  this.sprite.setPosition(pos);
}

Actor.prototype.getPosition = function() {
  return this.sprite.getPosition();
}

Actor.prototype.restoreLastPos = function() {
  this.sprite.restoreLastPos();
}

Actor.prototype.goLeft = function() {
  this.left = true;
}

Actor.prototype.stopLeft = function() {
  this.left = false;
}

Actor.prototype.goRight = function() {
  this.right = true;
}

Actor.prototype.stopRight = function() {
  this.right = false;
}

Actor.prototype.goUp = function() {
  this.up = true;
}

Actor.prototype.stopUp = function() {
  this.up = false;
}

Actor.prototype.goDown = function() {
  this.down = true;
}

Actor.prototype.stopDown = function() {
  this.down = false;
}

Actor.prototype.resolveCollision = function() {
  this.collide = true;
}

Actor.prototype.getPoints = function() {
  return this.sprite.getPoints();
}

Actor.prototype.getName = function() {
  return this.name;
}

Actor.prototype.registerSubscriber = function(subscriber) {
  this.subscribers.push(subscriber);
}

Actor.prototype.notify = function() {
  this.subscribers.forEach((sub) => {
    sub.increaseScore();
  });
}

Actor.prototype.update = function(dt) {
  if (!dt) {
    return;
  }

  if (this.up) {
    this.speed = Math.min(this.maxSpeed, this.speed + this.acc * dt);
  }
  if (this.down) {
    this.speed = Math.max(-this.maxSpeed, this.speed - this.acc * dt);
  }
  if (!this.up && !this.down) {
    if (this.speed > 0) {
      this.speed = Math.max(0, this.speed - this.dec * dt);
    }
    if (this.speed < 0) {
      this.speed = Math.min(0, this.speed + this.dec * dt);
    }
  }

  let angleOffset = 0;
  if (this.left) {
    angleOffset -= this.turnSpeed * this.speed / this.maxSpeed;
  }
  if (this.right) {
    angleOffset += this.turnSpeed * this.speed / this.maxSpeed;
  }

  const currAngle = this.sprite.getPosition().angle + angleOffset;
  this.sprite.update({
    x: this.speed * Math.sin(currAngle * TO_RAD),
    y: -this.speed * Math.cos(currAngle * TO_RAD),
    angle: angleOffset
  });
}

Actor.prototype.getSize = function() {
  return this.sprite.getSize();
}

Actor.prototype.draw = function(ctx, dx, dy) {
  this.sprite.draw(ctx, dx, dy);
}

export default Actor;