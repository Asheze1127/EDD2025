"use client";

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapView } from '@/components/MapView';
import { 
  MapPin, 
  Clock, 
  Star, 
  Heart, 
  Share2,
  Navigation,
  ThermometerSun,
  Calendar,
  User,
  Camera,
  Coffee,
  TreePine,
  Eye,
  Building
} from 'lucide-react';
import { Route, Spot } from '@/types';
import { routes } from '@/data/routes';

export default function RouteDetailPage({ params }: { params: { id: string } }) {
  const route = routes.find(r => r.id === params.id);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(route?.likes || 0);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  if (!route) {
    notFound();
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getSpotIcon = (type: string) => {
    switch (type) {
      case 'cafe': return <Coffee className="h-4 w-4" />;
      case 'park': return <TreePine className="h-4 w-4" />;
      case 'viewpoint': return <Eye className="h-4 w-4" />;
      case 'shrine': return <Building className="h-4 w-4" />;
      case 'shop': return <Building className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getSpotTypeText = (type: string) => {
    switch (type) {
      case 'cafe': return 'カフェ';
      case 'park': return '公園';
      case 'viewpoint': return '絶景スポット';
      case 'shrine': return '神社・仏閣';
      case 'shop': return 'ショップ';
      case 'bench': return '休憩所';
      case 'restroom': return 'トイレ';
      default: return type;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header Image */}
      <div className="relative">
        <Image
          src={route.imageUrl}
          alt={route.name}
          width={1200}
          height={400}
          className="w-full h-64 md:h-96 object-cover rounded-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {route.seasonalSuitability.map((season) => (
                <Badge 
                  key={season} 
                  className="bg-white/90 backdrop-blur-sm text-green-800"
                >
                  {season === 'spring' && '🌸 春'}
                  {season === 'summer' && '☀️ 夏'}
                  {season === 'autumn' && '🍂 秋'}
                  {season === 'winter' && '❄️ 冬'}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {route.name}
            </h1>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{route.distance}km</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{route.duration}分</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{route.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-400" />
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">ルート概要</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{route.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold text-green-800">{route.distance}km</div>
                  <div className="text-sm text-green-600">距離</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold text-blue-800">{route.duration}分</div>
                  <div className="text-sm text-blue-600">所要時間</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                  <div className="text-lg font-bold text-yellow-800">{route.rating}</div>
                  <div className="text-sm text-yellow-600">評価</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <ThermometerSun className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <div className="text-sm font-bold text-orange-800">
                    {route.difficulty === 'easy' ? '初級' : 
                     route.difficulty === 'moderate' ? '中級' : '上級'}
                  </div>
                  <div className="text-xs text-orange-600">難易度</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Map */}
          <Card>
            <CardContent className="p-0">
              <div className="p-6 pb-0">
                <h2 className="text-xl font-semibold text-green-800 mb-4">ルートマップ</h2>
              </div>
              <MapView 
                routes={[route]}
                selectedRoute={route}
                onRouteSelect={() => {}}
              />
            </CardContent>
          </Card>

          {/* Spots Along Route */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-6">ルート上のスポット</h2>
              <div className="space-y-4">
                {route.spots.map((spot, index) => (
                  <div
                    key={spot.id}
                    className="flex items-start gap-4 p-4 border border-green-100 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedSpot(selectedSpot?.id === spot.id ? null : spot)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full flex-shrink-0">
                      {getSpotIcon(spot.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-green-800">{spot.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {getSpotTypeText(spot.type)}
                          </Badge>
                          {spot.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-sm">{spot.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
                      <div className="flex gap-1 flex-wrap">
                        {spot.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {selectedSpot?.id === spot.id && spot.openHours && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <strong>営業時間:</strong> {spot.openHours}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button 
                onClick={handleLike}
                className={`w-full ${isLiked ? 'bg-red-600 hover:bg-red-700' : ''}`}
                variant={isLiked ? 'default' : 'outline'}
              >
                <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-white' : ''}`} />
                {isLiked ? 'いいね済み' : 'いいね'} ({likeCount})
              </Button>
              
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                シェア
              </Button>
              
              <Button variant="outline" className="w-full">
                <Navigation className="h-4 w-4 mr-2" />
                ナビ開始
              </Button>
            </CardContent>
          </Card>

          {/* Route Details */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-green-800">ルート詳細</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">出発地</div>
                    <div className="text-sm text-gray-600">{route.startPoint.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-sm font-medium">到着地</div>
                    <div className="text-sm text-gray-600">{route.endPoint.name}</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium">適した季節</div>
                    <div className="flex gap-1 mt-1">
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
                </div>
                
                <div className="flex items-center gap-2">
                  <ThermometerSun className="h-4 w-4 text-orange-600" />
                  <div>
                    <div className="text-sm font-medium">適した気温</div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {route.temperatureSuitability.map((temp) => (
                        <Badge key={temp} variant="outline" className="text-xs">
                          {temp === 'hot' && '暑い日'}
                          {temp === 'warm' && '暖かい日'}
                          {temp === 'mild' && '快適'}
                          {temp === 'cool' && '涼しい日'}
                          {temp === 'cold' && '寒い日'}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="text-sm font-medium">投稿者</div>
                  <div className="text-sm text-gray-600">{route.author}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-gray-600" />
                <div>
                  <div className="text-sm font-medium">投稿日</div>
                  <div className="text-sm text-gray-600">{route.createdAt}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-green-800 mb-4">タグ</h3>
              <div className="flex gap-1 flex-wrap">
                {route.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}