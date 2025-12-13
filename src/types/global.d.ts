/**
 * 表示一個在台南公園舉辦、面向青少年的小型低壓活動。
 */
export type Activity = {
  /** 活動 ID */
  id: number;

  /**
   * 活動名稱（強調 vibe，不是專業或正式標題）
   * 例如："夕陽散步＋拍天空"
   */
  name: string;

  /**
   * 活動氛圍（vibe），例如：輕鬆、安靜、chill、小群體
   * e.g. ["輕鬆", "安靜", "小群體"]
   */
  vibe: string[];

  /**
   * 社交強度：
   * 0 = 幾乎不需說話（散步、拍照等同步活動）
   * 1 = 可選擇性小互動（簡短問候）
   * 2 = 輕度聊天（自然對話，但不強求）
   * 3 = 中度互動（需要討論、分享意見）
   * 4 = 高度互動（需合作、持續對話）
   */
  socialLevel: number;

  /**
   * 興趣標籤，例如：散步、手機攝影、插畫、野餐、觀景等
   */
  interests: string[];

  /**
   * 活動圖片，用於 UI 卡片
   */
  images: string[];

  /**
   * 主揪資訊（青少年較常使用暱稱、頭貼而非 email）
   */
  host: {
    /** 主揪暱稱 */
    nickname: string;
    /** 主揪頭貼（可選） */
    avatar?: string;
  };

  /**
   * 活動地點資訊（台南公園內的具體集合點）
   */
  location: {
    /** 地點名稱（例如："台南公園 - 燕湖畔"） */
    name: string;

    /** GPS 座標 */
    coordinates: {
      lat: number;
      lng: number;
    };

    /** 用於讓參與者提前認得集合點的地標圖（可選） */
    landmarkImage?: string;
  };

  /**
   * 活動人數（偏向小團體）
   */
  groupSize?: {
    /** 最少人數 */
    min: number;
    /** 最多人數 */
    max: number;
  };

  /**
   * 時間資訊（簡潔、直觀）
   */
  schedule: {
    /** 日期，例如 "2025-03-14" */
    date: string;
    /** 開始時間，例如 "17:30" */
    start: string;
    /** 結束時間（選填） */
    end?: string;
  };

  /**
   * 活動說明（短、溫柔、低壓的文案）
   */
  description: string;
};
