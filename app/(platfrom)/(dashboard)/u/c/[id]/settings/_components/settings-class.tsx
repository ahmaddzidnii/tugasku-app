"use client";
import { deleteClass } from "@/actions/delete-class";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const SettingClass = ({ classId }: { classId: string }) => {
  const router = useRouter();
  const { execute, isLoading } = useAction(deleteClass, {
    onSuccess(data) {
      if (data) {
        toast.success(`Kelas ${data.name} telah berhasil di hapus!`);
        router.replace("/u");
      }
    },
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
