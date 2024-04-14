"use client";
import { deleteClass } from "@/actions/delete-class";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import toast from "react-hot-toast";

export const SettingClass = ({ classId }: { classId: string }) => {
  const { execute, isLoading } = useAction(deleteClass, {
    onError(error) {
      toast.error(error);
    },
  });

  return (
    <div className="px-4">
      <Button
        disabled={isLoading}
        onClick={() => {
          execute({ id: classId });
        }}
        variant="destructive"
      >
        {isLoading ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};
