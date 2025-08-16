
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { dummyRoutes } from '@/data/routes';
import { Route } from '@/types';
import { RouteCard } from '@/components/RouteCard';
import { SearchFilter } from '@/components/SearchFilter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LatLngExpression } from 'leaflet';

// Dynamically import MapView to prevent SSR issues
const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse"></div>
});

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(dummyRoutes[0]);

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
  };

  const center: LatLngExpression = useMemo(() => {
    if (selectedRoute) {
      return selectedRoute.path[0];
    }
    return [35.681236, 139.767125]; // Default to Tokyo Station
  }, [selectedRoute]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]"> {/* Adjust height based on header height */}
      {/* Left Panel: Filters and Route List */}
      <aside className="w-full lg:w-1/3 xl:w-1/4 p-4 overflow-y-auto bg-white shadow-lg">
        <div className="space-y-6">
          <SearchFilter />
          
          <Card>
            <CardHeader>
              <CardTitle>おすすめルート</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dummyRoutes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  isSelected={selectedRoute?.id === route.id}
                  onSelectRoute={handleSelectRoute}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* Right Panel: Map View */}
      <main className="flex-1 h-full w-full">
        <MapView 
          center={center} 
          path={selectedRoute?.path}
          spots={selectedRoute?.spots}
          zoom={14}
        />
      </main>
    </div>
  );
}
