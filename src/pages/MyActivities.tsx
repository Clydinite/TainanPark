import { motion } from "framer-motion";
import { mockActivities } from "./fakeActivities";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { HelpCircle } from "lucide-react"; // Import HelpCircle for the info dialog
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog components
import { verificationSteps } from "@/lib/shared";

const statusToStep = (status: "pending" | "reviewing" | "verified"): number => {
  switch (status) {
    case "pending":
      return 1;
    case "reviewing":
      return 2;
    case "verified":
      return 3;
    default:
      return 1;
  }
};

// Moved StatusInfoDialog outside the component for reusability if needed elsewhere
function StatusInfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="group h-auto p-0 ml-2"> {/* Adjusted styling */}
          <HelpCircle className="h-4 w-4 text-gray-400 group-hover:text-blue-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h3 className="text-lg font-semibold mb-4">關於審核流程</h3>
        <p className="text-sm text-gray-300 mb-6">我們需要一點時間確認你的活動符合社群規範，確保每個人都能有安全、愉快的體驗。</p>
        {/* Placeholder for a stepper inside the dialog, similar to the main one */}
        <div className="flex justify-between items-start text-xs text-gray-400 space-x-2">
          {verificationSteps.map((stepName, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <span className="w-12 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">step {idx + 1}</span>
              <p className="mt-2 text-center text-sm font-medium text-white">{stepName}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default function MyActivitiesPage() {
  const myHostedActivities = mockActivities.slice(4, 7); // pending, reviewing, verified
  const myJoinedActivities = [mockActivities[3]];

  const StepperContent = ({ activityStatus }: { activityStatus: "pending" | "reviewing" | "verified" }) => (
    <div className="flex items-center"> {/* Flex container for stepper and info dialog */}
      <Stepper value={statusToStep(activityStatus)} className="flex-1 space-y-4"> {/* Stepper takes remaining space */}
        <StepperNav className="gap-3.5">
          {verificationSteps.map((stepName, index) => (
            <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
              <StepperTrigger className="flex flex-col items-start justify-center gap-1 grow">
                <StepperIndicator className="bg-border rounded-full h-1 w-full data-[state=active]:bg-primary"></StepperIndicator>
                <div className="flex flex-col items-start gap-1">
                  <StepperTitle className="text-start text-xs font-semibold group-data-[state=inactive]/step:text-muted-foreground">
                    {stepName}
                  </StepperTitle>
                </div>
              </StepperTrigger>
            </StepperItem>
          ))}
        </StepperNav>
      </Stepper>
      <StatusInfoDialog /> {/* Info dialog next to the stepper */}
    </div>
  );

  return (
    <div className="p-6 max-w-screen-lg mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
            我的活動
          </h1>
          <p className="text-muted-foreground text-lg mt-4 mb-6">
            管理你發起或參與的活動。
          </p>
        </div>

        <Accordion type="single" collapsible defaultValue="hosted-activities" className="w-full">
          <AccordionItem value="hosted-activities">
            <AccordionTrigger>
              <div className="flex items-center">
                我發起的活動 ({myHostedActivities.length})
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-6 grid-cols-1 pt-4">
                {myHostedActivities.length > 0 ? (
                  myHostedActivities.map((activity) => {
                    const stepperComponent = (
                      <div className="px-4">
                        <StepperContent activityStatus={activity.verificationStatus} />
                      </div>
                    );

                    return (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        showStatus={true}
                        stepper={stepperComponent}
                        renderAction={
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" className="w-full mt-4 mb-10">取消活動</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>確定要取消活動嗎？</AlertDialogTitle>
                                <AlertDialogDescription>
                                  取消活動後，所有已報名的成員都會收到通知。
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>再想想</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button variant="destructive" className="text-white" onClick={() => alert("活動已取消！")}>
                                    確定取消
                                  </Button>
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        }
                      />
                    )
                  })
                ) : (
                  <p className="col-span-full text-center text-gray-400 italic">
                    你還沒有發起任何活動。
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="joined-activities">
            <AccordionTrigger>我參與的活動 ({myJoinedActivities.length})</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-4">
                {myJoinedActivities.length > 0 ? (
                  myJoinedActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      renderAction={
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full mt-4 mb-10">取消參加</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>確定要取消參加嗎？</AlertDialogTitle>
                              <AlertDialogDescription>
                                取消參加後，若想再次加入，需要重新發送申請。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>再想想</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                  <Button variant="destructive" className="text-white" onClick={() => alert("活動已取消！")}>
                                    確定取消
                                  </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      }
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-400 italic">
                    你還沒有參與任何活動。
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>
    </div>
  );
}