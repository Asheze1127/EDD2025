"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MapPin, 
  Clock, 
  Thermometer, 
  Leaf, 
  Coffee,
  Filter,
  X
} from 'lucide-react';
import { FilterOptions } from '@/types';

interface SearchFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function SearchFilter({ filters, onFilterChange }: SearchFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters: FilterOptions = {
      distance: 'all',
      season: 'all',
      temperature: 'all',
      duration: 'all',
      spots: 'all'
    };
    onFilterChange(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  const activeFilterCount = Object.values(filters).filter(value => value !== 'all').length;

  return (
    <Card className="p-4 bg-white/70 backdrop-blur-sm border-green-200">
      <div className="space-y-4">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-800">散歩ルートを絞り込む</h3>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {activeFilterCount}件のフィルター
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 mr-1" />
                クリア
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              {showAdvanced ? '簡易表示' : '詳細フィルター'}
            </Button>
          </div>
        </div>

        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Distance Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <MapPin className="h-4 w-4 text-green-600" />
              距離
            </label>
            <Select value={filters.distance} onValueChange={(value) => handleFilterChange('distance', value)}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="距離を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="0-2">2km以下</SelectItem>
                <SelectItem value="2-5">2-5km</SelectItem>
                <SelectItem value="5-10">5-10km</SelectItem>
                <SelectItem value="10">10km以上</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Clock className="h-4 w-4 text-green-600" />
              所要時間
            </label>
            <Select value={filters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="時間を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="0-30">30分以下</SelectItem>
                <SelectItem value="30-60">30分-1時間</SelectItem>
                <SelectItem value="60-120">1-2時間</SelectItem>
                <SelectItem value="120">2時間以上</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Season Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Leaf className="h-4 w-4 text-green-600" />
              季節
            </label>
            <Select value={filters.season} onValueChange={(value) => handleFilterChange('season', value)}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="季節を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="spring">春</SelectItem>
                <SelectItem value="summer">夏</SelectItem>
                <SelectItem value="autumn">秋</SelectItem>
                <SelectItem value="winter">冬</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Temperature Filter */}
          <div className="space-y-2">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <Thermometer className="h-4 w-4 text-green-600" />
              気温
            </label>
            <Select value={filters.temperature} onValueChange={(value) => handleFilterChange('temperature', value)}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="気温を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="hot">暑い日向け</SelectItem>
                <SelectItem value="warm">暖かい日向け</SelectItem>
                <SelectItem value="mild">快適な気温</SelectItem>
                <SelectItem value="cool">涼しい日向け</SelectItem>
                <SelectItem value="cold">寒い日向け</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="pt-4 border-t border-green-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Spots Filter */}
              <div className="space-y-2">
                <label className="flex items-center gap-1 text-sm font-medium text-gray-700">
                  <Coffee className="h-4 w-4 text-green-600" />
                  スポット種別
                </label>
                <Select value={filters.spots} onValueChange={(value) => handleFilterChange('spots', value)}>
                  <SelectTrigger className="border-green-200 focus:border-green-400">
                    <SelectValue placeholder="スポットを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="cafe">カフェ</SelectItem>
                    <SelectItem value="park">公園</SelectItem>
                    <SelectItem value="viewpoint">絶景スポット</SelectItem>
                    <SelectItem value="shrine">神社・仏閣</SelectItem>
                    <SelectItem value="shop">ショップ</SelectItem>
                    <SelectItem value="bench">休憩所</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Filter Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  クイックフィルター
                </label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onFilterChange({
                        distance: '0-2',
                        season: 'all',
                        temperature: 'mild',
                        duration: '0-30',
                        spots: 'cafe'
                      });
                    }}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    ☕ 近場でカフェ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onFilterChange({
                        distance: 'all',
                        season: 'spring',
                        temperature: 'mild',
                        duration: 'all',
                        spots: 'viewpoint'
                      });
                    }}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    🌸 春の絶景
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onFilterChange({
                        distance: '2-5',
                        season: 'all',
                        temperature: 'all',
                        duration: '30-60',
                        spots: 'park'
                      });
                    }}
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    🏞️ 程よい運動
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-4 border-t border-green-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700">適用中のフィルター:</span>
              {filters.distance !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  距離: {filters.distance}km
                </Badge>
              )}
              {filters.season !== 'all' && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  季節: {
                    filters.season === 'spring' ? '春' :
                    filters.season === 'summer' ? '夏' :
                    filters.season === 'autumn' ? '秋' :
                    filters.season === 'winter' ? '冬' : filters.season
                  }
                </Badge>
              )}
              {filters.temperature !== 'all' && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  気温: {
                    filters.temperature === 'hot' ? '暑い日向け' :
                    filters.temperature === 'warm' ? '暖かい日向け' :
                    filters.temperature === 'mild' ? '快適な気温' :
                    filters.temperature === 'cool' ? '涼しい日向け' :
                    filters.temperature === 'cold' ? '寒い日向け' : filters.temperature
                  }
                </Badge>
              )}
              {filters.duration !== 'all' && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  時間: {filters.duration}分
                </Badge>
              )}
              {filters.spots !== 'all' && (
                <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                  スポット: {
                    filters.spots === 'cafe' ? 'カフェ' :
                    filters.spots === 'park' ? '公園' :
                    filters.spots === 'viewpoint' ? '絶景スポット' :
                    filters.spots === 'shrine' ? '神社・仏閣' :
                    filters.spots === 'shop' ? 'ショップ' : filters.spots
                  }
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}