
function Polygon(points) {
  this.points = points;
}

Polygon.prototype.getSize = function() {
  return this.points.length;
}

Polygon.prototype.getPoints = function() {
  return this.points;
}

Polygon.prototype.getMidPoint = function() {
  let mid = {x: 0, y: 0};
  this.points.forEach((p) => {
    mid.x += p.x,
    mid.y += p.y
  });
  return mid;
}

export default Polygon;