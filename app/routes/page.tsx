'use client';

import Link from 'next/link';
import { RouteCard } from '@/components/RouteCard';
import { SearchFilter } from '@/components/SearchFilter';
import { useState, useEffect } from 'react';
import { Route } from '@/types';

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch data from an API here.
    // e.g., fetch('/api/routes').then(res => res.json()).then(setRoutes);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">散歩ルート一覧</h1>
        <p className="text-muted-foreground mt-2">
          あなたにぴったりの散歩コースを見つけましょう。
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Panel: Filters */}
        <aside className="w-full lg:w-1/4 lg:sticky top-20 h-fit">
          <SearchFilter />
        </aside>

        {/* Right Panel: Route List */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {routes.length > 0 ? (
              routes.map((route) => (
                <Link href={`/routes/${route.id}`} key={route.id}>
                  <RouteCard
                    route={route}
                    isSelected={selectedRouteId === route.id} 
                    onSelectRoute={() => setSelectedRouteId(route.id)}
                  />
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground col-span-full text-center">利用可能なルートはありません。</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}