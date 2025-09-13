'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

// 選択肢の定数
const seasons = ['春', '夏', '秋', '冬'];
const climates = ['暑い日', '快適', '寒い日'];

export function SearchFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = useDebouncedCallback((term: string) => {
    handleFilterChange('q', term);
  }, 300);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span>ルートを絞り込む</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">キーワード</Label>
          <Input 
            id="search"
            placeholder='例: 公園, 桜, 夜景'
            defaultValue={searchParams.get('q') || ''}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="season">季節</Label>
          <Select 
            defaultValue={searchParams.get('season') || 'all'}
            onValueChange={(value) => handleFilterChange('season', value)}
          >
            <SelectTrigger id="season">
              <SelectValue placeholder="すべての季節" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての季節</SelectItem>
              {seasons.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="climate">気候</Label>
          <Select
            defaultValue={searchParams.get('climate') || 'all'}
            onValueChange={(value) => handleFilterChange('climate', value)}
          >
            <SelectTrigger id="climate">
              <SelectValue placeholder="すべての気候" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての気候</SelectItem>
              {climates.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}