'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useGeolocation } from '@/hooks/useGeolocation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { calculateDistance } from '@/lib/utils';
import { Route, RoutePoint } from '@/types';

// MapViewをクライアントサイドでのみ動的にインポート
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

// 状態の型定義
type RecordingStatus = 'idle' | 'recording' | 'stopped';

export default function RecordPage() {
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [routePoints, setRoutePoints] = useState<LatLngExpression[]>([]);
  const [distance, setDistance] = useState(0); // メートル単位
  const [elapsedTime, setElapsedTime] = useState(0); // 秒単位
  const [routeName, setRouteName] = useState('');
  const [routeDescription, setRouteDescription] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { position, error: geoError, startWatching, stopWatching } = useGeolocation();
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  // 記録中に位置情報が更新された時の処理
  useEffect(() => {
    if (status === 'recording' && position) {
      setRoutePoints((prevPoints) => {
        if (prevPoints.length > 0) {
          const lastPoint = prevPoints[prevPoints.length - 1];
          setDistance((prevDist) => prevDist + calculateDistance(lastPoint, position));
        }
        return [...prevPoints, position];
      });
    }
  }, [position, status]);

  // 記録中のタイマー処理
  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status]);

  const resetState = useCallback(() => {
    setStatus('idle');
    setRoutePoints([]);
    setDistance(0);
    setElapsedTime(0);
    setRouteName('');
    setRouteDescription('');
  }, []);

  const handleStart = async () => {
    // ★★★ 記録開始時にログインチェック ★★★
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'ログインが必要です', description: 'ルートを記録・保存するにはログインしてください。'});
      router.push('/login');
      return;
    }

    resetState();
    setStatus('recording');
    startWatching();
  };

  const handleStop = () => {
    setStatus('stopped');
    stopWatching();
  };

  const handleDiscard = () => {
    resetState();
  };

  const handleSave = async () => {
    console.log("handleSave: 保存処理を開始します。");

    if (routeName.trim() === '') {
      toast({ title: 'エラー', description: 'ルート名を入力してください。', variant: 'destructive' });
      return;
    }
    if (routePoints.length < 2) {
      toast({ title: 'エラー', description: 'ルートが短すぎます。', variant: 'destructive' });
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: 'エラー', description: 'ユーザー情報が取得できませんでした。再ログインしてください。', variant: 'destructive' });
      return;
    }

    try {
      // ---【新しい解決策】プロフィール存在確認と、なければ作成 --- //
      console.log(`handleSave: ユーザーID '${user.id}' のプロフィールが存在するか確認します...`);
      const { data: profile } = await supabase.from('profiles').select('id').eq('id', user.id).single();

      if (!profile) {
        console.warn("handleSave: プロフィールが見つかりませんでした。新規作成を試みます...");
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({ id: user.id, username: user.email });

        if (createProfileError) {
          console.error("handleSave: プロフィールの自動作成に失敗しました。", createProfileError);
          toast({
            title: 'プロファイル作成エラー',
            description: `DBエラー: ${createProfileError.message} (Row Level Securityポリシーを確認してください)`,
            variant: 'destructive',
          });
          return; // プロフィールが作れないのでここで中断
        }
        console.log("handleSave: プロフィールの自動作成に成功しました。");
      } else {
        console.log("handleSave: プロフィールは正常に存在します。");
      }
      // --- ここまでが新しい解決策 --- //

      console.log("handleSave: 'routes'テーブルにデータを挿入します。");
      const { data: routeData, error: routeError } = await supabase
        .from('routes')
        .insert({
          name: routeName,
          description: routeDescription,
          distance: Math.round(distance),
          duration: elapsedTime,
          user_id: user.id,
        })
        .select()
        .single();

      if (routeError) throw routeError; // ここでエラーが出れば下のcatchに飛ぶ

      console.log("handleSave: 'route_points'テーブルにデータを挿入します。");
      const { error: pointsError } = await supabase.from('route_points').insert({
        route_id: routeData.id,
        path: routePoints,
      });

      if (pointsError) throw pointsError;

      toast({ title: '成功', description: 'ルートを保存しました。' });
      router.push(`/routes/${routeData.id}?status=success`);

    } catch (error: any) {
      console.error('handleSave: catchブロックでエラーを捕捉しました。', error);
      toast({ title: '保存エラー', description: `DBエラー: ${error.message}`, variant: 'destructive' });
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">お散歩を記録する</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>コントロール</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {status === 'idle' && (
                <Button onClick={handleStart} className="w-full">記録開始</Button>
              )}
              {status === 'recording' && (
                <Button onClick={handleStop} variant="destructive" className="w-full">記録終了</Button>
              )}
              {status === 'stopped' && (
                <div className="space-y-2">
                  <Button onClick={handleSave} className="w-full">保存</Button>
                  <Button onClick={handleDiscard} variant="outline" className="w-full">破棄</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ステータス</CardTitle>
            </CardHeader>
            <CardContent>
              <p>経過時間: {formatTime(elapsedTime)}</p>
              <p>移動距離: {(distance / 1000).toFixed(2)} km</p>
              {geoError && <p className="text-red-500">GPSエラー: {geoError.message}</p>}
            </CardContent>
          </Card>

          {status === 'stopped' && (
            <Card>
              <CardHeader>
                <CardTitle>ルート情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="routeName">ルート名</Label>
                  <Input 
                    id="routeName" 
                    value={routeName} 
                    onChange={(e) => setRouteName(e.target.value)} 
                    placeholder='例: 公園までの気持ちいい道'
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routeDescription">説明</Label>
                  <Textarea 
                    id="routeDescription" 
                    value={routeDescription} 
                    onChange={(e) => setRouteDescription(e.target.value)} 
                    placeholder='景色の良いポイントや注意点など'
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="md:col-span-2 h-[80vh]">
          <MapView 
            center={position || [35.681236, 139.767125]} // 初期位置を東京駅に
            zoom={15}
            currentPosition={position}
            route={routePoints}
          />
        </div>
      </div>
    </div>
  );
}
