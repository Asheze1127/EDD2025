import Link from 'next/link';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

import { RouteCard } from '@/components/RouteCard';
import { SearchFilter } from '@/components/SearchFilter';
import { RouteWithProfile } from '@/types';

export const revalidate = 0; // Ensure dynamic rendering

interface RoutesPageProps {
  searchParams: {
    q?: string;
    season?: string;
    climate?: string;
  };
}

export default async function RoutesPage({ searchParams }: RoutesPageProps) {
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

  // --- Supabase Query Construction ---
  let query = supabase
    .from('routes')
    .select(`
      *,
      profiles ( username )
    `)
    .order('created_at', { ascending: false });

  if (searchParams.q) {
    query = query.ilike('name', `%${searchParams.q}%`);
  }
  if (searchParams.season) {
    query = query.contains('seasons', [searchParams.season]);
  }
  if (searchParams.climate) {
    query = query.contains('climates', [searchParams.climate]);
  }

  const { data: routes, error } = await query as { data: RouteWithProfile[], error: any };

  if (error) {
    console.error('Error fetching routes:', error);
    // You might want to render an error component here
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary">散歩ルート一覧</h1>
        <p className="text-muted-foreground mt-2">
          あなたにぴったりの散歩コースを見つけましょう。
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 lg:sticky top-20 h-fit">
          <SearchFilter />
        </aside>

        <main className="flex-1">
          {routes && routes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {routes.map((route) => (
                <Link href={`/routes/${route.id}`} key={route.id} className="no-underline">
                  <RouteCard route={route} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <h3 className="text-xl font-semibold">ルートが見つかりません</h3>
              <p className="text-muted-foreground mt-2">検索条件を変更してみてください。</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
