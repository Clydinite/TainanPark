import { mockActivities } from "@/pages/fakeActivities";

export const allTags = Array.from(
  new Set(mockActivities.flatMap((a) => [...a.vibe, ...a.interests]))
);

export const socialLevelDescriptions: Map<number, string> = new Map([
    [1, "幾乎不需說話"],
    [2, "可選擇性小互動"],
    [3, "輕度聊天"],
    [4, "中度互動"],
    [5, "高度互動"],
]);