"use client";

import { useState } from 'react';
import { RouteCard } from '@/components/RouteCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, Calendar, Heart, Star, Medal, Crown } from 'lucide-react';
import { Route } from '@/types';
import { routes } from '@/data/routes';

export default function RankingPage() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  // Generate rankings
  const popularRoutes = [...routes].sort((a, b) => b.likes - a.likes);
  const ratedRoutes = [...routes].sort((a, b) => b.rating - a.rating);
  const newestRoutes = [...routes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const seasonalRoutes = {
    spring: routes.filter(r => r.seasonalSuitability.includes('spring')),
    summer: routes.filter(r => r.seasonalSuitability.includes('summer')),
    autumn: routes.filter(r => r.seasonalSuitability.includes('autumn')),
    winter: routes.filter(r => r.seasonalSuitability.includes('winter'))
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-500">{rank}</span>;
    }
  };

  const RankingList = ({ routes: rankingRoutes, type }: { routes: Route[], type: 'likes' | 'rating' | 'new' }) => (
    <div className="space-y-4">
      {rankingRoutes.slice(0, 10).map((route, index) => (
        <Card 
          key={route.id}
          className="cursor-pointer hover:shadow-md transition-shadow duration-300 border-green-100"
          onClick={() => setSelectedRoute(route)}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-full">
                {getRankIcon(index + 1)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-green-800 line-clamp-1">{route.name}</h3>
                  <div className="flex items-center gap-2">
                    {type === 'likes' && (
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-semibold text-red-600">{route.likes}</span>
                      </div>
                    )}
                    {type === 'rating' && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold text-yellow-600">{route.rating}</span>
                      </div>
                    )}
                    {type === 'new' && (
                      <Badge className="bg-blue-100 text-blue-800">NEW</Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-1">{route.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{route.distance}km</span>
                  <span>{route.duration}分</span>
                  <span>{route.author}</span>
                  <span>{route.createdAt}</span>
                </div>
                
                <div className="flex gap-1">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-green-800">
            散歩ルートランキング
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          人気の散歩コースや評価の高いルート、季節のおすすめコースをチェックして、
          次の散歩の参考にしてください。
        </p>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-200">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <div className="text-2xl font-bold text-yellow-800">
              {popularRoutes[0]?.likes || 0}
            </div>
            <div className="text-sm text-yellow-600">最高いいね数</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-green-200">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-800">
              {Math.max(...routes.map(r => r.rating))}
            </div>
            <div className="text-sm text-green-600">最高評価</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-800">
              {routes.length}
            </div>
            <div className="text-sm text-blue-600">総ルート数</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-800">4</div>
            <div className="text-sm text-purple-600">季節対応</div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking Tabs */}
      <Tabs defaultValue="popular" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-green-50 border-green-200">
          <TabsTrigger 
            value="popular" 
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Heart className="h-4 w-4 mr-2" />
            人気ランキング
          </TabsTrigger>
          <TabsTrigger 
            value="rating"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Star className="h-4 w-4 mr-2" />
            評価ランキング
          </TabsTrigger>
          <TabsTrigger 
            value="new"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            新着ルート
          </TabsTrigger>
          <TabsTrigger 
            value="seasonal"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            <Calendar className="h-4 w-4 mr-2" />
            季節別
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                人気ランキング
                <Badge variant="secondary">いいね数順</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RankingList routes={popularRoutes} type="likes" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rating" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                評価ランキング
                <Badge variant="secondary">評価順</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RankingList routes={ratedRoutes} type="rating" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                新着ルート
                <Badge variant="secondary">投稿日順</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RankingList routes={newestRoutes} type="new" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spring */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌸 春のおすすめ
                  <Badge variant="secondary">{seasonalRoutes.spring.length}件</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonalRoutes.spring.slice(0, 3).map((route) => (
                  <RouteCard 
                    key={route.id}
                    route={route}
                    onSelect={setSelectedRoute}
                    compact
                  />
                ))}
                <Button variant="outline" className="w-full border-green-200 text-green-700">
                  春のルートをもっと見る
                </Button>
              </CardContent>
            </Card>

            {/* Summer */}
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ☀️ 夏のおすすめ
                  <Badge variant="secondary">{seasonalRoutes.summer.length}件</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonalRoutes.summer.slice(0, 3).map((route) => (
                  <RouteCard 
                    key={route.id}
                    route={route}
                    onSelect={setSelectedRoute}
                    compact
                  />
                ))}
                <Button variant="outline" className="w-full border-yellow-200 text-yellow-700">
                  夏のルートをもっと見る
                </Button>
              </CardContent>
            </Card>

            {/* Autumn */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🍂 秋のおすすめ
                  <Badge variant="secondary">{seasonalRoutes.autumn.length}件</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonalRoutes.autumn.slice(0, 3).map((route) => (
                  <RouteCard 
                    key={route.id}
                    route={route}
                    onSelect={setSelectedRoute}
                    compact
                  />
                ))}
                <Button variant="outline" className="w-full border-orange-200 text-orange-700">
                  秋のルートをもっと見る
                </Button>
              </CardContent>
            </Card>

            {/* Winter */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ❄️ 冬のおすすめ
                  <Badge variant="secondary">{seasonalRoutes.winter.length}件</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {seasonalRoutes.winter.slice(0, 3).map((route) => (
                  <RouteCard 
                    key={route.id}
                    route={route}
                    onSelect={setSelectedRoute}
                    compact
                  />
                ))}
                <Button variant="outline" className="w-full border-blue-200 text-blue-700">
                  冬のルートをもっと見る
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}