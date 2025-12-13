import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ProfileProps {
  initialName?: string;
  initialAge?: string;
  initialSchool?: string;
  initialSocialMedia?: string;
  initialProfilePicture?: string;
  initialBio?: string;
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


export default function Profile({
  initialName = "",
  initialAge = "",
  initialSchool = "",
  initialSocialMedia = "",
  initialProfilePicture = "",
  initialBio = "",
}: ProfileProps) {
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState(initialAge);
  const [school, setSchool] = useState(initialSchool);
  const [socialMedia, setSocialMedia] = useState(initialSocialMedia);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [bio, setBio] = useState(initialBio);

  const isFilled = initialName !== "" || initialSocialMedia !== ""; // Simple check if it's a demo profile

  return (
    <div className="p-6 max-w-screen-md mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md mb-6">
            {isFilled ? "個人檔案" : "建立個人檔案"}
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            跟大家介紹一下自己吧！
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-0">
          <div>
            <Label className="m-2">個人照片</Label>
            <div className="mt-2 flex flex-col items-center gap-4">
              <Avatar className="w-40 h-40">
                <AvatarImage src={profilePicture || "/vite.svg"} alt="個人照片" />
                <AvatarFallback>TP</AvatarFallback>
              </Avatar>
              <Button className="w-9/12" variant="outline" asChild>
                <label>
                  上傳圖片
                  <Input type="file" className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfilePicture(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </label>
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="m-2">姓名</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="你的名字" className="mt-1" readOnly={isFilled} />
          </div>

          <div>
            <Label htmlFor="age" className="m-2">年齡</Label>
            <Input id="age" value={age} onChange={(e) => setAge(e.target.value)} placeholder="你的年齡" className="mt-1" readOnly={isFilled} />
          </div>

          <div>
            <Label htmlFor="school" className="m-2">學校</Label>
            <Input id="school" value={school} onChange={(e) => setSchool(e.target.value)} placeholder="你就讀的學校" className="mt-1" readOnly={isFilled} />
          </div>

          <div>
            <Label htmlFor="socialMedia" className="m-2">Instagram</Label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <InstagramIcon />
              </div>
              <Input id="socialMedia" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} placeholder="你的 Instagram 帳號" className="pl-10" readOnly={isFilled} />
            </div>
          </div>

          <div>
            <Label htmlFor="bio" className="m-2">個人簡介</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="跟大家介紹一下自己吧！" className="mt-1" readOnly={isFilled} />
          </div>




          {!isFilled && (
            <div className="pt-4">
              <Button className="w-full rounded-xl text-lg py-6">
                儲存個人檔案
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

