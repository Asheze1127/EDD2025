"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Zap, Eye } from 'lucide-react';
import { Route } from '@/types';

interface MapViewProps {
  routes: Route[];
  selectedRoute: Route | null;
  onRouteSelect: (route: Route | null) => void;
}

export function MapView({ routes, selectedRoute, onRouteSelect }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'street'>('street');

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Fallback to Tokyo Station
          setUserLocation({
            lat: 35.6812,
            lng: 139.7671
          });
        }
      );
    }
  }, []);

  const handleRouteClick = (route: Route) => {
    onRouteSelect(selectedRoute?.id === route.id ? null : route);
  };

  const getRouteColor = (route: Route) => {
    if (route.temperatureSuitability.includes('hot')) return 'bg-red-500';
    if (route.temperatureSuitability.includes('cold')) return 'bg-blue-500';
    if (route.temperatureSuitability.includes('mild')) return 'bg-green-500';
    return 'bg-purple-500';
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-green-100 via-blue-50 to-green-200 rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant={mapView === 'street' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMapView('street')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <MapPin className="h-4 w-4 mr-1" />
          街路
        </Button>
        <Button
          variant={mapView === 'satellite' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setMapView('satellite')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Eye className="h-4 w-4 mr-1" />
          航空写真
        </Button>
      </div>

      {/* Mock Map Content */}
      <div className="w-full h-full relative overflow-hidden">
        {/* Background pattern to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300" />
            ))}
          </div>
        </div>

        {/* User Location */}
        {userLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-xs text-blue-600 font-medium mt-1 text-center">現在地</div>
          </div>
        )}

        {/* Route Markers */}
        {routes.map((route, index) => {
          const x = 15 + (index * 120) % 400;
          const y = 80 + (index * 60) % 300;
          const isSelected = selectedRoute?.id === route.id;

          return (
            <div
              key={route.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-10'
              }`}
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => handleRouteClick(route)}
            >
              {/* Route Marker */}
              <div className={`w-6 h-6 ${getRouteColor(route)} rounded-full border-2 border-white shadow-lg flex items-center justify-center`}>
                <MapPin className="h-3 w-3 text-white" />
              </div>
              
              {/* Route Info Card */}
              {isSelected && (
                <Card className="absolute top-8 left-1/2 transform -translate-x-1/2 w-64 p-3 shadow-lg border-green-200 animate-slide-up">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-green-800 line-clamp-1">{route.name}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{route.description}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {route.distance}km
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {route.duration}分
                      </Badge>
                      <Badge className="text-xs bg-amber-100 text-amber-800">
                        ★{route.rating}
                      </Badge>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {route.seasonalSuitability.map((season) => (
                        <Badge key={season} variant="outline" className="text-xs">
                          {season === 'spring' && '春'}
                          {season === 'summer' && '夏'}
                          {season === 'autumn' && '秋'}
                          {season === 'winter' && '冬'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Route Path Simulation */}
              {isSelected && (
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{width: '500px', height: '400px'}}>
                  <path
                    d={`M ${x} ${y} Q ${x + 50} ${y - 30} ${x + 100} ${y + 20} T ${x + 180} ${y - 10}`}
                    stroke={route.temperatureSuitability.includes('hot') ? '#ef4444' : 
                           route.temperatureSuitability.includes('cold') ? '#3b82f6' : '#10b981'}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
              )}
            </div>
          );
        })}

        {/* Map Legend */}
        <Card className="absolute bottom-4 left-4 p-3 bg-white/90 backdrop-blur-sm">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-800">凡例</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">快適な気温</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600">暑い日向け</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">寒い日向け</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-xs text-gray-600">現在地</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Distance Scale */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
          <div className="flex items-center gap-2">
            <div className="w-12 h-0.5 bg-gray-600"></div>
            <span className="text-xs text-gray-600">1km</span>
          </div>
        </div>
      </div>

      {/* Selected Route Info */}
      {selectedRoute && (
        <Card className="absolute top-4 left-4 p-4 bg-white/95 backdrop-blur-sm border-green-200 max-w-xs">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-green-800">{selectedRoute.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRouteSelect(null)}
                className="text-gray-400 hover:text-gray-600 p-1 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">{selectedRoute.description}</p>
            <div className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">
                {selectedRoute.startPoint.name} → {selectedRoute.endPoint.name}
              </span>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800">
                {selectedRoute.distance}km
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {selectedRoute.duration}分
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}