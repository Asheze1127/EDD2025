
'use client';

import Link from 'next/link';
import { dummyRoutes } from '@/data/routes';
import { RouteCard } from '@/components/RouteCard';
import { SearchFilter } from '@/components/SearchFilter';
import { useState } from 'react';
import { Route } from '@/types';

export default function RoutesPage() {
  // In a real app, you'd have filtering logic here.
  // For now, we just display all routes.
  const [routes, setRoutes] = useState<Route[]>(dummyRoutes);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

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
            {routes.map((route) => (
              <Link href={`/routes/${route.id}`} key={route.id}>
                <RouteCard
                  route={route}
                  // A dummy isSelected prop, can be removed or used for other UI feedback
                  isSelected={selectedRouteId === route.id} 
                  onSelectRoute={() => setSelectedRouteId(route.id)}
                />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
