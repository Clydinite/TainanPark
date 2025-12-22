import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { UserPen, Eye, Users, Lock, Music, BatteryMedium, MessageSquarePlus, PlusCircle, XCircle } from "lucide-react";

interface ProfileProps {
  initialName?: string;
  initialAge?: string;
  initialSchool?: string;
  initialSocialMedia?: string;
  initialProfilePicture?: string;
  initialBio?: string;
  initialCurrentObsession?: string;
  initialSocialBattery?: number;
  initialAskMeAboutTags?: string[];
  initialPersonalitySliders?: {
    socialEnergy: number;
    talkativeness: number;
    activityPace: number;
    participationStyle: number;
    planningPreference: number;
  };
}

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
  </svg>
);

const visibilityOptions = [
  { id: "public", label: "公開", icon: <Eye className="w-4 h-4 mr-2" /> },
  { id: "joined", label: "加入活動後", icon: <Users className="w-4 h-4 mr-2" /> },
  { id: "private", label: "僅自己可見", icon: <Lock className="w-4 h-4 mr-2" /> }
]

function VisibilityDropdown({ level, setLevel, isReadonly }: { level: number, setLevel: (level: number) => void, isReadonly: boolean }) {
  if (isReadonly) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        {visibilityOptions[level].icon}
        <span>{visibilityOptions[level].label}</span>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-sm text-gray-400">
          {visibilityOptions[level].icon}
          <span>{visibilityOptions[level].label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {visibilityOptions.map((option, index) => (
          <DropdownMenuItem key={option.id} onClick={() => setLevel(index)}>
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Profile({
  initialName = "",
  initialAge = "",
  initialSchool = "",
  initialSocialMedia = "",
  initialProfilePicture = "",
  initialBio = "",
  initialCurrentObsession = "",
  initialSocialBattery = 50,
  initialAskMeAboutTags = [],
  initialPersonalitySliders = {
    socialEnergy: 50,
    talkativeness: 50,
    activityPace: 50,
    participationStyle: 50,
    planningPreference: 50,
  }
}: ProfileProps) {
  const isFilled = !!initialName;

  const [name, setName] = useState(initialName);
  const [age, setAge] = useState(initialAge);
  const [school, setSchool] = useState(initialSchool);
  const [socialMedia, setSocialMedia] = useState(initialSocialMedia);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [bio, setBio] = useState(initialBio);
  const [currentObsession, setCurrentObsession] = useState(initialCurrentObsession);
  const [socialBattery, setSocialBattery] = useState([initialSocialBattery]);
  const [askMeAboutInput, setAskMeAboutInput] = useState('');
  const [askMeAboutTags, setAskMeAboutTags] = useState(initialAskMeAboutTags);

  const [ageVisibility, setAgeVisibility] = useState(1);
  const [schoolVisibility, setSchoolVisibility] = useState(1);
  const [igVisibility, setIgVisibility] = useState(2);

  const handleAddTag = () => {
    if (askMeAboutInput.trim() && !askMeAboutTags.includes(askMeAboutInput.trim())) {
      setAskMeAboutTags([...askMeAboutTags, askMeAboutInput.trim()]);
      setAskMeAboutInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setAskMeAboutTags(askMeAboutTags.filter(tag => tag !== tagToRemove));
  };


  return (
    <div className="p-6 max-w-screen-md mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md mb-6">
            {isFilled ? "個人檔案" : "建立個人檔案"}
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            {isFilled ? "這就是你，在公園宇宙的模樣。" : "跟大家介紹一下自己吧！"}
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-40 h-40">
              <AvatarImage src={profilePicture} alt="個人照片" />
              <AvatarFallback className="bg-transparent border-2 border-dashed">
                <UserPen className="w-15 h-15 text-white bg-transparent" />
              </AvatarFallback>
            </Avatar>
            <Button className="w-9/12" variant="outline" asChild disabled={isFilled}>
              <label>
                {isFilled ? "更改照片" : "上傳圖片"}
                <Input type="file" className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfilePicture(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  disabled={isFilled}
                />
              </label>
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="m-2">姓名</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="你的名字" className="mt-1" readOnly={isFilled} />
            </div>

            <div>
              <Label htmlFor="age" className="m-2">年齡</Label>
              <div className="relative mt-1">
                <Input id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="你的年齡" className="mt-1 flex-1 pr-24" readOnly={isFilled} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <VisibilityDropdown level={ageVisibility} setLevel={setAgeVisibility} isReadonly={isFilled} />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="school" className="m-2">學校</Label>
              <div className="relative mt-1">
                <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="你就讀的學校" className="mt-1 flex-1 pr-24" readOnly={isFilled} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <VisibilityDropdown level={schoolVisibility} setLevel={setSchoolVisibility} isReadonly={isFilled} />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="socialMedia" className="m-2">Instagram</Label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <InstagramIcon />
                </div>
                <Input id="socialMedia" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} placeholder="你的 Instagram 帳號" className="pl-10 pr-24" readOnly={isFilled} />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <VisibilityDropdown level={igVisibility} setLevel={setIgVisibility} isReadonly={isFilled} />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="m-2">個人簡介</Label>
              <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="跟大家介紹一下自己吧！" className="mt-1" readOnly={isFilled} />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">
          <h3 className="font-semibold text-lg">個性風格</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>獨處充電</span>
                <span>和人互動充電</span>
              </div>
              <Slider defaultValue={[initialPersonalitySliders.socialEnergy]} max={100} step={1} disabled={isFilled} />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>比較常聽</span>
                <span>比較常說</span>
              </div>
              <Slider defaultValue={[initialPersonalitySliders.talkativeness]} max={100} step={1} disabled={isFilled} />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>慢節奏</span>
                <span>快節奏</span>
              </div>
              <Slider defaultValue={[initialPersonalitySliders.activityPace]} max={100} step={1} disabled={isFilled} />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>偏觀察</span>
                <span>偏主動</span>
              </div>
              <Slider defaultValue={[initialPersonalitySliders.participationStyle]} max={100} step={1} disabled={isFilled} />
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>隨性即興</span>
                <span>事先規劃</span>
              </div>
              <Slider defaultValue={[initialPersonalitySliders.planningPreference]} max={100} step={1} disabled={isFilled} />
            </div>
          </div>
        </Card>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">
          <h3 className="font-semibold text-lg">更多關於我</h3>
          <div className="space-y-6">
            <div>
              <Label htmlFor="currentObsession" className="m-2 flex items-center gap-2"><Music className="w-5 h-5 text-gray-400" /> 最近在聽：</Label>
              <Input id="currentObsession" value={currentObsession} onChange={(e) => setCurrentObsession(e.target.value)} className="mt-1" readOnly={isFilled} />
            </div>
            <div>
              <Label htmlFor="socialBattery" className="m-2 flex items-center gap-2"><BatteryMedium className="w-5 h-5 text-gray-400" /> 社交電池：</Label>
              <Slider id="socialBattery" value={socialBattery} onValueChange={setSocialBattery} max={100} step={1} disabled={isFilled} className="mt-3" />
            </div>
            <div>
              <Label className="m-2 flex items-center gap-2"><MessageSquarePlus className="w-5 h-5 text-gray-400" /> 可以問我：</Label>
              <div className="flex flex-wrap gap-2 flex-1 mt-2">
                {askMeAboutTags.map((tag) => (
                  <Badge key={tag} variant="outline" className={isFilled ? "" : "cursor-pointer"} onClick={() => !isFilled && handleRemoveTag(tag)}>
                    #{tag} {!isFilled && <XCircle className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
              {!isFilled && (
                <div className="flex gap-2 w-full mt-2">
                  <Input
                    placeholder="新增話題"
                    value={askMeAboutInput}
                    onChange={(e) => setAskMeAboutInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleAddTag}>
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>

        {!isFilled && (
          <div className="pt-4">
            <Button className="w-full rounded-xl text-lg py-6">
              儲存個人檔案
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
