export interface Route {
  id: string;
  name: string;
  description: string;
  distance: number; // km
  duration: number; // minutes
  difficulty: 'easy' | 'moderate' | 'hard';
  rating: number; // 1-5
  likes: number;
  seasonalSuitability: ('spring' | 'summer' | 'autumn' | 'winter')[];
  temperatureSuitability: ('hot' | 'warm' | 'mild' | 'cool' | 'cold')[];
  startPoint: {
    lat: number;
    lng: number;
    name: string;
  };
  endPoint: {
    lat: number;
    lng: number;
    name: string;
  };
  waypoints: {
    lat: number;
    lng: number;
    name?: string;
  }[];
  spots: Spot[];
  tags: string[];
  createdAt: string;
  author: string;
  imageUrl: string;
}

export interface Spot {
  id: string;
  name: string;
  type: 'cafe' | 'park' | 'bench' | 'viewpoint' | 'restroom' | 'shop' | 'shrine' | 'other';
  description: string;
  lat: number;
  lng: number;
  rating?: number;
  imageUrl?: string;
  openHours?: string;
  tags: string[];
}

export interface FilterOptions {
  distance: string; // 'all' | '0-2' | '2-5' | '5-10' | '10+'
  season: string; // 'all' | 'spring' | 'summer' | 'autumn' | 'winter'
  temperature: string; // 'all' | 'hot' | 'warm' | 'mild' | 'cool' | 'cold'
  duration: string; // 'all' | '0-30' | '30-60' | '60-120' | '120+'
  spots: string; // 'all' | 'cafe' | 'park' | 'viewpoint' | etc.
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
}

export interface UserPreferences {
  preferredDistance: number;
  preferredDuration: number;
  favoriteSpotTypes: string[];
  temperaturePreference: string;
}