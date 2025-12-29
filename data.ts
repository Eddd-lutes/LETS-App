
export const dummyUsers: { [key: string]: any } = {
    'user_main': {
        id: 'user_main',
        name: '山田 健太',
        university: '香川大学',
        faculty: '経済学部',
        year: '3年',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        interests: ['IT', 'マーケティング'],
        orientation: '挑戦',
        hobbies: ['プログラミング', 'サウナ', 'うどん巡り'],
        followingIds: ['s1', 's2', 's5', 'c1'],
        followerIds: ['s1', 's3', 's7', 'c1', 'c15']
    },
    's1': { id: 's1', name: '山本 恒一', university: '香川大学', faculty: '創造工学部', year: '3年', interests: ['IT', '製造'], orientation: '地元就職', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', hobbies: ['ガジェット', 'ドライブ'] },
    's2': { id: 's2', name: '佐藤 未来', university: '高松大学', faculty: '経営学部', year: '3年', interests: ['営業', '企画'], orientation: '成長環境', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', hobbies: ['カフェ巡り', '旅行'] },
    's3': { id: 's3', name: '藤井 恒一郎', university: '香川高等専門学校', faculty: '機械工学科', year: '5年', interests: ['製造', '設備'], orientation: '技術職', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', hobbies: ['模型', 'バイク'] },
    's4': { id: 's4', name: '小川 彩音', university: '四国学院大学', faculty: '社会学部', year: '4年', interests: ['金融', '事務'], orientation: '安定', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80', hobbies: ['読書', '映画'] },
    's5': { id: 's5', name: '中村 陽斗', university: '徳島大学', faculty: '理工学部', year: '3年', interests: ['メーカー'], orientation: '挑戦', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', hobbies: ['ロボット', '登山'] },
    's6': { id: 's6', name: '田中 優斗', university: '香川大学', faculty: '経済学部', year: '2年', interests: ['商社', '営業'], orientation: '幅広く検討', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80', hobbies: ['テニス', '居酒屋'] },
    's7': { id: 's7', name: '松本 莉子', university: '高松大学', faculty: '発達科学部', year: '3年', interests: ['人事', '教育'], orientation: '人と関わる仕事', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', hobbies: ['ピアノ', 'ボランティア'] },
    's8': { id: 's8', name: '岡田 恒一', university: '香川大学', faculty: '農学部', year: '4年', interests: ['食品', 'メーカー'], orientation: '研究活用', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80', hobbies: ['園芸', '料理'] }
};

export const initialPosts = [
    { id: 1, authorId: 's1', author: '山本 恒一', university: '香川大学', timestamp: 'たった今', content: '創造工学部の実習終わった！IT系のインターン探してます。', tags: ['#香川大', '#IT志望'], likes: 12, comments: 2 },
    { id: 2, authorId: 's2', author: '佐藤 未来', university: '高松大学', timestamp: '10分前', content: '今日の昼休み、うどん巡りしてきた。やっぱり「がもう」のうどんが一番好き！', tags: ['#うどん巡り', '#ランチ'], likes: 45, comments: 8 }
];

export const dummyFeaturedCompanies = [
    { id: 'c1', name: '株式会社タダノ', industry: '機械・製造', logo: 'T', salary: '600万〜', holidays: '125日', internTitle: '建設機械開発体験', internContent: '世界シェアを誇るクレーンの開発現場で、最新の工学技術を学びます。', bgImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80', location: '高松市' },
    { id: 'c15', name: '株式会社ミトラ', industry: 'IT・医療', logo: 'ミ', salary: '500万〜', holidays: '125日', internTitle: '医療DX・開発体験', internContent: '周産期医療システムで国内トップクラス。ITで命を救う、社会貢献×テクノロジーの現場。', bgImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', location: '高松市' }
];

export const initialConversations = [
    { id: 201, userId: 's2', name: '佐藤 未来', lastMessage: 'インターンの詳細聞きたいです！', timestamp: '1時間前', unread: true },
];

export const initialCompanyConversations = [];
export const initialChatHistories = {};
export const dummyCollectedCards = [
    { id: '1', name: '山本 恒一', university: '香川大学', title: '創造工学部 3年' }
];
