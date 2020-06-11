function dot(p1, p2) {
  return p1.x * p2.x + p1.y * p2.y;
}

function normalize(v) {
  return {
    x: v.x / Math.sqrt(dot(v, v)),
    y: v.y / Math.sqrt(dot(v, v))
  };
}

function CollisionDetector() {

}

CollisionDetector.prototype.resolveCollisions = function(actors, polygons) {
  this._resolveCollisionsOnActors(actors);
  for (let i = 0; i < actors.length; i++) {
    this._resolveCollisionsActorPolygons(actors[i], polygons);
  }

  
}

CollisionDetector.prototype._resolveCollisionsActorPolygons = function(actor, polygons) {
  for (let i = 0; i < polygons.length; i++) {
    if (this.isOverlap(actor, polygons[i])) {
      actor.restoreLastPos();
      actor.clearDynamics();
    }
  }  
}

CollisionDetector.prototype._resolveCollisionsOnActors = function(actors) {
  for (let i = 0; i < actors.length; i++) {
    for (let j = i + 1; j < actors.length; j++) {
      this._resolveCollisionsActorActor(actors[i], actors[j]);
    }
  }
}

CollisionDetector.prototype._resolveCollisionsActorActor = function(a1, a2) {
  while (this.isOverlap(a1, a2)) {
    let p1 = a1.getPosition();
    let p2 = a2.getPosition();
    let d = {
      x: p2.x - p1.x,
      y: p2.y - p1.y
    };
    p1.x -= 0.1 * d.x;
    p1.y -= 0.1 * d.y;
    p2.x += 0.1 * d.x;
    p2.y += 0.1 * d.y;
    // a1.setPosition(p1);
    // a2.setPosition(p2);
  }
}

CollisionDetector.prototype.isOverlap = function(p1, p2) {
  return this._overlapHelper(p1, p2) && this._overlapHelper(p2, p1);
}

CollisionDetector.prototype._overlapHelper = function(p1, p2) {
  for (let i = 0; i < p1.getSize(); i++) {
    const a = p1.getPoints()[i];
    const b = p1.getPoints()[ (i + 1) % p1.getSize() ];
    const axisProj = {
      x: a.y - b.y,
      y: b.x - a.x
    };

    let min_p1 = Infinity;
    let max_p1 = -Infinity;
    for (let j = 0; j < p1.getSize(); j++) {
      const dotProduct = dot(axisProj, p1.getPoints()[j]);
      max_p1 = Math.max(max_p1, dotProduct);
      min_p1 = Math.min(min_p1, dotProduct);
    }

    let min_p2 = Infinity;
    let max_p2 = -Infinity;
    for (let j = 0; j < p2.getSize(); j++) {
      const dotProduct = dot(axisProj, p2.getPoints()[j]);
      max_p2 = Math.max(max_p2, dotProduct);
      min_p2 = Math.min(min_p2, dotProduct);
    }

    if (!(max_p2 >= min_p1 && max_p1 >= min_p2)) {
      return false;
    }
  }
  return true;
}

export default CollisionDetector;