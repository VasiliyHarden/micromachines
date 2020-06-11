const defaultJSON = require('../../assets/maps/default/default.json');
const playgroundtJSON = require('../../assets/maps/playground/playground.json');
import Polygon from '../polygon';
import Map from './map';

function MapManager() {
  this.maps = [defaultJSON, playgroundtJSON];
  if (this.maps.length == 0) {
    throw new Error('No maps founded');
  }
  this.curr = 0;
}

MapManager.prototype.getCurrIcon = function() {
  return this.maps[this.curr].icon;
}

MapManager.prototype.getPreviousIcon = function() {
  this.curr = (this.curr - 1 + this.maps.length) % this.maps.length;
  return this.maps[this.curr].icon;
}

MapManager.prototype.getNextIcon = function() {
  this.curr = (this.curr + 1) % this.maps.length;
  return this.maps[this.curr].icon;  
}

MapManager.prototype.load = function() {
  const json = this.maps[this.curr];
  const mapImg = new Image();
  mapImg.src = json.mapSource;

  const polygons = [];
  for (let i = 0; i < json.polygons.length; i++) {
    polygons.push(new Polygon(json.polygons[i]));
  }

  for (let i = 0; i < json.trackSections.length; i++) {
    json.trackSections[i].polygon = new Polygon(json.trackSections[i].polygon);
  }

  return new Map(json.dims, polygons, mapImg, json.trackSections);
}

export default MapManager;