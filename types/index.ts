
import { LatLngExpression } from 'leaflet';

export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type Climate = 'Hot Day' | 'Cold Day' | 'Comfortable';

export type SpotType = 'Cafe' | 'Park' | 'Bench' | 'Viewpoint' | 'Shop';

export interface Spot {
  id: string;
  name: string;
  type: SpotType;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  images: string[];
}

export interface Route {
  id: string;
  name: string;
  description: string;
  distance: number; // in kilometers
  duration: number; // in minutes
  path: LatLngExpression[];
  seasons: Season[];
  climates: Climate[];
  spots: Spot[];
  rating: number;
  likes: number;
  imageUrl: string;
}
