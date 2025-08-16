
'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Star, Leaf, Cloud } from 'lucide-react';
import { LatLngExpression } from 'leaflet';
import { Route } from '@/types';

const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
});

interface RouteDetailClientPageProps {
  route: Route;
}

export default function RouteDetailClientPage({ route }: RouteDetailClientPageProps) {
  const { name, description, distance, duration, rating, seasons, climates, spots, imageUrl, path } = route;

  const center: LatLngExpression = path.length > 0 ? path[0] : [0, 0];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Route Header */}
      <header className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover z-0"
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x400?text=Chill+Walk'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white shadow-lg">{name}</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description Card */}
          <Card>
            <CardHeader>
              <CardTitle>ルート概要</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </CardContent>
          </Card>

          {/* Spots Card */}
          <Card>
            <CardHeader>
              <CardTitle>ルート上のスポット</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {spots.map((spot) => (
                <div key={spot.id} className="flex items-start gap-4">
                  <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={spot.images[0] || 'https://via.placeholder.com/150'}
                      alt={spot.name}
                      fill
                      className="object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Spot'; }}
                    />
                  </div>
                  <div>
                    <Badge variant="secondary" className="mb-1">{spot.type}</Badge>
                    <h3 className="font-semibold text-lg">{spot.name}</h3>
                    <p className="text-sm text-muted-foreground">{spot.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-8 lg:sticky top-20 h-fit">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>詳細情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><MapPin size={16} /> 距離</span>
                <span className="font-semibold">{distance} km</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Clock size={16} /> 所要時間</span>
                <span className="font-semibold">{duration} 分</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Star size={16} /> 評価</span>
                <span className="font-semibold">{rating} / 5.0</span>
              </div>
              <Separator />
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground flex items-center gap-2 pt-1"><Leaf size={16} /> 季節</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {seasons.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                </div>
              </div>
              <Separator />
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground flex items-center gap-2 pt-1"><Cloud size={16} /> 気候</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {climates.map(c => <Badge key={c} variant="outline">{c}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Card */}
          <Card>
            <CardHeader>
              <CardTitle>ルートマップ</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] p-0 rounded-b-lg overflow-hidden">
              <MapView center={center} path={path} spots={spots} zoom={14} />
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
