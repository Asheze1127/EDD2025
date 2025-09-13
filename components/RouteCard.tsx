
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RouteWithProfile } from '@/types'; // We'll need to define this type
import { MapPin, Clock, Star, Heart } from 'lucide-react';

interface RouteCardProps {
  route: RouteWithProfile;
}

export function RouteCard({ route }: RouteCardProps) {
  const { name, distance, duration, rating, likes, image_url, description, profiles } = route;

  return (
    <Card className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={image_url || 'https://via.placeholder.com/400x200?text=Chill+Walk'}
            alt={name}
            fill
            className="object-cover rounded-t-lg"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Chill+Walk'; }}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg truncate" title={name}>{name}</h3>
          <p className="text-sm text-muted-foreground">by {profiles?.username || '匿名ユーザー'}</p>
        </div>
        <p className="text-sm text-muted-foreground h-10 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" title="距離">
              <MapPin className="h-4 w-4" />
              <span>{distance || 0}km</span>
            </div>
            <div className="flex items-center gap-1" title="所要時間">
              <Clock className="h-4 w-4" />
              <span>{duration || 0}分</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1" title="評価">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span>{rating || 0}</span>
            </div>
            <div className="flex items-center gap-1" title="いいね">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>{likes || 0}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
