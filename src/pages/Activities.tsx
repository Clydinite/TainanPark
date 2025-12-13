import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { mockActivities } from "./fakeActivities";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import type { Activity } from "@/types/global";

const allTags = Array.from(
  new Set(mockActivities.flatMap((a) => [...a.vibe, ...a.interests]))
);

const dateFilters = [
  { id: "all", label: "不限" },
  { id: "today", label: "今天" },
  { id: "tomorrow", label: "明天" },
  { id: "weekend", label: "本週末" },
  { id: "next7days", label: "未來7天" },
];

const socialLevelDescriptions: string[] = [
  "幾乎不需說話",
  "可選擇性小互動",
  "輕度聊天",
  "中度互動",
  "高度互動",
];

function ActivityCard({ activity }: { activity: Activity }) {
  const scheduleDate = new Date(activity.schedule.date);
  const formattedDate = `${
    scheduleDate.getMonth() + 1
  }月${scheduleDate.getDate()}日`;

  return (
    <Card className="group transition-transform overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl flex flex-col h-full">
      <img
        src={activity.images[0]}
        alt={activity.name}
        className="w-full h-48 object-cover aspect-video"
      />
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg text-white mb-2">{activity.name}</h3>
        <div className="text-xs text-gray-400 mb-3 flex flex-col items-start gap-2">
          <span>📍 {activity.location.name}</span>
          <span>🗓️ {formattedDate} {activity.schedule.start}</span>
          <span> 🗫 {socialLevelDescriptions[activity.socialLevel]}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {activity.vibe.map((v) => (
            <span
              key={v}
              className="bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-md text-xs"
            >
              #{v}
            </span>
          ))}
        </div>
        <div className="flex-grow" />
        <div className="flex justify-between items-center mt-auto">
           <ActivityDetails activity={activity} />
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityDetails({ activity }: { activity: Activity }) {
    // This component remains the same as the last correct version
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
  
    const trigger = (
      <Button
        variant="ghost"
        className="text-white hover:text-blue-400 p-0 text-sm"
        onClick={() => setOpen(true)}
      >
        查看更多 →
      </Button>
    );
  
    const content = (
      <div className={`p-5 flex gap-6 ${isDesktop ? "flex-row" : "flex-col"}`}>
        <img
          src={activity.images[0]}
          alt={activity.name}
          className={`rounded-xl shadow-inner object-cover ${
            isDesktop ? "w-60 h-96" : "w-full h-64"
          }`}
        />
  
        <div className="flex-1 space-y-4">
          <h2 className="font-semibold text-2xl md:text-3xl text-white">
            {activity.name}
          </h2>
  
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={activity.host.avatar} alt={activity.host.nickname} />
              <AvatarFallback>{activity.host.nickname.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-md text-gray-300">
              主揪: {activity.host.nickname}
            </span>
          </div>
  
          <p className="text-gray-300">{activity.description}</p>
  
          <div className="space-y-2 text-sm">
            <p><span className="text-white/80">時間:</span> {activity.schedule.date} {activity.schedule.start}{activity.schedule.end ? ` - ${activity.schedule.end}` : ""}</p>
            <p><span className="text-white/80">地點:</span> <a href={`https://www.google.com/maps/search/?api=1&query=${activity.location.coordinates.lat},${activity.location.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{activity.location.name}</a></p>
            {activity.groupSize && <p><span className="text-white/80">人數:</span> {activity.groupSize.min} - {activity.groupSize.max} 人</p>}
          </div>
  
          <div>
            <h3 className="text-white/80 mb-2">氛圍</h3>
            <div className="flex flex-wrap gap-2">
              {activity.vibe.map(vibe => <span key={vibe} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">#{vibe}</span>)}
            </div>
          </div>
  
          <div>
            <h3 className="text-white/80 mb-2">興趣</h3>
            <div className="flex flex-wrap gap-2">
              {activity.interests.map(interest => <span key={interest} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs">#{interest}</span>)}
            </div>
          </div>
        </div>
      </div>
    );
  
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="min-w-3xl rounded-xl max-w-5xl p-0">
            {content}
          </DialogContent>
        </Dialog>
      );
    } else {
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent className="p-0">{content}</DrawerContent>
        </Drawer>
      );
    }
}


function FilterPillGroup({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <label className="text-muted-foreground my-2">{title}</label>
            <ScrollArea className="w-full pb-4">
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

    return nameMatch && levelMatch && tagsMatch && dateMatch && groupSizeMatch;
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
              尋找活動
            </h1>
            <p className="text-muted-foreground text-lg mt-4 mb-6">
              在台南公園，發現或發起一個無壓力的活動。
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
                <label className="text-muted-foreground my-2">
                  社交強度: {socialLevel[0]} - {socialLevel[1]}
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={socialLevel}
                  onValueChange={setSocialLevel}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                    {socialLevelDescriptions.map(desc => <span key={desc} className="w-1/5 text-center">{desc}</span>)}
                </div>
              </div>

                <FilterPillGroup title="時間">
                    {dateFilters.map(filter => (
                         <Button key={filter.id} variant="outline" className={clsx("rounded-full whitespace-nowrap", { "bg-blue-500/20 border-blue-500 text-white": selectedDateFilter === filter.id })} onClick={() => setSelectedDateFilter(filter.id)}>{filter.label}</Button>
                    ))}
                </FilterPillGroup>
                
                <FilterPillGroup title="標籤">
                    {allTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        className={clsx("rounded-full whitespace-nowrap", {
                          "bg-blue-500/20 border-blue-500 text-white": selectedTags.includes(tag),
                        })}
                        onClick={() => handleTagClick(tag)}
                      >
                        #{tag}
                      </Button>
                    ))}
                </FilterPillGroup>
                
              <div className="flex flex-col">
                <label className="text-muted-foreground my-2">
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
