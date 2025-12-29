import { Check, CheckCircle2, Clock } from "lucide-react";

const getStatusButtons = (taskStatus) => {
    const buttons = [];

    if (taskStatus === "pending") {
      buttons.push({
        label: "Start",
        icon: Clock,
        status: "in_progress",
        color: "text-blue-600 hover:bg-blue-100",
      });
    }

    if (taskStatus === "in_progress") {
      buttons.push({
        label: "Done",
        icon: CheckCircle2,
        status: "done",
        color: "text-green-600 hover:bg-green-100",
      });
      buttons.push({
        label: "Pending",
        icon: Check,
        status: "pending",
        color: "text-yellow-600 hover:bg-yellow-100",
      });
    }

    if (taskStatus === "done") {
      buttons.push({
        label: "Reopen",
        icon: Clock,
        status: "in_progress",
        color: "text-blue-600 hover:bg-blue-100",
      });
    }

    return buttons;
  };

  export default getStatusButtons;