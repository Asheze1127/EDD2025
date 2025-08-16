import { Route } from '@/types';

export const routes: Route[] = [
  {
    id: '1',
    name: '桜並木の春散歩コース',
    description: '美しい桜並木を楽しめる春の定番散歩コース。途中にはおしゃれなカフェや休憩スポットも充実。',
    distance: 2.3,
    duration: 35,
    difficulty: 'easy',
    rating: 4.7,
    likes: 124,
    seasonalSuitability: ['spring', 'autumn'],
    temperatureSuitability: ['mild', 'warm', 'cool'],
    startPoint: {
      lat: 35.6762,
      lng: 139.6503,
      name: '恵比寿駅'
    },
    endPoint: {
      lat: 35.6850,
      lng: 139.6550,
      name: '目黒川河畔'
    },
    waypoints: [
      { lat: 35.6800, lng: 139.6520, name: '恵比寿ガーデンプレイス' },
      { lat: 35.6830, lng: 139.6535, name: '目黒川沿い' }
    ],
    spots: [
      {
        id: 's1',
        name: 'スターバックス 恵比寿ガーデンプレイス店',
        type: 'cafe',
        description: '大きな窓から桜を眺められる人気カフェ',
        lat: 35.6802,
        lng: 139.6518,
        rating: 4.5,
        tags: ['桜', 'テラス席', 'WiFi']
      },
      {
        id: 's2',
        name: '目黒川桜並木',
        type: 'viewpoint',
        description: '東京屈指の桜の名所、春には多くの人で賑わう',
        lat: 35.6825,
        lng: 139.6540,
        rating: 4.8,
        tags: ['桜', '写真スポット', '春限定']
      },
      {
        id: 's3',
        name: '恵比寿公園',
        type: 'park',
        description: '小さいながらも緑豊かな憩いの公園',
        lat: 35.6815, 
        lng: 139.6525,
        rating: 4.2,
        tags: ['休憩', 'ベンチ', '緑']
      }
    ],
    tags: ['桜', '春', 'カフェ', '写真映え', '都市部'],
    createdAt: '2024-03-15',
    author: 'さくらウォーカー',
    imageUrl: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg'
  },
  {
    id: '2', 
    name: '涼しい森林浴コース',
    description: '夏の暑さを忘れられる、緑陰豊かな森林散歩コース。マイナスイオンたっぷりで癒し効果抜群。',
    distance: 3.1,
    duration: 50,
    difficulty: 'moderate',
    rating: 4.6,
    likes: 89,
    seasonalSuitability: ['summer', 'spring', 'autumn'],
    temperatureSuitability: ['hot', 'warm', 'mild'],
    startPoint: {
      lat: 35.7219,
      lng: 139.7966,
      name: '上野駅'
    },
    endPoint: {
      lat: 35.7267,
      lng: 139.7942,
      name: '不忍池'
    },
    waypoints: [
      { lat: 35.7180, lng: 139.7730, name: '上野公園入口' },
      { lat: 35.7200, lng: 139.7750, name: '東照宮' }
    ],
    spots: [
      {
        id: 's4',
        name: '上野の森',
        type: 'park',
        description: '都心とは思えない豊かな緑に包まれた森',
        lat: 35.7190,
        lng: 139.7740,
        rating: 4.7,
        tags: ['森林', '涼しい', 'マイナスイオン']
      },
      {
        id: 's5',
        name: '不忍池カフェ',
        type: 'cafe',
        description: '池を眺めながらゆっくりできるカフェ',
        lat: 35.7260,
        lng: 139.7930,
        rating: 4.3,
        tags: ['池ビュー', 'テラス', '休憩']
      }
    ],
    tags: ['森林浴', '夏', '涼しい', '自然', '癒し'],
    createdAt: '2024-06-20',
    author: '森の案内人',
    imageUrl: 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg'
  },
  {
    id: '3',
    name: '紅葉めぐりコース',
    description: '秋の美しい紅葉を満喫できる散歩コース。カメラ持参必須の絶景スポットが点在。',
    distance: 2.8,
    duration: 45,
    difficulty: 'easy',
    rating: 4.8,
    likes: 156,
    seasonalSuitability: ['autumn'],
    temperatureSuitability: ['cool', 'mild'],
    startPoint: {
      lat: 35.6586,
      lng: 139.7454,
      name: '表参道駅'
    },
    endPoint: {
      lat: 35.6625,
      lng: 139.7345,
      name: '明治神宮外苑'
    },
    waypoints: [
      { lat: 35.6600, lng: 139.7400, name: '表参道ヒルズ' },
      { lat: 35.6610, lng: 139.7380, name: '神宮前交差点' }
    ],
    spots: [
      {
        id: 's6',
        name: '神宮外苑いちょう並木',
        type: 'viewpoint',
        description: '東京の紅葉の代表的スポット、黄金のトンネルが美しい',
        lat: 35.6620,
        lng: 139.7350,
        rating: 4.9,
        tags: ['紅葉', 'いちょう', '写真スポット', '秋限定']
      },
      {
        id: 's7',
        name: 'ブルーシール アイスクリーム',
        type: 'shop',
        description: '散歩の休憩にぴったりなアイスクリーム店',
        lat: 35.6605,
        lng: 139.7390,
        rating: 4.4,
        tags: ['アイス', '休憩', 'おやつ']
      }
    ],
    tags: ['紅葉', '秋', '写真映え', 'いちょう', '絶景'],
    createdAt: '2024-11-10',
    author: '紅葉ハンター',
    imageUrl: 'https://images.pexels.com/photos/1526/autumn-tree-red-season.jpg'
  },
  {
    id: '4',
    name: '海辺の朝活コース',
    description: '朝の清々しい海風を感じながら歩ける爽快コース。朝活やジョギングにも最適。',
    distance: 4.2,
    duration: 60,
    difficulty: 'moderate',
    rating: 4.5,
    likes: 98,
    seasonalSuitability: ['spring', 'summer', 'autumn'],
    temperatureSuitability: ['mild', 'warm', 'cool'],
    startPoint: {
      lat: 35.6298,
      lng: 139.7965,
      name: '豊洲駅'
    },
    endPoint: {
      lat: 35.6256,
      lng: 139.7817,
      name: 'お台場海浜公園'
    },
    waypoints: [
      { lat: 35.6280, lng: 139.7900, name: '豊洲市場' },
      { lat: 35.6270, lng: 139.7850, name: 'レインボーブリッジ下' }
    ],
    spots: [
      {
        id: 's8',
        name: '豊洲市場見学デッキ',
        type: 'viewpoint',
        description: '活気ある市場の様子を見学できるスポット',
        lat: 35.6285,
        lng: 139.7895,
        rating: 4.3,
        tags: ['市場', '朝', '見学']
      },
      {
        id: 's9',
        name: 'お台場海浜公園',
        type: 'park',
        description: '東京湾を一望できる人工砂浜のある公園',
        lat: 35.6250,
        lng: 139.7810,
        rating: 4.6,
        tags: ['海', 'ビーチ', '絶景', 'ランニング']
      }
    ],
    tags: ['海', '朝活', 'ジョギング', '絶景', '爽快'],
    createdAt: '2024-07-05',
    author: '朝活マスター',
    imageUrl: 'https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg'
  },
  {
    id: '5',
    name: '歴史探訪コース',
    description: '古い神社仏閣を巡りながら日本の歴史を感じられる文化的散歩コース。',
    distance: 3.5,
    duration: 70,
    difficulty: 'moderate',
    rating: 4.4,
    likes: 76,
    seasonalSuitability: ['spring', 'autumn', 'winter'],
    temperatureSuitability: ['mild', 'cool', 'cold'],
    startPoint: {
      lat: 35.7148,
      lng: 139.7967,
      name: '浅草駅'
    },
    endPoint: {
      lat: 35.7101,
      lng: 139.8107,
      name: '東京スカイツリー'
    },
    waypoints: [
      { lat: 35.7148, lng: 139.7966, name: '浅草寺' },
      { lat: 35.7120, lng: 139.8000, name: '隅田川沿い' }
    ],
    spots: [
      {
        id: 's10',
        name: '浅草寺',
        type: 'shrine',
        description: '東京最古の寺院、雷門で有名な観光名所',
        lat: 35.7147,
        lng: 139.7965,
        rating: 4.7,
        tags: ['歴史', '寺院', '文化', '観光']
      },
      {
        id: 's11',
        name: '仲見世通り',
        type: 'shop',
        description: '伝統的なお土産や和菓子が楽しめる商店街',
        lat: 35.7145,
        lng: 139.7963,
        rating: 4.5,
        tags: ['お土産', '和菓子', '伝統', 'ショッピング']
      }
    ],
    tags: ['歴史', '文化', '寺院', '伝統', '観光'],
    createdAt: '2024-04-12',
    author: '歴史愛好家',
    imageUrl: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg'
  },
  {
    id: '6',
    name: '夜景散歩コース',
    description: '東京の美しい夜景を楽しみながら歩ける大人のための散歩コース。',
    distance: 2.1,
    duration: 40,
    difficulty: 'easy',
    rating: 4.6,
    likes: 112,
    seasonalSuitability: ['spring', 'summer', 'autumn', 'winter'],
    temperatureSuitability: ['mild', 'cool', 'cold'],
    startPoint: {
      lat: 35.6598,
      lng: 139.7006,
      name: '六本木駅'
    },
    endPoint: {
      lat: 35.6654,
      lng: 139.7297,
      name: '東京タワー'
    },
    waypoints: [
      { lat: 35.6620, lng: 139.7100, name: '六本木ヒルズ' },
      { lat: 35.6640, lng: 139.7200, name: '麻布十番' }
    ],
    spots: [
      {
        id: 's12',
        name: '六本木ヒルズ展望台',
        type: 'viewpoint',
        description: '東京を一望できる人気の展望スポット',
        lat: 35.6619,
        lng: 139.7106,
        rating: 4.8,
        tags: ['夜景', '展望台', 'デート', '絶景']
      },
      {
        id: 's13',
        name: '東京タワー',
        type: 'viewpoint',
        description: 'ライトアップされた東京タワーは夜が特に美しい',
        lat: 35.6586,
        lng: 139.7454,
        rating: 4.7,
        tags: ['夜景', 'ライトアップ', 'ランドマーク', 'ロマンチック']
      }
    ],
    tags: ['夜景', 'デート', 'ロマンチック', '都市', 'ライトアップ'],
    createdAt: '2024-08-18',
    author: '夜景コレクター',
    imageUrl: 'https://images.pexels.com/photos/2410616/pexels-photo-2410616.jpeg'
  }
];