import type { Activity } from "@/types/global";

export const mockActivities: Activity[] = [
  {
    id: 1,
    name: "夕陽散步＋拍天空",
    vibe: ["輕鬆", "安靜", "小群體"],
    socialLevel: 1,
    interests: ["散步", "手機攝影", "觀景"],
    images: ["tainan_park.png"],
    host: { nickname: "skywalker" },
    location: {
      name: "台南公園 - 燕湖畔",
      coordinates: { lat: 22.9981, lng: 120.2143 }
    },
    schedule: { date: "2025-03-14", start: "17:30" },
    description: "一起邊走邊拍天空的顏色，不太需要聊天，舒服就好。"
  },

  {
    id: 2,
    name: "草地靜靜塗鴉",
    vibe: ["chill", "安靜"],
    socialLevel: 0,
    interests: ["插畫", "素描"],
    images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300"],
    host: { nickname: "mellowcat" },
    location: {
      name: "台南公園 - 落羽松區草地",
      coordinates: { lat: 22.9989, lng: 120.2131 }
    },
    groupSize: { min: 2, max: 5 },
    schedule: { date: "2025-03-16", start: "15:30" },
    description: "帶喜歡的筆記本來，大家各畫各的，需要時再抬頭微笑。"
  },

  {
    id: 3,
    name: "音樂耳機分享角落",
    vibe: ["安靜", "同好"],
    socialLevel: 2,
    interests: ["音樂", "分享歌單"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "lofi_boy" },
    location: {
      name: "台南公園 - 木棧平台",
      coordinates: { lat: 22.9977, lng: 120.2148 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-03-17", start: "16:00" },
    description: "帶上你的歌單，用分線器一起聽，不用寒暄太多。"
  },

  {
    id: 4,
    name: "小小讀書野餐墊",
    vibe: ["輕鬆", "安靜"],
    socialLevel: 1,
    interests: ["閱讀", "野餐"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "leafreader" },
    location: {
      name: "台南公園 - 心型花圃旁",
      coordinates: { lat: 22.9979, lng: 120.2150 }
    },
    schedule: { date: "2025-03-18", start: "16:30" },
    description: "帶一本你想看的書，我們只是一起安靜地坐著。"
  },

  {
    id: 5,
    name: "手機微距小探險",
    vibe: ["輕鬆", "小群體"],
    socialLevel: 2,
    interests: ["手機攝影", "自然"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "buglens" },
    location: {
      name: "台南公園 - 水池邊樹叢",
      coordinates: { lat: 22.9984, lng: 120.2137 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-03-19", start: "17:00" },
    description: "一起找小花、小葉子、小昆蟲，用手機拍下微距世界。"
  },

  {
    id: 6,
    name: "超輕量聊天圈（可不說話）",
    vibe: ["chill", "溫柔"],
    socialLevel: 1,
    interests: ["交朋友"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "softshell" },
    location: {
      name: "台南公園 - 圓形廣場角落",
      coordinates: { lat: 22.9986, lng: 120.2149 }
    },
    groupSize: { min: 3, max: 7 },
    schedule: { date: "2025-03-20", start: "17:10" },
    description: "想講再講，不講也沒關係，是個讓人不尷尬的小圈。"
  },

  {
    id: 7,
    name: "落羽松下的慢走觀察",
    vibe: ["安靜", "自然"],
    socialLevel: 0,
    interests: ["散步", "觀察自然"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "pinecone" },
    location: {
      name: "台南公園 - 落羽松林道",
      coordinates: { lat: 22.9990, lng: 120.2132 }
    },
    groupSize: { min: 2, max: 5 },
    schedule: { date: "2025-03-20", start: "17:00" },
    description: "慢慢走、慢慢看，不急不趕。"
  },

  {
    id: 8,
    name: "小型桌遊：超入門款",
    vibe: ["輕鬆", "小群體"],
    socialLevel: 3,
    interests: ["桌遊"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "tinytable" },
    location: {
      name: "台南公園 - 涼亭 A",
      coordinates: { lat: 22.9982, lng: 120.2140 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-03-21", start: "15:00" },
    description: "只玩規則超簡單、不會壓力大的桌遊。"
  },

  {
    id: 9,
    name: "輕輕畫彼此的手（不講話版）",
    vibe: ["安靜", "藝術感"],
    socialLevel: 1,
    interests: ["素描", "觀察"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "pencilcloud" },
    location: {
      name: "台南公園 - 大樹陰影下",
      coordinates: { lat: 22.9985, lng: 120.2135 }
    },
    groupSize: { min: 2, max: 4 },
    schedule: { date: "2025-03-22", start: "16:00" },
    description: "不用畫得好，只是安靜地畫手，是很治癒的事。"
  },

  {
    id: 10,
    name: "一起追松鼠（安靜版）",
    vibe: ["chill", "愉快"],
    socialLevel: 0,
    interests: ["散步", "自然觀察"],
    images: ["https://picsum.photos/200/300"],
    host: { nickname: "nutty" },
    location: {
      name: "台南公園 - 步道區",
      coordinates: { lat: 22.9980, lng: 120.2142 }
    },
    groupSize: { min: 2, max: 5 },
    schedule: { date: "2025-03-23", start: "17:20" },
    description: "我們不是真的追，只是一起看牠們跑來跑去。"
  }
];