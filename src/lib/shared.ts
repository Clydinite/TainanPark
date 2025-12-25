import { mockActivities } from "@/pages/fakeActivities";

export const allTags = Array.from(
  new Set(mockActivities.flatMap((a) => [...a.vibe, ...a.interests]))
);

export const socialLevelDescriptions = new Map([
  [1, "幾乎不需說話"],
  [2, "可選擇性小互動"],
  [3, "輕度聊天"],
  [4, "中度互動"],
  [5, "高度互動"],
]);

// TODO: this is a temporary solution
export const verificationSteps: string[] = [
  "收到計畫", "審核中", "已發佈"
]

export const verificationStatusTranslations: { [key: string]: string } = {
  pending: "收到計畫",
  reviewing: "審核中",
  verified: "已發佈",
};
