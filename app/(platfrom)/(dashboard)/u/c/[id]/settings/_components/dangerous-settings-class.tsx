"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { deleteClass } from "@/actions/delete-class";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";

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
import { archiveClass } from "@/actions/archive-class";

export const DangerousSettingsClass = ({ detailClass }: { detailClass: any }) => {
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
  const { execute: executeArchive, isLoading: isLoadingArchive } = useAction(archiveClass, {
    onSuccess(data) {
      if (data) {
        toast.success(
          `Kelas ${data.name} telah berhasil di${data.isArchived ? "arsipkan" : "tampilkan"}!`
        );
      }
    },
    onError(error) {
      toast.error(error);
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between sm:items-center flex-col sm:flex-row">
        {detailClass.isArchived ? (
          <>
            <h1 className="text-base mb-4 sm:mb-0 line-clamp-1 flex-1">Tampilkan kelas</h1>
            <Button
              className="sm:w-1/4"
              variant="outline"
              disabled={isLoadingArchive}
              onClick={() => {
                executeArchive({ classId: detailClass.classId, isArchive: false });
              }}
            >
              Jangan Arsipkan kelas
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-base mb-4 sm:mb-0 line-clamp-1 flex-1">Arsipkan kelas</h1>
            <Button
              className="sm:w-1/4"
              variant="outline"
              disabled={isLoadingArchive}
              onClick={() => {
                executeArchive({ classId: detailClass.classId, isArchive: true });
              }}
            >
              Arsipkan kelas
            </Button>
          </>
        )}
      </div>
      <div className="flex justify-between sm:items-center flex-col sm:flex-row">
        <h1 className="text-base mb-4 sm:mb-0 line-clamp-1 flex-1">Hapus kelas secara permanen</h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="sm:w-1/4"
            >
              Hapus kelas
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>Aksi ini tidak dapat dikembalikan</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    execute({ id: detailClass.classId });
                  }}
                  variant="destructive"
                >
                  {isLoading ? "Menghapus kelas..." : "Hapus kelas"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
