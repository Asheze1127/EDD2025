
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export function SearchFilter() {
  // Note: In a real application, you would lift the state up to the parent component.
  // For this refactoring, we keep it simple.

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
          <Label htmlFor="distance">距離 (km)</Label>
          <Slider defaultValue={[5]} max={20} step={1} id="distance" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">所要時間 (分)</Label>
          <Slider defaultValue={[60]} max={180} step={10} id="duration" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="season">季節</Label>
          <Select>
            <SelectTrigger id="season">
              <SelectValue placeholder="すべての季節" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての季節</SelectItem>
              <SelectItem value="spring">春</SelectItem>
              <SelectItem value="summer">夏</SelectItem>
              <SelectItem value="autumn">秋</SelectItem>
              <SelectItem value="winter">冬</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="climate">気候</Label>
          <Select>
            <SelectTrigger id="climate">
              <SelectValue placeholder="すべての気候" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての気候</SelectItem>
              <SelectItem value="hot">暑い日</SelectItem>
              <SelectItem value="comfortable">快適</SelectItem>
              <SelectItem value="cold">寒い日</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full">検索</Button>
      </CardContent>
    </Card>
  );
}
