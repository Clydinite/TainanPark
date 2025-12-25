import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Activity } from "@/types/global";
import { socialLevelDescriptions, verificationStatusTranslations } from "@/lib/shared";
import { MapPinIcon, CalendarIcon, SquareActivityIcon, MessageCircle, SendHorizontal } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export function ActivityCard(
  {
    activity,
    showStatus,
    stepper,
    renderAction
  }: {
    activity: Activity,
    showStatus?: boolean,
    stepper?: React.ReactNode
    renderAction?: React.ReactNode
  }) {
  const scheduleDate = new Date(activity.schedule.date);
  const formattedDate = `${scheduleDate.getMonth() + 1
    }月${scheduleDate.getDate()}日`;

  const statusVariantColor = {
    verified: "bg-green-600",
    pending: "bg-yellow-600",
    reviewing: "bg-blue-600",
  } as const;

  return (
    <Card className="group relative transition-transform overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl flex flex-col h-full py-0 gap-2">
      {showStatus && <Badge variant="default" className={"absolute top-2 right-2 z-10" + " " + statusVariantColor[activity.verificationStatus]} >{verificationStatusTranslations[activity.verificationStatus]}</Badge>}
      <img
        src={activity.images[0]}
        alt={activity.name}
        className="w-full h-48 object-cover aspect-video"
      />
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-xl text-white mb-3">{activity.name}</h3>
        <div className="text-xs text-gray-400 mb-5 flex flex-col items-start gap-1.5">
          <span className="flex items-center">
            <MapPinIcon className="inline-block h-[18px] w-[18px] mr-1.5" />
            {activity.location.name}
          </span>
          <span className="flex items-center">
            <CalendarIcon className="inline-block h-[18px] w-[18px] mr-1.5" />
            {formattedDate} {activity.schedule.start}
          </span>
          <span className="flex items-center">
            <SquareActivityIcon className="inline-block h-[18px] w-[18px] mr-1.5" />
            {socialLevelDescriptions.get(activity.socialLevel + 1)}
          </span>
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

          {activity.interests.map((interest) => (
            <span
              key={interest}
              className="bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded-md text-xs"
            >
              #{interest}
            </span>
          ))}
        </div>

        <div className="flex-grow" />
        <div className="border-t border-white/10 mt-2 pt-4 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-400">
            {activity.comments && activity.comments.length > 0 ? (
              <>
                <MessageCircle className="h-4 w-4 mr-2" />
                <span>{activity.comments.length} 則留言</span>
              </>
            ) : (
              <span className="text-gray-500">尚無留言</span>
            )}
          </div>
          <ActivityDetails activity={activity} stepper={stepper} renderAction={renderAction} />
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityDetails({ activity, stepper, renderAction }: { activity: Activity, stepper?: React.ReactNode, renderAction?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const trigger = (
    <Button
      variant="ghost"
      className="text-white hover:text-blue-400 p-0 h-auto"
      onClick={() => setOpen(true)}
    >
      查看更多 →
    </Button>
  );

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    alert(`(示範) 你的留言已送出：\n${newComment}`);
    setNewComment("");
  };

  const content = (
    <div className={`p-5 flex gap-6 ${isDesktop ? "flex-row" : "flex-col"}`}>
      <img
        src={activity.images[0]}
        alt={activity.name}
        className={`rounded-xl shadow-inner object-cover ${isDesktop ? "w-60 h-96" : "w-full h-64"}`}
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

        <div className="border-t border-dashed border-white/20 pt-4 space-y-4">
          {stepper && (
            <div>
              <h3 className="text-white/80 text-lg font-semibold">審核狀態</h3>
              <div className="my-10">{stepper}</div>
            </div>
          )}
        </div>

        <div className="border-t border-dashed border-white/20 pt-4 space-y-4">
          <h3 className="text-white/80 text-lg font-semibold">留言區</h3>
          {activity.comments && activity.comments.length > 0 && (
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2">
              {activity.comments.map((comment, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} alt={comment.handle} />
                    <AvatarFallback>{comment.handle.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {comment.handle}
                      {comment.handle === activity.host.nickname && (
                        <span className="ml-2 text-xs text-blue-300">(主揪)</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你的想法..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
            />
            <Button size="icon" variant="ghost" onClick={handleSendComment}>
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {renderAction ? renderAction : (
          <Button
            variant="default"
            className="w-full mt-4 mb-10"
            onClick={() => {
              alert("This is a demo. Participation functionality is not implemented yet.");
            }}
          >
            我要參加！
          </Button>
        )}
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
      // the ScrollArea fixed the issue of drawer not being scrollable on mobile
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="p-0 max-h-[90dvh]">
          <ScrollArea className="overflow-y-auto p-2">
            {content}
          </ScrollArea>
        </DrawerContent>
      </Drawer >
    );
  }
}