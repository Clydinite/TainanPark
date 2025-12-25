import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { mockActivities } from "./fakeActivities";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { allTags } from "@/lib/shared";
import { ActivityCard } from "@/components/ActivityCard";
import { socialLevelDescriptions } from "@/lib/shared";

const dateFilters = [
  { id: "all", label: "不限" },
  { id: "today", label: "今天" },
  { id: "tomorrow", label: "明天" },
  { id: "weekend", label: "本週末" },
  { id: "next7days", label: "未來7天" },
];

function FilterPillGroup({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <label className="text-muted-foreground my-2">{title}</label>
      <ScrollArea className="w-full">
        <div className="flex space-x-2">
          {children}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [socialLevel, setSocialLevel] = useState([1, 5]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState("all");
  const [groupSize, setGroupSize] = useState([1, 20]);

  const filteredActivities = mockActivities.filter((activity) => {
    const nameMatch = activity.name.toLowerCase().includes(search.toLowerCase());
    // Social Level filter: maps slider 1-5 to data 0-4
    const levelMatch = (activity.socialLevel + 1) >= socialLevel[0] && (activity.socialLevel + 1) <= socialLevel[1];
    const activityTags = [...activity.vibe, ...activity.interests];
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => activityTags.includes(tag));

    const groupSizeMatch = (() => {
      if (!activity.groupSize) return true; // If activity has no size limit, it matches
      const [minFilter, maxFilter] = groupSize;
      // Check for overlap
      return Math.max(minFilter, activity.groupSize.min) <= Math.min(maxFilter, activity.groupSize.max);
    })();

    const dateMatch = (() => {
      if (selectedDateFilter === 'all') return true;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const activityDate = new Date(activity.schedule.date);
      if (selectedDateFilter === 'today') {
        return activityDate.getTime() === today.getTime();
      }
      if (selectedDateFilter === 'tomorrow') {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return activityDate.getTime() === tomorrow.getTime();
      }
      if (selectedDateFilter === 'weekend') {
        const dayOfWeek = today.getDay(); // 0=Sun, 6=Sat
        const saturday = new Date(today);
        saturday.setDate(today.getDate() + (6 - dayOfWeek) % 7);
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        return activityDate.getTime() === saturday.getTime() || activityDate.getTime() === sunday.getTime();
      }
      if (selectedDateFilter === 'next7days') {
        const next7days = new Date(today);
        next7days.setDate(today.getDate() + 7);
        return activityDate >= today && activityDate < next7days;
      }
      return true;
    })();

    const verificationMatch = activity.verificationStatus === 'verified';

    return nameMatch && levelMatch && tagsMatch && dateMatch && groupSizeMatch && verificationMatch;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="p-6 max-w-screen-lg mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
              探索活動
            </h1>
            <p className="text-muted-foreground text-lg mt-4 mb-6">
              在台南公園，找到一個你喜歡的活動吧！
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <div className="space-y-6 select-none sticky top-16">
              <Input
                placeholder="搜尋活動名稱..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl shadow-md"
              />

              <div className="flex flex-col">
                <label className="text-muted-foreground mb-4">
                  社交強度: {socialLevelDescriptions.get(socialLevel[0])} - {socialLevelDescriptions.get(socialLevel[1])}
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={socialLevel}
                  onValueChange={setSocialLevel}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-muted-foreground mb-4">
                  人數: {groupSize[0]} - {groupSize[1]} 人
                </label>
                <Slider
                  min={1}
                  max={20}
                  step={1}
                  value={groupSize}
                  onValueChange={setGroupSize}
                />
              </div>

              <FilterPillGroup title="時間">
                {dateFilters.map(filter => (
                  <Button key={filter.id} variant={selectedDateFilter === filter.id ? "default" : "outline"} className="rounded-full whitespace-nowrap" onClick={() => setSelectedDateFilter(filter.id)}>{filter.label}</Button>
                ))}
              </FilterPillGroup>

              <FilterPillGroup title="標籤">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="rounded-full whitespace-nowrap"
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}
                  </Button>
                ))}
              </FilterPillGroup>


            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <motion.div key={activity.id} layout>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ActivityCard activity={activity} />
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="col-span-full text-center text-gray-400 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                找不到符合條件的活動。
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}