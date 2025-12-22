import { motion } from "framer-motion";
import { mockActivities } from "./fakeActivities";
import { ActivityCard, ActivityDetails } from "@/components/ActivityCard";
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
    StepperItem,
    StepperNav,
    StepperSeparator,
} from "@/components/ui/stepper";
import { FileCheck, FileClock, FileText, Check } from "lucide-react";


const verificationSteps = [
  { title: "收到計畫", icon: FileText },
  { title: "審核中", icon: FileClock },
  { title: "已驗證", icon: FileCheck },
];

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


export default function MyActivitiesPage() {
  const myHostedActivities = mockActivities.slice(0, 3); // pending, reviewing, verified
  const myJoinedActivities = [mockActivities[3]]; 

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
                        <Stepper
                            value={statusToStep(activity.verificationStatus)}
                            indicators={{ completed: <Check className="size-4" /> }}
                            className="space-y-4"
                        >
                            <StepperNav className="gap-3">
                                {verificationSteps.map((step, index) => (
                                    <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
                                        <div className="flex flex-col items-start justify-center gap-2.5 grow">
                                            <div className="size-8 border-2 flex items-center justify-center rounded-full data-[state=completed]:text-white data-[state=completed]:bg-green-500 data-[state=inactive]:bg-transparent data-[state=inactive]:border-border data-[state=inactive]:text-muted-foreground">
                                                <step.icon className="size-4" />
                                            </div>
                                            <p className="text-xs font-semibold text-center group-data-[state=inactive]/step:text-muted-foreground">
                                                {step.title}
                                            </p>
                                        </div>
                                        {verificationSteps.length > index + 1 && (
                                            <StepperSeparator className="absolute top-4 inset-x-0 start-9 m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none  group-data-[state=completed]/step:bg-green-500" />
                                        )}
                                    </StepperItem>
                                ))}
                            </StepperNav>
                        </Stepper>
                    );
                    return (
                      <ActivityCard 
                        key={activity.id}
                        activity={activity}
                        showStatus={true}
                        stepper={stepperComponent}
                        renderAction={<ActivityDetails activity={activity} stepper={stepperComponent} />}
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
                            <Button variant="destructive">取消參加</Button>
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
                              <AlertDialogAction onClick={() => alert("已為您取消！")}>確定取消</AlertDialogAction>
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