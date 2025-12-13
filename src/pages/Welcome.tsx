import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-[calc(100vh-72px)] items-center justify-center bg-glass bg-opacity-50 backdrop-blur-md rounded-2xl px-4"
    >
      <div className="flex flex-col items-center text-center max-w-5xl w-full -mt-10 md:mt-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          歡迎來到
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12">
          台南公園輕社交平台
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
          <Link to="/activities" className="w-full sm:w-auto">
            <Button
              variant="default"
              className="w-full sm:w-[15rem] h-[4rem] text-xl font-bold p-4 border border-white/10 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white hover:text-black"
            >
              探索活動
            </Button>
          </Link>
          <Link to="/host" className="w-full sm:w-auto">
            <Button
              variant="default"
              className="w-full sm:w-[15rem] h-[4rem] text-xl font-bold p-4 border border-white/10 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white hover:text-black"
            >
              發起活動
            </Button>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}
