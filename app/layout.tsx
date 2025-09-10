import './globals.css';
import 'leaflet/dist/leaflet.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chill Walk - 季節に最適化された散歩ルート',
  description: '季節・時間帯・気候に応じて最適な散歩ルートを提案し、ユーザー同士がルートやスポットを共有できるアプリ',
  keywords: '散歩, ウォーキング, ルート, 季節, 天気, 共有',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          {children}
        </main>
      </body>
    </html>
  );
}