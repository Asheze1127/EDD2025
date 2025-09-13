'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import { RouteWithProfile } from '@/types';

interface RankingListItemProps {
  route: RouteWithProfile;
  rank: number;
}

const getRankBadgeClass = (rank: number) => {
  if (rank === 1) return 'bg-yellow-400 text-yellow-900 hover:bg-yellow-400';
  if (rank === 2) return 'bg-gray-300 text-gray-800 hover:bg-gray-300';
  if (rank === 3) return 'bg-amber-500 text-amber-900 hover:bg-amber-500';
  return 'bg-primary/10 text-primary hover:bg-primary/10';
};

export function RankingListItem({ route, rank }: RankingListItemProps) {
  return (
    <Link href={`/routes/${route.id}`} className="no-underline">
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-4 flex items-center gap-4">
          {/* Rank Badge */}
          <div className="flex items-center justify-center w-12 h-12 font-bold text-lg flex-shrink-0">
            <Badge className={`text-lg w-10 h-10 flex items-center justify-center rounded-full ${getRankBadgeClass(rank)}`}>
              {rank}
            </Badge>
          </div>

          {/* Image */}
          <div className="relative w-28 h-20 rounded-md overflow-hidden flex-shrink-0">
            <Image 
              src={route.image_url || 'https://via.placeholder.com/150?text=Route'}
              alt={route.name}
              fill
              className="object-cover"
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150?text=Route'; }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-primary truncate" title={route.name}>{route.name}</h3>
            <p className="text-sm text-muted-foreground truncate">by {route.profiles?.username || '匿名ユーザー'}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <div className="flex items-center gap-1 font-bold text-red-500" title="いいね">
                <Heart size={14} className="fill-current"/>
                <span>{route.likes?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-yellow-500" title="評価">
                <Star size={14} className="fill-current"/>
                <span>{route.rating?.toFixed(1) || 'N/A'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
