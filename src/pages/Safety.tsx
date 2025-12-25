import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Siren, Clock, XCircle } from "lucide-react";

export default function SafetyPage() {
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
            安全與導航
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            確保您在公園裡的安全與舒適。
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-0">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" /> 公園安全地圖
          </h3>
          <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
            {/* Mock Map */}
            <p>地圖載入中...</p>
          </div>
          <div className="space-y-2 text-sm text-gray-300">
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
              <li>綠色區域為安全照明區。</li>
              <li>紅色標記為緊急求助電話。</li>
              <li>藍色標記為公共洗手間。</li>
            </ul>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-0">
          <h3 className="font-semibold text-lg flex items-center">
            <Siren className="w-5 h-5" /> 緊急應變指南
          </h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-white">【快速脫身指南】</p>
              <p className="text-sm my-4">
                如果感到不適，可以這樣禮貌地離開活動：
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
                <li>「我突然想到家裡有事，得先走一步。」</li>
                <li>「我突然有點頭暈，想找個地方休息。」</li>
                <li>「謝謝你們，我今天玩得很開心，但體力快用完了！」</li>
              </ul>
            </div>
            <Button variant="destructive" className="w-full flex items-center gap-2">
              <XCircle className="w-5 h-5" /> 舉報問題
            </Button>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-0">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" /> 公園開放時間與規則
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-300">
            <li>開放時間：每日 08:00 - 20:00 (部分區域可能因維護而調整)</li>
            <li>禁止餵食野生動物。</li>
            <li>禁止隨地丟棄垃圾，共同維護環境整潔。</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
