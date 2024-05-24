"use client";
import { useRouter } from "next-nprogress-bar";
import { DateTimePicker } from "@mui/x-date-pickers";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Assignment } from "@prisma/client";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/rich-texteditor";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useAction } from "@/hooks/use-action";
import { updateAssignment } from "@/actions/update-assignment";

interface EditAssignmentPageProps {
  data: Assignment;
}
const EditAssignmentPage = ({ data }: EditAssignmentPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { execute, isLoading } = useAction(updateAssignment, {
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["assignments", data.classId] });
      toast.success(`Tugas ${data.assignmentTitle} telah diperbarui!`);
      router.push(`/u/c/${data.classId}/assignments/${data.assignmentId}`);
    },
    onError(error) {
      toast.error(error);
    },
  });

  const schema = z.object({
    asignmentTitle: z.string(),
    asignmentDescription: z.string().optional(),
  });

  const defaultValues: Partial<z.infer<typeof schema>> = {
    asignmentTitle: data?.assignmentTitle || ("" as string),
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues,
  });

  function onSubmit(dataUpdate: z.infer<typeof schema>) {
    execute({
      assignmentId: data.assignmentId,
      assignmentTitle: dataUpdate.asignmentTitle,
      assignmentDescription: dataUpdate.asignmentDescription,
      dueDate: selectedDate?.toISOString(),
    });
  }
  return (
    <div className="space-y-5">
      <h1 className="font-bold text-xl">Buat Tugas</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="asignmentTitle"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Judul tugas</FormLabel>
                <Input
                  placeholder="Judul tugas"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div role="input">
            <FormItem className="flex flex-col">
              <DateTimePicker
                onChange={(selected) => {
                  setSelectedDate(selected);
                }}
                disablePast
                label="Deadline (opsional)"
                defaultValue={data.dueDate ? new Date(data.dueDate) : undefined}
              />
              <FormMessage />
            </FormItem>
          </div>
          <div role="input">
            <FormLabel>Tulis detail tugas</FormLabel>
            <div className="mt-1">
              <RichTextEditor
                onValueChange={(value) => form.setValue("asignmentDescription", value)}
                content={data.assignmentDescription as string}
              />
            </div>
          </div>
          <Button
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Update tugas"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditAssignmentPage;
