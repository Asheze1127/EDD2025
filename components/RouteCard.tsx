"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Clock, Star, ThermometerSun, Leaf, Snowflake, Sun } from 'lucide-react';
import { Route } from '@/types';
import { cn } from '@/lib/utils';

interface RouteCardProps {
  route: Route;
  onSelect: (route: Route) => void;
  isSelected?: boolean;
  compact?: boolean;
  className?: string;
}

export function RouteCard({ 
  route, 
  onSelect, 
  isSelected = false, 
  compact = false,
  className 
}: RouteCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(route.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'spring': return <Leaf className="h-3 w-3 text-green-500" />;
      case 'summer': return <Sun className="h-3 w-3 text-yellow-500" />;
      case 'autumn': return <Leaf className="h-3 w-3 text-orange-500" />;
      case 'winter': return <Snowflake className="h-3 w-3 text-blue-500" />;
      default: return null;
    }
  };

  const getSeasonText = (season: string) => {
    switch (season) {
      case 'spring': return '春';
      case 'summer': return '夏';
      case 'autumn': return '秋';
      case 'winter': return '冬';
      default: return season;
    }
  };

  const getTemperatureColor = (temp: string) => {
    switch (temp) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'mild': return 'bg-green-100 text-green-800';
      case 'cool': return 'bg-blue-100 text-blue-800';
      case 'cold': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '初級';
      case 'moderate': return '中級';
      case 'hard': return '上級';
      default: return difficulty;
    }
  };

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-md group",
        isSelected && "ring-2 ring-green-500 shadow-lg",
        className
      )}
      onClick={() => onSelect(route)}
    >
      <CardContent className={cn("p-0", compact && "p-3")}>
        {!compact && (
          <div className="relative">
            <Image
              src={route.imageUrl}
              alt={route.name}
              width={400}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2 flex gap-1">
              {route.seasonalSuitability.map((season) => (
                <Badge 
                  key={season} 
                  variant="secondary" 
                  className="bg-white/90 backdrop-blur-sm text-xs flex items-center gap-1"
                >
                  {getSeasonIcon(season)}
                  {getSeasonText(season)}
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm hover:bg-white p-2 h-auto"
              onClick={handleLike}
            >
              <Heart 
                className={cn(
                  "h-4 w-4", 
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                )} 
              />
              <span className="ml-1 text-sm">{likeCount}</span>
            </Button>
          </div>
        )}
        
        <div className={cn("p-4 space-y-3", compact && "p-0 space-y-2")}>
          <div className="space-y-1">
            <h3 className={cn(
              "font-semibold text-green-800 line-clamp-1",
              compact ? "text-sm" : "text-lg"
            )}>
              {route.name}
            </h3>
            <p className={cn(
              "text-gray-600 line-clamp-2",
              compact ? "text-xs" : "text-sm"
            )}>
              {route.description}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{route.distance}km</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{route.duration}分</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{route.rating}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              <Badge className={getDifficultyColor(route.difficulty)}>
                {getDifficultyText(route.difficulty)}
              </Badge>
              {route.temperatureSuitability.slice(0, 2).map((temp) => (
                <Badge key={temp} className={getTemperatureColor(temp)}>
                  <ThermometerSun className="h-3 w-3 mr-1" />
                  {temp === 'hot' && '暑い日'}
                  {temp === 'warm' && '暖かい日'}
                  {temp === 'mild' && '快適'}
                  {temp === 'cool' && '涼しい日'}
                  {temp === 'cold' && '寒い日'}
                </Badge>
              ))}
            </div>
            
            {compact && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="p-1 h-auto"
              >
                <Heart 
                  className={cn(
                    "h-4 w-4", 
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                  )} 
                />
                <span className="ml-1 text-xs">{likeCount}</span>
              </Button>
            )}
          </div>

          {!compact && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{route.author}</span>
                  <span>•</span>
                  <span>{route.createdAt}</span>
                </div>
                <div className="flex gap-1">
                  {route.spots.slice(0, 3).map((spot) => (
                    <Badge key={spot.id} variant="outline" className="text-xs">
                      {spot.type === 'cafe' && '☕'}
                      {spot.type === 'park' && '🏞️'}
                      {spot.type === 'viewpoint' && '🌅'}
                      {spot.type === 'shrine' && '⛩️'}
                      {spot.type === 'shop' && '🛍️'}
                      {spot.name.length > 8 ? spot.name.slice(0, 8) + '...' : spot.name}
                    </Badge>
                  ))}
                  {route.spots.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{route.spots.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}