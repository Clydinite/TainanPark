import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mockActivities } from "./fakeActivities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";

const friends = [
  {
    name: "teamtaro",
    avatar: "https://i.pravatar.cc/150?img=5",
    metAt: "公園小隊挑戰",
    metAtId: mockActivities[0].id,
    notes: "上次的跳拍任務超好笑 😂",
  },
  {
    name: "skywalker",
    avatar: "https://i.pravatar.cc/150?img=32",
    metAt: "傍晚散步＋拍天空色調",
    metAtId: mockActivities[1].id,
    notes: "人很 chill，說下次可以一起去拍貓",
  },
];

interface ChatMessage {
  id: number;
  sender: "me" | "friend";
  text: string;
}

function ChatDialog({ friendName }: { friendName: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, sender: "friend", text: `嗨 ${friendName}！最近過得好嗎？` },
    { id: 2, sender: "me", text: "還不錯啊！你呢？" },
    { id: 3, sender: "friend", text: "我也很好！上次的活動很有趣呢！" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "me", text: newMessage }]);
      setNewMessage("");
      // Simulate friend's reply
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: prev.length + 1, sender: "friend", text: "哈哈，的確！有機會再一起玩！" }]);
      }, 1000);
    }
  };

  return (
    <DialogContent className="p-0">
      <DialogHeader className="p-4 border-b border-white/10">
        <DialogTitle>與 {friendName} 聊天</DialogTitle>
      </DialogHeader>
      <ScrollArea className="h-80 p-4">
        <div className="flex flex-col space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${msg.sender === "me"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center p-4 border-t border-white/10">
        <Input
          placeholder="輸入訊息..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 mr-2 bg-transparent"
        />
        <Button size="icon" onClick={handleSendMessage}>
          <SendHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </DialogContent>
  );
}

export default function FriendsPage() {
  return (
    <div className="p-6 max-w-screen-lg mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md mb-6">
            我的朋友
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            你在公園宇宙中認識的人。
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {friends.map(friend => (
            <Card key={friend.name} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{friend.name}</h3>
                  <p className="text-sm text-gray-400">
                    初次相遇於：{friend.metAt}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">關於 {friend.name} 的筆記:</h4>
                <Textarea
                  defaultValue={friend.notes}
                  placeholder={`關於 ${friend.name} 的一些筆記...`}
                  className="bg-transparent border-dashed text-gray-300"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">邀請參加活動</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>要邀請 {friend.name} 參加哪個活動？</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-60">
                      <div className="space-y-2 p-2">
                        {mockActivities.slice(0, 5).map(activity => (
                          <div key={activity.id} className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                            <div>
                              <p className="font-medium">{activity.name}</p>
                              <p className="text-xs text-gray-400">{activity.schedule.date} {activity.schedule.start}</p>
                            </div>
                            <Button size="sm" variant="secondary">邀請</Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">傳送訊息</Button>
                  </DialogTrigger>
                  <ChatDialog friendName={friend.name} />
                </Dialog>
              </div>
            </Card>
          ))}
        </div>

      </motion.div>
    </div>
  );
}
