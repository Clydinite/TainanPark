import { v4 as uuidv4 } from "uuid";
import type { Activity } from "@/types/global";
import playingInTheParkPng from '/playing_in_the_park.png';
import tainanParkPng from '/tainan_park.png';
import tainanWalkSketchPng from '/tainan_walk_sketch.png';

export const mockActivities: Activity[] = [
  {
    id: uuidv4(),
    name: "公園小隊挑戰：超隨興任務大亂鬥",
    vibe: ["活潑", "熱鬧", "小群體"],
    socialLevel: 3, // 需要持續互動、討論、一起解任務
    interests: ["小遊戲", "團隊合作", "跑跳活動"],
    images: [playingInTheParkPng],
    host: {
      nickname: "teamtaro",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    location: {
      name: "台南公園 - 大草坪區",
      coordinates: { lat: 22.9987, lng: 120.2140 }
    },
    groupSize: { min: 6, max: 12 },
    schedule: {
      date: "2025-12-20",
      start: "16:00",
      end: "17:30"
    },
    description:
      "我們會分成小隊，完成一系列超隨興的公園任務：像是 30 秒內拍到「跑步中的鴿子」、跟陌生阿伯借一句人生金句、五人同步跳拍成功一次... 全程都要一起討論策略、分工、互相加油。氣氛很吵（好玩那種），會一直講話，不太適合害羞模式。",
    comments: [
      {
        handle: "teamtaro",
        avatar: "https://i.pravatar.cc/150?img=5",
        text: "任務我都準備好了！等你們來亂！"
      },
      {
        handle: "pudding_wave",
        avatar: "https://i.pravatar.cc/150?img=7",
        text: "上次的跳拍任務超好笑 😂"
      },
      {
        handle: "sunnyzoe",
        avatar: "https://i.pravatar.cc/150?img=9",
        text: "第一次參加就被分隊衝來衝去…但很好玩啦！"
      }
    ],
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "傍晚散步＋拍天空色調",
    vibe: ["輕鬆", "安靜", "小群體"],
    socialLevel: 1, // 可選擇性小互動
    interests: ["散步", "手機攝影", "觀景", "天空控"],
    images: [tainanParkPng],
    host: {
      nickname: "skywalker",
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    location: {
      name: "台南公園 - 燕湖旁步道",
      coordinates: { lat: 22.9981, lng: 120.2143 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-12-26", start: "17:10" },
    description:
      "一起散步、順便看天空換顏色。聊天不用勉強，想拍就拍～氣氛主打舒服放鬆。",
    comments: [
      {
        handle: "skywalker",
        avatar: "https://i.pravatar.cc/150?img=32",
        text: "最近天空顏色超美，想找人一起拍😆"
      },
      {
        handle: "mellowcat",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: "我不太會拍，但很想一起走走可以嗎？"
      },
      {
        handle: "breeze_drizzle",
        avatar: "https://i.pravatar.cc/150?img=45",
        text: "行程很chill，剛好那天有空～"
      }
    ],
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "草地微步素描巡禮",
    vibe: ["chill", "安靜", "微活動"],
    socialLevel: 1,
    interests: ["插畫", "素描", "散步", "觀察自然"],
    images: [tainanWalkSketchPng],
    host: { nickname: "mellowcat", avatar: "https://i.pravatar.cc/150?img=12" },
    location: {
      name: "台南公園 - 落羽松步道",
      coordinates: { lat: 22.9989, lng: 120.2131 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-12-18", start: "15:45" },
    description:
      "慢慢走一小段路，一起找舒服的地方坐下來畫樹、畫光影。不需要很會畫，也不太需要聊天，主要是讓眼睛休息、讓手動一下。想交流時再輕輕晃過來看彼此的畫就好。",
    comments: [
      { handle: "mellowcat", avatar: "https://i.pravatar.cc/150?img=12", text: "最近落羽松超漂亮，想找人一起邊走邊畫。" },
      { handle: "cloudberry", avatar: "https://i.pravatar.cc/150?img=32", text: "我素描很菜，但看起來是低壓的那種…可以嗎？" },
      { handle: "mellowcat", avatar: "https://i.pravatar.cc/150?img=12", text: "完全可以！真的只是隨手畫～" }
    ],
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
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
    description: "帶上你的歌單，用分線器一起聽，不用寒暄太多。",
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "小小讀書野餐墊",
    vibe: ["輕鬆", "安靜"],
    socialLevel: 1,
    interests: ["閱讀", "野餐"],
    images: ["https://picsum.photos/seed/left/200/300"],
    host: { nickname: "leafreader" },
    location: {
      name: "台南公園 - 心型花圃旁",
      coordinates: { lat: 22.9979, lng: 120.2150 }
    },
    schedule: { date: "2025-03-18", start: "16:30" },
    description: "帶一本你想看的書，我們只是一起安靜地坐著。",
    verificationStatus: "pending"
  },

  {
    id: uuidv4(),
    name: "手機微距小探險",
    vibe: ["輕鬆", "小群體"],
    socialLevel: 2,
    interests: ["手機攝影", "自然"],
    images: ["https://picsum.photos/seed/forest/200/300"],
    host: { nickname: "buglens" },
    location: {
      name: "台南公園 - 水池邊樹叢",
      coordinates: { lat: 22.9984, lng: 120.2137 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-03-19", start: "17:00" },
    description: "一起找小花、小葉子、小昆蟲，用手機拍下微距世界。",
    verificationStatus: "reviewing"
  },

  {
    id: uuidv4(),
    name: "超輕量聊天圈（可不說話）",
    vibe: ["chill", "溫柔"],
    socialLevel: 1,
    interests: ["交朋友"],
    images: ["https://picsum.photos/seed/city/200/300"],
    host: { nickname: "softshell" },
    location: {
      name: "台南公園 - 圓形廣場角落",
      coordinates: { lat: 22.9986, lng: 120.2149 }
    },
    groupSize: { min: 3, max: 7 },
    schedule: { date: "2025-03-20", start: "17:10" },
    description: "想講再講，不講也沒關係，是個讓人不尷尬的小圈。",
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "落羽松下的慢走觀察",
    vibe: ["安靜", "自然"],
    socialLevel: 0,
    interests: ["散步", "觀察自然"],
    images: ["https://picsum.photos/seed/park/200/300"],
    host: { nickname: "pinecone" },
    location: {
      name: "台南公園 - 落羽松林道",
      coordinates: { lat: 22.9990, lng: 120.2132 }
    },
    groupSize: { min: 2, max: 5 },
    schedule: { date: "2025-03-20", start: "17:00" },
    description: "慢慢走、慢慢看，不急不趕。",
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "小型桌遊：超入門款",
    vibe: ["輕鬆", "小群體"],
    socialLevel: 3,
    interests: ["桌遊"],
    images: ["https://picsum.photos/seed/table/200/300"],
    host: { nickname: "tinytable" },
    location: {
      name: "台南公園 - 涼亭 A",
      coordinates: { lat: 22.9982, lng: 120.2140 }
    },
    groupSize: { min: 3, max: 6 },
    schedule: { date: "2025-03-21", start: "15:00" },
    description: "只玩規則超簡單、不會壓力大的桌遊。",
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "輕輕畫彼此的手（不講話版）",
    vibe: ["安靜", "藝術感"],
    socialLevel: 1,
    interests: ["素描", "觀察"],
    images: ["https://picsum.photos/seed/art/200/300"],
    host: { nickname: "pencilcloud" },
    location: {
      name: "台南公園 - 大樹陰影下",
      coordinates: { lat: 22.9985, lng: 120.2135 }
    },
    groupSize: { min: 2, max: 4 },
    schedule: { date: "2025-03-22", start: "16:00" },
    description: "不用畫得好，只是安靜地畫手，是很治癒的事。",
    verificationStatus: "verified"
  },

  {
    id: uuidv4(),
    name: "一起追松鼠（安靜版）",
    vibe: ["chill", "愉快"],
    socialLevel: 0,
    interests: ["散步", "自然觀察"],
    images: ["https://picsum.photos/seed/nature/200/300"],
    host: { nickname: "nutty" },
    location: {
      name: "台南公園 - 步道區",
      coordinates: { lat: 22.9980, lng: 120.2142 }
    },
    groupSize: { min: 2, max: 5 },
    schedule: { date: "2025-03-23", start: "17:20" },
    description: "我們不是真的追，只是一起看牠們跑來跑去。",
    verificationStatus: "verified"
  }
];
