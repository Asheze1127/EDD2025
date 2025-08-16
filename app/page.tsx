"use client";

import { useState, useEffect } from 'react';
import { MapView } from '@/components/MapView';
import { SearchFilter } from '@/components/SearchFilter';
import { RouteCard } from '@/components/RouteCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Thermometer, Clock, TrendingUp } from 'lucide-react';
import { Route, FilterOptions } from '@/types';
import { routes } from '@/data/routes';

export default function Home() {
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(routes);
  const [filters, setFilters] = useState<FilterOptions>({
    distance: 'all',
    season: 'all',
    temperature: 'all',
    duration: 'all',
    spots: 'all'
  });
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 22,
    season: '春',
    condition: '晴れ'
  });

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    filterRoutes(newFilters);
  };

  const filterRoutes = (filterOptions: FilterOptions) => {
    let filtered = routes;

    if (filterOptions.distance !== 'all') {
      const [min, max] = filterOptions.distance.split('-').map(Number);
      filtered = filtered.filter(route => {
        if (max) {
          return route.distance >= min && route.distance <= max;
        } else {
          return route.distance >= min;
        }
      });
    }

    if (filterOptions.season !== 'all') {
      filtered = filtered.filter(route => 
        route.seasonalSuitability.includes(filterOptions.season as any)
      );
    }

    if (filterOptions.temperature !== 'all') {
      filtered = filtered.filter(route => 
        route.temperatureSuitability.includes(filterOptions.temperature as any)
      );
    }

    if (filterOptions.duration !== 'all') {
      const [min, max] = filterOptions.duration.split('-').map(Number);
      filtered = filtered.filter(route => {
        if (max) {
          return route.duration >= min && route.duration <= max;
        } else {
          return route.duration >= min;
        }
      });
    }

    setFilteredRoutes(filtered);
  };

  const recommendedRoutes = routes
    .filter(route => route.temperatureSuitability.includes('mild'))
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 tracking-tight">
            Chill Walk
          </h1>
          <p className="text-xl md:text-2xl text-green-600 font-medium">
            季節に最適化された散歩ルート
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            天気や季節に合わせて、あなたにぴったりの散歩コースを提案。
            他のユーザーと素敵な散歩スポットを共有して、毎日の散歩をもっと楽しく。
          </p>
        </div>

        {/* Current Weather Info */}
        <Card className="inline-flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm border-green-200">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-600">現在の気温</span>
            <Badge variant="secondary">{currentWeather.temperature}°C</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">季節</span>
            <Badge variant="outline">{currentWeather.season}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">天気</span>
            <Badge className="bg-blue-100 text-blue-800">{currentWeather.condition}</Badge>
          </div>
        </Card>
      </section>

      {/* Today's Recommendations */}
      <section className="space-y-6 animate-slide-up">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800">今日のおすすめルート</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedRoutes.map((route) => (
            <RouteCard 
              key={route.id} 
              route={route} 
              onSelect={setSelectedRoute}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          ))}
        </div>
      </section>

      {/* Search and Filter */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-green-800">散歩ルートを探す</h2>
        </div>
        
        <SearchFilter 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </section>

      {/* Map and Routes */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden border-green-200">
            <MapView 
              routes={filteredRoutes}
              selectedRoute={selectedRoute}
              onRouteSelect={setSelectedRoute}
            />
          </Card>
        </div>

        {/* Route List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-800">
              散歩ルート一覧
            </h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {filteredRoutes.length}件
            </Badge>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredRoutes.map((route) => (
              <RouteCard 
                key={route.id} 
                route={route} 
                onSelect={setSelectedRoute}
                isSelected={selectedRoute?.id === route.id}
                compact
              />
            ))}
          </div>

          <div className="pt-4">
            <Button 
              variant="outline" 
              className="w-full border-green-200 text-green-700 hover:bg-green-50"
            >
              すべてのルートを見る
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 text-center bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
          <div className="text-2xl font-bold text-green-800">{routes.length}</div>
          <div className="text-sm text-green-600">散歩ルート</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
          <div className="text-2xl font-bold text-blue-800">
            {routes.reduce((sum, route) => sum + route.spots.length, 0)}
          </div>
          <div className="text-sm text-blue-600">おすすめスポット</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200">
          <div className="text-2xl font-bold text-amber-800">4</div>
          <div className="text-sm text-amber-600">季節対応</div>
        </Card>
        <Card className="p-6 text-center bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
          <div className="text-2xl font-bold text-purple-800">
            {Math.round(routes.reduce((sum, route) => sum + route.rating, 0) / routes.length * 10) / 10}
          </div>
          <div className="text-sm text-purple-600">平均評価</div>
        </Card>
      </section>
    </div>
  );
}