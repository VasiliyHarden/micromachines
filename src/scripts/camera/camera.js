function Camera(strategy, canvasDims, mapDims) {
  this.dims = canvasDims;
  this.mapDims = mapDims;
  this.strategy = strategy;
  this.successfulUpdate = false;
  this.pos = undefined;
}

Camera.prototype._normalize = function(pos) {
  return {
    x: Math.round( Math.max( 0, Math.min(pos.x, this.mapDims.width - this.dims.width) ) ),
    y: Math.round( Math.max( 0, Math.min(pos.y, this.mapDims.height - this.dims.height) ) )
  };
}

Camera.prototype.update = function() {
  this.successfulUpdate = false;
  const p = this.strategy.calcPos(this.dims);
  if (p) {
    this.pos = this._normalize(p);
    this.successfulUpdate = true;
  }
}

Camera.prototype.isUpdated = function() {
  return this.successfulUpdate;
}

Camera.prototype.getPos = function() {
  // returns last successful calculation
  return this.pos;
}

Camera.prototype.getDims = function() {
  return this.dims;
}

Camera.prototype.getMapDims = function() {
  return this.mapDims;
}

export default Camera;