
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Route } from '@/types';
import { cn } from '@/lib/utils';
import { MapPin, Clock, Star, Sun, Cloud, Snowflake } from 'lucide-react';

interface RouteCardProps {
  route: Route;
  isSelected: boolean;
  onSelectRoute: (route: Route) => void;
}

export function RouteCard({ route, isSelected, onSelectRoute }: RouteCardProps) {
  const { name, distance, duration, rating, seasons, climates, imageUrl, description } = route;

  const renderClimateIcons = () => {
    return climates.map((climate) => {
      if (climate === 'Hot Day') return <Sun key={climate} className="h-4 w-4 text-red-500" />;
      if (climate === 'Cold Day') return <Snowflake key={climate} className="h-4 w-4 text-blue-500" />;
      return <Cloud key={climate} className="h-4 w-4 text-green-500" />;
    });
  };

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md',
        isSelected ? 'border-primary ring-2 ring-primary' : 'border-transparent'
      )}
      onClick={() => onSelectRoute(route)}
    >
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image
            src={imageUrl} // Assuming dummy data has valid image paths like /images/route1.jpg
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
            // Add a placeholder if images are not available
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Chill+Walk'; }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-lg truncate">{name}</h3>
        <p className="text-sm text-muted-foreground h-10 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{distance}km</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}分</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {renderClimateIcons()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
