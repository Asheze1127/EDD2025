'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Heart, MapPin, Clock } from 'lucide-react';
import { Route } from '@/types';

export default function RankingPage() {
  const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);

  useEffect(() => {
    // In a real app, you would fetch and sort data from an API here.
    // e.g., fetch('/api/routes?sortBy=likes').then(res => res.json()).then(setPopularRoutes);
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-yellow-400 text-yellow-900 hover:bg-yellow-400';
    if (rank === 2) return 'bg-gray-300 text-gray-800 hover:bg-gray-300';
    if (rank === 3) return 'bg-amber-500 text-amber-900 hover:bg-amber-500';
    return 'bg-primary/10 text-primary hover:bg-primary/10';
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <header className="text-center space-y-2">
        <Trophy className="h-12 w-12 mx-auto text-yellow-400" />
        <h1 className="text-4xl font-bold text-primary">人気ルートランキング</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          みんなに「いいね！」されている人気の散歩コースをチェックしよう。
        </p>
      </header>

      {/* Ranking List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {popularRoutes.length > 0 ? (
          popularRoutes.map((route, index) => (
            <Link href={`/routes/${route.id}`} key={route.id}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 font-bold text-lg">
                    <Badge className={`text-lg w-10 h-10 flex items-center justify-center rounded-full ${getRankBadge(index + 1)}`}>
                      {index + 1}
                    </Badge>
                  </div>
                  <div className="relative w-32 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                      src={route.imageUrl}
                      alt={route.name}
                      fill
                      className="object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Route'; }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-primary truncate">{route.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{route.description}</p>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {route.distance}km</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {route.duration}分</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-red-500">
                        <Heart size={14} className="fill-current"/>
                        <span>{route.likes.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground text-center">ランキング対象のルートがありません。</p>
        )}
      </div>
    </div>
  );
}