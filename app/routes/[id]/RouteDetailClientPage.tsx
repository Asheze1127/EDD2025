
'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MapPin, Clock, Star, Leaf, Cloud, CheckCircle } from 'lucide-react';
import { LatLngExpression } from 'leaflet';
import { Route } from '@/types';
import { useToast } from '@/hooks/use-toast';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-200 animate-pulse rounded-lg"></div>
});

interface RouteDetailClientPageProps {
  route: Route;
}

export default function RouteDetailClientPage({ route }: RouteDetailClientPageProps) {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const status = searchParams.get('status');
    if (status === 'success') {
      toast({
        title: "成功",
        description: "ルートの記録が正常に保存されました。",
      });
    }
  }, [searchParams, toast]);

  const { name, description, distance, duration, rating, seasons, climates, spots, image_url, path } = route;

  const center: LatLngExpression = path.length > 0 ? path[0] : [0, 0];

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Success Alert */}
      {searchParams.get('status') === 'success' && (
        <Alert variant="default" className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 !text-green-600" />
          <AlertTitle>記録完了</AlertTitle>
          <AlertDescription>
            新しいお散歩ルートが正常に保存されました。
          </AlertDescription>
        </Alert>
      )}

      {/* Route Header */}
      <header className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <Image
          src={image_url}
          alt={name}
          fill
          className="object-cover"
        />
      </header>
    </div>
  );
}
