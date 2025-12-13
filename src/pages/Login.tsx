import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const next = params.get("next") || "/";

  const handleLogin = () => {
    // pretend login
    navigate(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6 -mt-10 md:mt-0"
    >
      <Card className="w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">
          使用 Google 帳號登入
        </h1>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-white/10 bg-white/10 text-white hover:bg-white/20"
            onClick={() =>
              alert(
                "😅 這是示範功能。Google 登入尚未實作。"
              )
            }
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            使用 Google 登入
          </Button>

          <Button
            variant="ghost"
            className="w-full text-sm text-white/70 hover:text-white"
            onClick={handleLogin}
          >
            暫時跳過 (僅供示範)
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
