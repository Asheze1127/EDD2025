"use client";

import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase'; // Supabaseが生成した型定義ファイル

export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
