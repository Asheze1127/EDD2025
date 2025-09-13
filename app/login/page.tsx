'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const formSchema = z.object({
  email: z.string().email({ message: '有効なメールアドレスを入力してください。' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上で入力してください。' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createSupabaseBrowserClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setMessage('');

    if (isSignUp) {
      // 新規登録処理
      console.log("onSubmit: 新規登録処理を開始します。", values);
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (signUpError) {
        console.error("onSubmit: signUp 中にエラーが発生しました。", signUpError);
        toast({ title: 'エラー', description: signUpError.message, variant: 'destructive' });
      } else if (signUpData.user) {
        console.log("onSubmit: signUp 成功。user.id:", signUpData.user.id);
        console.log("onSubmit: public.profiles にデータを挿入します...");
        
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({ id: signUpData.user.id, username: signUpData.user.email });

        if (profileError) {
          console.error("onSubmit: profiles テーブルへの挿入中にエラーが発生しました。", profileError);
          toast({ title: 'プロファイル作成エラー', description: `コード: ${profileError.code}, メッセージ: ${profileError.message}`, variant: 'destructive' });
        } else {
          console.log("onSubmit: profiles テーブルへの挿入成功。");
          setMessage('確認メールを送信しました。メールボックスを確認してください。');
          form.reset();
        }
      }
    } else {
      // ログイン処理
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast({ title: 'エラー', description: 'メールアドレスまたはパスワードが違います。', variant: 'destructive' });
      } else {
        router.push('/');
        router.refresh(); // サーバーコンポーネントを再取得してUIを更新
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{isSignUp ? '新規登録' : 'ログイン'}</CardTitle>
          <CardDescription>
            {isSignUp ? 'アカウントを作成します' : 'アカウントにログインします'}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {message && <p className="text-sm font-medium text-green-600">{message}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSignUp ? '登録する' : 'ログイン'}
              </Button>
            </CardContent>
          </form>
        </Form>
        <CardFooter className="text-sm">
          <p>
            {isSignUp ? 'すでにアカウントをお持ちですか？' : 'アカウントがありませんか？'}
            <Button variant="link" onClick={() => { setIsSignUp(!isSignUp); form.reset(); setMessage(''); }}>
              {isSignUp ? 'ログイン' : '新規登録'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}