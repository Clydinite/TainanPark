import { useState } from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';

type Notification = {
    id: number;
    type: 'comment' | 'join' | 'reminder' | 'system' | 'feedback';
    user?: string;
    avatar?: string;
    activity?: string;
    message?: string;
    time?: string;
    read?: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: 6,
        type: 'join',
        user: 'quietleaf',
        avatar: 'https://i.pravatar.cc/150?img=12',
        activity: '夕陽散步＋拍天空',
        message: '加入了你的活動',
        time: '10分鐘前',
        read: false,
    },
    {
        id: 7,
        type: 'reminder',
        activity: '夕陽散步＋拍天空',
        message: '活動將於 30 分鐘後開始，別忘了帶手機 📱',
        time: '30分鐘前',
        read: false,
    },
    {
        id: 8,
        type: 'comment',
        user: 'mildsky',
        avatar: 'https://i.pravatar.cc/150?img=18',
        activity: '草地靜靜塗鴉',
        message: '這個活動感覺好舒服，第一次參加也可以嗎？',
        time: '45分鐘前',
        read: false,
    },
    {
        id: 9,
        type: 'system',
        message: '你已成功更新個人檔案，這樣大家更容易認識你了！',
        time: '2小時前',
        read: true,
    },
    {
        id: 10,
        type: 'feedback',
        activity: '夕陽散步＋拍天空',
        message: '其他參加者覺得你是「安靜但讓人安心的同行者」🌤️',
        time: '4小時前',
        read: true,
    },
    {
        id: 11,
        type: 'join',
        user: 'slowmo',
        avatar: 'https://i.pravatar.cc/150?img=21',
        activity: '湖畔慢慢走',
        message: '加入了活動，目前人數 3 / 5',
        time: '昨天',
        read: true,
    },
    {
        id: 12,
        type: 'reminder',
        activity: '湖畔慢慢走',
        message: '明天天氣預測偏涼，適合散步，記得帶薄外套。',
        time: '昨天',
        read: true,
    },
    {
        id: 13,
        type: 'system',
        message: '有人收藏了你的活動「草地靜靜塗鴉」。',
        time: '2天前',
        read: true,
    },
    {
        id: 14,
        type: 'comment',
        user: 'papercloud',
        avatar: 'https://i.pravatar.cc/150?img=27',
        activity: '湖畔寫生',
        message: '我可能會晚到 5 分鐘，先跟大家說一下 🙏',
        time: '3天前',
        read: true,
    },
    {
        id: 15,
        type: 'system',
        message: '你最近參加的活動多為「低互動、安靜型」，已幫你調整推薦排序。',
        time: '3天前',
        read: true,
    },
];


function NotificationSettingsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="group">
                    <Settings className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>通知設定</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="new-comment" className="flex items-start flex-col gap-1">
                            <span>新留言</span>
                            <span className="text-xs text-gray-400">當有人在你的活動留言時通知你。</span>
                        </Label>
                        <Switch id="new-comment" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="new-joiner" className="flex items-start flex-col gap-1">
                            <span>新參加者</span>
                            <span className="text-xs text-gray-400">當有人加入你的活動時通知你。</span>
                        </Label>
                        <Switch id="new-joiner" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="activity-reminder" className="flex items-start flex-col gap-1">
                            <span>活動提醒</span>
                            <span className="text-xs text-gray-400">在活動開始前提醒你。</span>
                        </Label>
                        <Switch id="activity-reminder" defaultChecked />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const NotificationText = ({ notification }: { notification: typeof mockNotifications[0] }) => {
        switch (notification.type) {
            case 'comment':
                return (
                    <p>
                        在「{notification.activity}」底下留了一句話
                        <span className="text-white block mt-1">
                            {notification.message}
                        </span>
                    </p>
                );

            case 'join':
                return (
                    <p>
                        有人加入了你的活動
                        <span className="text-white block mt-1">
                            「{notification.activity}」
                        </span>
                    </p>
                );

            case 'reminder':
                return (
                    <p>
                        小提醒 🌤️
                        <span className="text-white block mt-1">
                            「{notification.activity}」{notification.time}
                        </span>
                    </p>
                );

            case 'feedback':
                return (
                    <p>
                        在「{notification.activity}」中，有人給了你一個回饋
                        <span className="text-white block mt-1">
                            {notification.message}
                        </span>
                    </p>
                );

            default:
                return (
                    <p className="text-white">
                        {notification.message}
                    </p>
                );
        }
    };


    return (
        <div className="p-6 max-w-screen-lg mx-auto z-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex justify-between mb-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
                            通知
                        </h1>
                        <p className="text-muted-foreground text-lg mt-4">
                            這是你最近的活動動態。
                        </p>
                    </div>
                    <NotificationSettingsDialog />
                </div>

                <div className="space-y-4">
                    {notifications.map(notification => (
                        <Card
                            key={notification.id}
                            className={clsx(
                                "bg-white/5 backdrop-blur-md border rounded-2xl shadow-xl p-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-white/10",
                                !notification.read ? "border-blue-500/30" : "border-white/10"
                            )}
                            onClick={() => markAsRead(notification.id)}
                        >
                            {!notification.read && <Badge variant="default" className="absolute top-2 right-2 z-10 bg-blue-500 text-white">New</Badge>}
                            <div className='flex items-start space-x-3'>
                                <Avatar className="w-8 h-8">
                                    <AvatarImage src={notification.avatar} />
                                    <AvatarFallback>{notification.user ? notification.user.slice(0, 2) : "!"}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="text-sm text-gray-400">
                                        <span className="font-semibold text-white">{notification.user || "系統通知"}</span>
                                        <NotificationText notification={notification} />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}