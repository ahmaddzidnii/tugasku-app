"use client";

import { useModal } from "@/hooks/use-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { createClass } from "@/actions/create-class";

export const ModalAddClass = () => {
  const { isOpen, modalName, onClose } = useModal();
  const { execute } = useAction(createClass, {
    onSuccess(data) {
      console.log(data);
      onClose();
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const nameClass = formData.get("name-class") as string;
    const nameTeacher = formData.get("name-teacher") as string;
    const descriptionClass = formData.get("description-class") as string;
    execute({ name: nameClass, teacherName: nameTeacher, description: descriptionClass });
  };
  return (
    <Dialog
      open={isOpen && modalName === "ADD_CLASS"}
      onOpenChange={onClose}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Buat kelas</DialogTitle>
          <form action={handleSubmit}>
            <FormInput
              id="name-class"
              label="Nama kelas"
              placeholder="Informatika"
              required
            />
            <FormInput
              id="name-teacher"
              label="Nama Guru/Dosen"
              placeholder="Nama dosen"
              required
            />
            <FormTextarea
              id="description-class"
              label="Deskripsi kelas"
              placeholder="Deskripsi kelas"
            />
            <FormSubmit className="mt-5 w-full">Buat kelas</FormSubmit>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};