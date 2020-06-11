import Polygon from "../polygon/polygon";
import Map from "./map";


function MapLoader() {

}

MapLoader.prototype.load = function(json) {
  console.log(json);
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

export default MapLoader;