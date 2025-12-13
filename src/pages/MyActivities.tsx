import { motion } from "framer-motion";
import { mockActivities } from "./fakeActivities";
import { ActivityCard } from "@/components/ActivityCard";

export default function MyActivitiesPage() {
  // For demonstration, we'll just show the first activity as a "hosted" one.
  const myHostedActivities = [mockActivities[0]];

  return (
    <div className="p-6 max-w-screen-lg mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
            我發起的活動
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            管理你發起或參與的活動。
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {myHostedActivities.length > 0 ? (
            myHostedActivities.map((activity) => (
              <motion.div
                key={activity.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ActivityCard activity={activity} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 italic">
              你還沒有發起任何活動。
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
