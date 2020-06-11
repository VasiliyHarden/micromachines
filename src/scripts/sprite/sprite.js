const TO_RAD = Math.PI * 2 / 360;

function Sprite(filename, width, height) {
  this.pos = {
    x: 0,
    y: 0,
    angle: 0
  };
  this.lastPos = Object.assign({}, this.pos);
  this.dims = {
    w: width,
    h: height
  };
  this.img = new Image();
  this.img.src = filename;
}

Sprite.prototype.setPosition = function(pos) {
  this.pos = pos;
}

Sprite.prototype.getPosition = function(pos) {
  return this.pos;
}

Sprite.prototype.getMidPoint = function() {
  return {
    x: this.pos.x,
    y: this.pos.y
  };
}

Sprite.prototype.restoreLastPos = function() {
  this.pos = Object.assign({}, this.lastPos);
}

Sprite.prototype.update = function(offset) {
  this.lastPos = Object.assign({}, this.pos);
  this.pos.x += offset.x;
  this.pos.y += offset.y;
  this.pos.angle += offset.angle;
}

Sprite.prototype.getPoints = function() {
  const p1 = {
    x: this.pos.x + this.dims.h * Math.sin(this.pos.angle * TO_RAD) / 2,
    y: this.pos.y - this.dims.h * Math.cos(this.pos.angle * TO_RAD) / 2,
  };
  const p2 = {
    x: this.pos.x - this.dims.h * Math.sin(this.pos.angle * TO_RAD) / 2,
    y: this.pos.y + this.dims.h * Math.cos(this.pos.angle * TO_RAD) / 2,
  };

  let points = [];
  points.push({
    x: p1.x - this.dims.w * Math.cos(this.pos.angle * TO_RAD) / 2,
    y: p1.y - this.dims.w * Math.sin(this.pos.angle * TO_RAD) / 2,
  });
  points.push({
    x: p1.x + this.dims.w * Math.cos(this.pos.angle * TO_RAD) / 2,
    y: p1.y + this.dims.w * Math.sin(this.pos.angle * TO_RAD) / 2,
  });
  points.push({
    x: p2.x + this.dims.w * Math.cos(this.pos.angle * TO_RAD) / 2,
    y: p2.y + this.dims.w * Math.sin(this.pos.angle * TO_RAD) / 2,
  });
  points.push({
    x: p2.x - this.dims.w * Math.cos(this.pos.angle * TO_RAD) / 2,
    y: p2.y - this.dims.w * Math.sin(this.pos.angle * TO_RAD) / 2,
  });
  return points;
}

Sprite.prototype.getSize = function() {
  // number of points in polygon
  return 4;
}

Sprite.prototype.draw = function(ctx, dx, dy) {
  
  const p = this.getPoints();
  ctx.beginPath();
  ctx.moveTo(p[0].x - dx, p[0].y - dy);
  ctx.lineTo(p[1].x - dx, p[1].y - dy);
  ctx.lineTo(p[2].x - dx, p[2].y - dy);
  ctx.lineTo(p[3].x - dx, p[3].y - dy);
  ctx.closePath();
  ctx.stroke();

  ctx.save();
  ctx.translate(this.pos.x - dx, this.pos.y - dy);

  ctx.rotate(this.pos.angle * TO_RAD);
  ctx.drawImage(this.img, -(this.dims.w / 2), -(this.dims.h / 2), this.dims.w, this.dims.h);
  ctx.restore();
}


export default Sprite;