import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  initialName?: string;
  initialAge?: string;
  initialSchool?: string;
  initialSocialMedia?: string;
  initialProfilePicture?: string;
}

export default function Profile({
  initialName = "",
  initialAge = "",
  initialSchool = "",
  initialSocialMedia = "",
  initialProfilePicture = "/vite.svg", // Default placeholder
}: ProfileProps) {
  const [name, setName] = useState(initialName);
  const [age, setAge] = useState(initialAge);
  const [school, setSchool] = useState(initialSchool);
  const [socialMedia, setSocialMedia] = useState(initialSocialMedia);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);

  const isFilled = initialName !== "" || initialSocialMedia !== ""; // Simple check if it's a demo profile

  return (
    <div className="p-6 max-w-screen-md mx-auto z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-center drop-shadow-md">
              {isFilled ? "個人檔案" : "建立個人檔案"} {/* Profile / Create Profile */}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profilePicture} alt="個人照片" /> {/* Profile Picture */}
                <AvatarFallback>TP</AvatarFallback>
              </Avatar>
              {isFilled && (
                <Label className="text-muted-foreground text-sm">
                  點擊照片上傳新圖片 {/* Click to upload new image */}
                  <Input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setProfilePicture(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  />
                </Label>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="m-2">
                  姓名 {/* Name */}
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="輸入您的姓名" // Enter your name
                  className="mt-1"
                  readOnly={isFilled}
                />
              </div>

              <div>
                <Label htmlFor="age" className="m-2">
                  年齡 {/* Age */}
                </Label>
                <Input
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="輸入您的年齡" // Enter your age
                  className="mt-1"
                  readOnly={isFilled}
                />
              </div>

              <div>
                <Label htmlFor="school" className="m-2">
                  學校 {/* School */}
                </Label>
                <Input
                  id="school"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="輸入您的學校" // Enter your school
                  className="mt-1"
                  readOnly={isFilled}
                />
              </div>

              <div>
                <Label htmlFor="socialMedia" className="m-2">
                  社群媒體帳號 {/* Social Media Handle */}
                </Label>
                <Input
                  id="socialMedia"
                  value={socialMedia}
                  onChange={(e) => setSocialMedia(e.target.value)}
                  placeholder="輸入您的社群媒體帳號" // Enter your social media handle
                  className="mt-1"
                  readOnly={isFilled}
                />
              </div>
            </div>

            {!isFilled && (
              <div className="pt-4">
                <Button className="w-full rounded-xl text-lg py-6">
                  儲存個人檔案 {/* Save Profile */}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
