
'use client';

import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { LocateFixed, Loader2 } from 'lucide-react';

import { Spot } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Leafletのデフォルトアイコンが正しく表示されない問題を修正
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const currentLocationIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDZkZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjYiIGZpbGw9IiMwMDZkZmYiLz48L3N2Zz4=',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

interface MapViewProps {
  center: LatLngExpression;
  zoom?: number;
  route?: LatLngExpression[];
  spots?: Spot[];
  currentPosition?: LatLngExpression | null; // 記録中の追跡用マーカー
}

function UpdateView({ center, zoom }: { center: LatLngExpression; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom || map.getZoom());
  }, [center, zoom, map]);
  return null;
}

function RecenterControl() {
  const map = useMap();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const tempMarkerRef = useRef<L.Marker | null>(null);

  const handleRecenter = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      toast({ title: 'GPSがサポートされていません', variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos: LatLngExpression = [latitude, longitude];
        map.flyTo(newPos, 15);

        // 以前の一時マーカーがあれば削除
        if (tempMarkerRef.current) {
          tempMarkerRef.current.remove();
        }
        // 新しい一時マーカーを追加
        tempMarkerRef.current = L.marker(newPos, { icon: currentLocationIcon }).addTo(map);
        
        setIsLoading(false);
      },
      (error) => {
        toast({ title: '現在地を取得できません', description: 'GPSの利用が許可されているか確認してください。', variant: 'destructive' });
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <Button variant="outline" size="icon" onClick={handleRecenter} disabled={isLoading} className="bg-white hover:bg-gray-100">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}

const MapView: React.FC<MapViewProps> = ({ center, zoom = 15, route, spots, currentPosition }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {route && <Polyline positions={route} color="blue" />}
      {spots &&
        spots.map((spot) => (
          <Marker key={spot.id} position={[spot.latitude, spot.longitude]} icon={customIcon}>
            <Popup>
              <b>{spot.name}</b>
              <p>{spot.description}</p>
            </Popup>
          </Marker>
        ))}
      {/* recordページなどで渡される、追跡用の永続的なマーカー */}
      {currentPosition && (
        <Marker position={currentPosition} icon={currentLocationIcon} />
      )}
      <UpdateView center={center} zoom={zoom} />
      <RecenterControl />
    </MapContainer>
  );
};

export default MapView;
