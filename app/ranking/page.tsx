import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { Trophy } from 'lucide-react';

import { RankingTabs } from '@/components/RankingTabs';
import { RankingListItem } from '@/components/RankingListItem';
import { RouteWithProfile } from '@/types';

export const revalidate = 0; // Ensure dynamic rendering

interface RankingPageProps {
  searchParams: {
    by?: 'likes' | 'rating';
  };
}

export default async function RankingPage({ searchParams }: RankingPageProps) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const sortBy = searchParams.by === 'rating' ? 'rating' : 'likes';

  const { data: routes, error } = await supabase
    .from('routes')
    .select(`
      *,
      profiles ( username )
    `)
    .order(sortBy, { ascending: false })
    .limit(10) as { data: RouteWithProfile[], error: any };

  if (error) {
    console.error('Error fetching ranking:', error);
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <header className="text-center space-y-2">
        <Trophy className="h-12 w-12 mx-auto text-yellow-400" />
        <h1 className="text-4xl font-bold text-primary">人気ルートランキング</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          みんなが選んだ人気の散歩コースをチェックしよう。
        </p>
      </header>

      <Suspense fallback={<div>Loading...</div>}>
        <RankingTabs />
      </Suspense>

      <div className="max-w-4xl mx-auto space-y-4">
        {routes && routes.length > 0 ? (
          routes.map((route, index) => (
            <RankingListItem key={route.id} route={route} rank={index + 1} />
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">ランキング対象のルートがありません</h3>
            <p className="text-muted-foreground mt-2">最初の「いいね」を付けに行くか、新しいルートを投稿しましょう！</p>
          </div>
        )}
      </div>
    </div>
  );
}
