
'use client';

import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { Spot } from '@/types';
import L from 'leaflet';

// Leafletのデフォルトアイコンが正しく表示されない問題を修正
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapViewProps {
  center: LatLngExpression;
  zoom?: number;
  path?: LatLngExpression[];
  spots?: Spot[];
}

const MapView: React.FC<MapViewProps> = ({ center, zoom = 15, path, spots }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {path && <Polyline positions={path} color="blue" />}
      {spots &&
        spots.map((spot) => (
          <Marker key={spot.id} position={[spot.location.lat, spot.location.lng]}>
            <Popup>
              <b>{spot.name}</b>
              <p>{spot.description}</p>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
};

export default MapView;
