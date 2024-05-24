"use client";

import { updateAssignment } from "@/actions/update-assignment";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import toast from "react-hot-toast";

export const ButtonMarkCompleted = ({
  assignmentId,
  isCompleted,
}: {
  assignmentId: string;
  isCompleted: boolean;
}) => {
  const { execute } = useAction(updateAssignment, {
    onSuccess(data) {
      toast.success(`Tugas ${data.assignmentTitle} selesai dikerjakan`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  return (
    <Button
      disabled={isCompleted}
      onClick={() => execute({ assignmentId, isCompleted: true })}
      title="Mark as completed"
    >
      Mark as completed
    </Button>
  );
};
