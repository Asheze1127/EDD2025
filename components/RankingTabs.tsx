'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RankingTabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  
  const currentTab = searchParams.get('by') || 'likes';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('by', value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="likes">いいね順</TabsTrigger>
        <TabsTrigger value="rating">評価順</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
