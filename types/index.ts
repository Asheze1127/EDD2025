
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
  image_url: string;
}

export type Profile = {
  id: string;
  username: string;
  avatar_url: string;
  updated_at: string;
};

// `routes`テーブルと`profiles`テーブルを結合したときの型
export type RouteWithProfile = Route & { 
  profiles: Pick<Profile, 'username'> | null;
};
