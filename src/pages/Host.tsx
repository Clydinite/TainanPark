import { useState } from "react";
import { motion } from "framer-motion";
import { allTags } from "@/lib/shared";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function HostActivityPage() {
  const [name, setName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState(3);
  const [imageUrl, setImageUrl] = useState("");
  const [schedule, setSchedule] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    const activityData = {
      name,
      tags: selectedTags,
      activityLevel,
      image: imageUrl,
      schedule,
      description,
    };

    console.log("Submitted activity:", activityData);
    // Replace this with your real submission logic
    alert(
      "😅 這是示範功能。活動提交尚未實作。"
    );
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* TITLE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
            發起活動
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            與社群分享您的活動。
          </p>
        </div>

        {/* FORM */}

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-0">
          <div>
            <Label className="m-2">活動名稱</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：走路、看夕陽"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="m-2 mb-3">標籤 (可選多個)</Label>
            <div className="flex overflow-clip gap-2 mt-2">
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
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <Label className="m-2">活動強度</Label>
              <div className="ml-auto text-muted-foreground text-xs">
                強度: {activityLevel} / 5
              </div>
            </div>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[activityLevel]}
              onValueChange={(v) => setActivityLevel(v[0])}
              className="my-4"
            />
          </div>

          <div>
            <Label className="m-2">圖片網址</Label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="貼上活動圖片連結"
              className="mt-1"
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="預覽圖"
                className="mt-3 w-32 h-48 object-cover rounded-xl shadow-inner"
              />
            )}
          </div>

          <div>
            <Label className="m-2">時間安排</Label>
            <Input
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              placeholder="例如：12/27 星期六上午 8:00"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="m-2">活動地點</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="例如：台南公園燕湖"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="m-2">活動說明</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="請告訴我們更多關於您的活動！"
              className="mt-1"
            />
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl text-lg py-6"
            >
              提交活動
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

