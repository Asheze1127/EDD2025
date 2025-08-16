
import { Route } from '@/types';

export const dummyRoutes: Route[] = [
  {
    id: '1',
    name: '春の小川と桜並木ルート',
    description: '春の訪れを感じながら、小川のせせらぎと満開の桜並木を楽しめる癒やしのルートです。写真撮影にも最適です。',
    distance: 3.5,
    duration: 45,
    path: [
      [35.681236, 139.767125], // Tokyo Station
      [35.685175, 139.752799], // Chidorigafuchi
      [35.693825, 139.755094], // Yasukuni Shrine
    ],
    seasons: ['Spring'],
    climates: ['Comfortable'],
    spots: [
      {
        id: 'spot-1',
        name: '千鳥ヶ淵緑道',
        type: 'Viewpoint',
        location: { lat: 35.685175, lng: 139.752799 },
        description: '都内屈指の桜の名所。ボートに乗りながらのお花見も楽しめます。',
        images: ['/images/spot1.jpg'],
      },
      {
        id: 'spot-2',
        name: 'Sizzle Cafe',
        type: 'Cafe',
        location: { lat: 35.688, lng: 139.754 },
        description: '散歩の休憩に最適な、静かで落ち着いた雰囲気のカフェです。',
        images: ['/images/spot2.jpg'],
      },
    ],
    rating: 4.8,
    likes: 1200,
    imageUrl: '/images/route1.jpg',
  },
  {
    id: '2',
    name: '夏の木陰とクールスポット巡り',
    description: '暑い夏の日でも涼しく快適に歩ける、木陰の多い公園とクールな商業施設を巡るルートです。',
    distance: 4.2,
    duration: 60,
    path: [
      [35.658581, 139.701321], // Shibuya Station
      [35.66582, 139.69938],   // Yoyogi Park
      [35.671522, 139.708983], // Omotesando Hills
    ],
    seasons: ['Summer'],
    climates: ['Hot Day'],
    spots: [
      {
        id: 'spot-3',
        name: '代々木公園',
        type: 'Park',
        location: { lat: 35.66582, lng: 139.69938 },
        description: '広大な敷地と豊かな緑が広がる都会のオアシス。木陰で涼むのに最適です。',
        images: ['/images/spot3.jpg'],
      },
      {
        id: 'spot-4',
        name: '表参道ヒルズ',
        type: 'Shop',
        location: { lat: 35.671522, lng: 139.708983 },
        description: '涼しい屋内でショッピングやアートを楽しめる複合施設。',
        images: ['/images/spot4.jpg'],
      },
    ],
    rating: 4.5,
    likes: 980,
    imageUrl: '/images/route2.jpg',
  },
  {
    id: '3',
    name: '秋の紅葉と芸術散歩',
    description: '美しい紅葉に染まる公園を散策し、美術館で芸術の秋を堪能する知的なルートです。',
    distance: 2.8,
    duration: 40,
    path: [
      [35.71503, 139.77526],  // Ueno Station
      [35.71611, 139.77222],  // Ueno Park
      [35.71861, 139.775],    // Tokyo National Museum
    ],
    seasons: ['Autumn'],
    climates: ['Comfortable'],
    spots: [
      {
        id: 'spot-5',
        name: '上野恩賜公園',
        type: 'Park',
        location: { lat: 35.71611, lng: 139.77222 },
        description: '広大な敷地に美術館や動物園が点在し、秋には見事な紅葉が楽しめます。',
        images: ['/images/spot5.jpg'],
      },
    ],
    rating: 4.7,
    likes: 1500,
    imageUrl: '/images/route3.jpg',
  },
  {
    id: '4',
    name: '冬のイルミネーションと温かいカフェ',
    description: '寒い冬の夜を彩る美しいイルミネーションを楽しみ、温かい飲み物で心も体も温まるルートです。',
    distance: 2.5,
    duration: 35,
    path: [
      [35.6695, 139.7635],   // Ginza Station
      [35.6741, 139.762],    // Marunouchi Naka-dori
      [35.6812, 139.7671],   // Tokyo Station
    ],
    seasons: ['Winter'],
    climates: ['Cold Day'],
    spots: [
      {
        id: 'spot-6',
        name: '丸の内仲通り',
        type: 'Viewpoint',
        location: { lat: 35.6741, lng: 139.762 },
        description: '冬にはシャンパンゴールドのイルミネーションが輝き、幻想的な雰囲気に包まれます。',
        images: ['/images/spot6.jpg'],
      },
      {
        id: 'spot-7',
        name: 'Hot & Cold Cafe',
        type: 'Cafe',
        location: { lat: 35.68, lng: 139.765 },
        description: '特製のホットチョコレートが人気の、居心地の良いカフェです。',
        images: ['/images/spot7.jpg'],
      },
    ],
    rating: 4.9,
    likes: 2100,
    imageUrl: '/images/route4.jpg',
  },
];
