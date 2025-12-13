import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Activity } from "@/types/global";
import { socialLevelDescriptions } from "@/lib/shared";


export function ActivityCard({ activity }: { activity: Activity }) {
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
          <span> 🗫 {socialLevelDescriptions.get(activity.socialLevel)}</span>
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

export function ActivityDetails({ activity }: { activity: Activity }) {
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
