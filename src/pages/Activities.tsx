import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { activities } from "./fakeActivities";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const tags = [
  "Relaxing",
  "Health",
  "Morning",
  "Sports",
  "Intense",
  "Afternoon",
  "Educational",
  "Walking",
  "Family",
  "All Day",
  "Nature",
  "Evening",
];

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="group hover:scale-[1.02] transition-transform overflow-hidden p-5 border border-white/10 bg-white/5 backdrop-blur-md rounded-2xl shadow-xl flex flex-row gap-4 sm:items-center">
      <img
        src={activity.image}
        alt={activity.name}
        className="w-32 h-48 object-cover rounded-xl shadow-inner"
      />
      <CardContent className="flex-1 space-y-2">
        <div className="font-semibold text-md md:text-lg text-white">
          {activity.name}
        </div>
        <div className="text-sm text-gray-400 flex flex-wrap gap-2">
          {activity.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-yellow-300">
          Activity Level: {activity.activityLevel}/5
        </div>
        <div className="text-xl font-bold text-green-400">
          {activity.schedule}
        </div>
        <ActivityDetails activity={activity} />
      </CardContent>
    </Card>
  );
}
function ActivityDetails({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const trigger = (
    <Button
      variant="ghost"
      className="text-white hover:text-blue-400 p-0 text-sm"
      onClick={() => setOpen(true)}
    >
      View more details →
    </Button>
  );

  const content = (
    <div className={`p-5 flex gap-6 ${isDesktop ? "flex-row" : "flex-col"}`}>
      {/* Image */}
      <img
        src={activity.image}
        alt={activity.name}
        className={`rounded-xl shadow-inner object-cover ${
          isDesktop ? "w-48 h-72" : "w-36 h-48 mx-auto"
        }`}
      />

      {/* Details */}
      <div className="flex-1 space-y-3">
        <div className="font-semibold text-xl md:text-2xl text-white">
          {activity.name}
        </div>

        <div className="text-sm text-gray-400">
          <span className="text-white/80">Tags:</span> {activity.tags.join(", ")}
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-white/80">Activity Level:</span>{" "}
          {activity.activityLevel}/5
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-white/80">Host Email:</span> {activity.hostEmail}
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-white/80">Schedule:</span> {activity.schedule}
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-white/80">Description:</span>{" "}
          {activity.description}
        </div>
        <div className="mt-5 mb-20 md:mb-0">
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              const email = activity.hostEmail;
              const subject = encodeURIComponent(
                `Inquiry about "${activity.name}"`
              );
              const body = encodeURIComponent(
                `Hi,\n\nI'm interested in joining your "${activity.name}" activity.\n\nThanks for your time.`
              );
              window.open(`mailto:${email}?subject=${subject}&body=${body}`);
            }}
          >
            Contact Host
          </Button>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="min-w-3xl rounded-xl max-w-5xl p-0">
          {content}
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="p-0">{content}</DrawerContent>
      </Drawer>
    );
  }
}

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [activityLevel, setActivityLevel] = useState([1, 5]);
  const [selectedTags, setSelectedTags] = useState<string[]>(tags);

  const filteredActivities = activities.filter((activity) => {
    const nameMatch = activity.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const levelMatch =
      activity.activityLevel >= activityLevel[0] &&
      activity.activityLevel <= activityLevel[1];
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => activity.tags.includes(tag));

    return nameMatch && levelMatch && tagsMatch;
  });

  return (
    <>
      <div className="p-6 max-w-screen-lg mx-auto z-10">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
              Find an Activity
            </h1>
            <p className="text-muted-foreground text-lg mt-4 mb-6">
              Discover and join activities happening in Tainan Park.
            </p>
          </div>

          {/* SEARCH & FILTERS + ACTIVITY CARDS */}
          <div className="flex flex-col gap-6 mb-6">
            {/* SIDEBAR: SEARCH & FILTERS */}
            <div className="space-y-4 select-none sticky top-16">
              <Input
                placeholder="Search by activity name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-xl shadow-md"
              />
              <div className="flex flex-col">
                <label className="text-muted-foreground my-2">
                  Activity Level: {activityLevel[0]} - {activityLevel[1]}
                </label>
                <Slider
                  min={1}
                  max={5}
                  step={1}
                  value={activityLevel}
                  onValueChange={setActivityLevel}
                />
              </div>
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center space-x-2 text-muted-foreground"
                  >
                    <Checkbox
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) =>
                        setSelectedTags(
                          checked
                            ? [...selectedTags, tag]
                            : selectedTags.filter((t) => t !== tag)
                        )
                      }
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACTIVITY CARDS */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity, idx) => (
                <motion.div key={activity.id ?? idx} layout>
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ActivityCard activity={activity} />
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.p
                className="col-span-full text-center text-gray-400 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No activities fit the search criteria.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

