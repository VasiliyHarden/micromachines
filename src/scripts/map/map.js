function Map(dims, sprites, backgroundImg, trackSections) {
  this.dims = dims;
  this.sprites = sprites;
  this.backgroundImg = backgroundImg;
  this.trackSections = trackSections;
  this.setSection(0);
}

Map.prototype.getDims = function() {
  return this.dims;
}

Map.prototype.setSection = function(section) {
  this.currSection = section;
  const p = this.trackSections[this.currSection];
  this.actorPos = {
    x: p.startX,
    y: p.startY,
    angle: p.startAngle,
    dx: p.dx,
    dy: p.dy
  };
}

Map.prototype.getActorPosition = function() {
  const pos = {
    x: this.actorPos.x,
    y: this.actorPos.y,
    angle: this.actorPos.angle
  };
  this.actorPos.x += this.actorPos.dx;
  this.actorPos.y += this.actorPos.dy;
  return pos;
}

Map.prototype.getPolygons = function() {
  return this.sprites;
}

Map.prototype.getSections = function() {
  return this.trackSections;
}

Map.prototype.draw = function(ctx, dx, dy) {
  ctx.drawImage(this.backgroundImg, -dx, -dy);
}

export default Map;