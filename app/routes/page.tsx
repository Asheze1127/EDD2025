"use client";

import { useState } from 'react';
import { RouteCard } from '@/components/RouteCard';
import { SearchFilter } from '@/components/SearchFilter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, SortAsc, Grid, List } from 'lucide-react';
import { Route, FilterOptions } from '@/types';
import { routes } from '@/data/routes';

export default function RoutesPage() {
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>(routes);
  const [filters, setFilters] = useState<FilterOptions>({
    distance: 'all',
    season: 'all',
    temperature: 'all',
    duration: 'all',
    spots: 'all'
  });
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'likes' | 'distance' | 'duration' | 'created'>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

    if (filterOptions.spots !== 'all') {
      filtered = filtered.filter(route => 
        route.spots.some(spot => spot.type === filterOptions.spots)
      );
    }

    // Apply sorting
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'likes':
          return b.likes - a.likes;
        case 'distance':
          return a.distance - b.distance;
        case 'duration':
          return a.duration - b.duration;
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    setFilteredRoutes(filtered);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort as any);
    filterRoutes(filters);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800">
          散歩ルート一覧
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          あなたにぴったりの散歩コースを見つけてください。季節や気温、距離など様々な条件で絞り込むことができます。
        </p>
      </section>

      {/* Search and Filter */}
      <SearchFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Results Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-green-600" />
            <span className="text-lg font-semibold text-green-800">検索結果</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {filteredRoutes.length}件
            </Badge>
          </div>
          {filteredRoutes.length > 0 && (
            <span className="text-sm text-gray-500">
              全{routes.length}件中
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <SortAsc className="h-4 w-4 text-gray-600" />
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[140px] border-green-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">評価順</SelectItem>
                <SelectItem value="likes">人気順</SelectItem>
                <SelectItem value="distance">距離順</SelectItem>
                <SelectItem value="duration">時間順</SelectItem>
                <SelectItem value="created">新着順</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-green-200 rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Routes Grid/List */}
      {filteredRoutes.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
        }>
          {filteredRoutes.map((route) => (
            <RouteCard 
              key={route.id} 
              route={route} 
              onSelect={setSelectedRoute}
              isSelected={selectedRoute?.id === route.id}
              compact={viewMode === 'list'}
              className="animate-fade-in"
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-white/70 backdrop-blur-sm border-green-200">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-green-800">
                条件に一致するルートが見つかりません
              </h3>
              <p className="text-gray-600">
                フィルター条件を変更して再度検索してみてください。
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => handleFilterChange({
                distance: 'all',
                season: 'all', 
                temperature: 'all',
                duration: 'all',
                spots: 'all'
              })}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              フィルターをクリア
            </Button>
          </div>
        </Card>
      )}

      {/* Load More Button */}
      {filteredRoutes.length > 0 && filteredRoutes.length < routes.length && (
        <div className="text-center pt-8">
          <Button 
            variant="outline" 
            size="lg"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            さらに表示
          </Button>
        </div>
      )}
    </div>
  );
}