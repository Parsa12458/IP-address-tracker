import { map, markerLayer } from './renderMap.mjs';

export default function (lat, lng) {
  map.setView([lat, lng], 14);

  markerLayer.clearLayers();
  L.marker([lat, lng]).addTo(markerLayer);
}
