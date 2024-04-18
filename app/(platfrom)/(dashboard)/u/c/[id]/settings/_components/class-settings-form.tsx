"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "@/hooks/use-action";
import { updateClass } from "@/actions/update-class";

const profileFormSchema = z.object({
  className: z.string().min(2, {
    message: "Nama kelas minimal 2 karakter.",
  }),
  nameTeacher: z.string({
    required_error: "Please select an email to display.",
  }),

  descriptionClass: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ClassSettingsForm({ detailClass }: { detailClass: any }) {
  const { execute, isLoading } = useAction(updateClass, {
    onSuccess(data) {
      toast.success(`Kelas ${data.name} telah diperbarui!`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    descriptionClass: detailClass.description,
    className: detailClass.name,
    nameTeacher: detailClass.teacherName,
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    execute({
      classId: detailClass.classId,
      name: data.className,
      teacherName: data.nameTeacher,
      description: data.descriptionClass,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="className"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kelas</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nama kelas.."
                  required
                  {...field}
                />
              </FormControl>
              <FormDescription>Ini adalah nama kelas yang akan ditampilkan.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nameTeacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Dosen / Guru</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nama pengajar.."
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptionClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Kelas</FormLabel>
              <FormControl>
                <TextareaAutosize
                  placeholder="Deskripsikan Kelas kamu..."
                  {...field}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Memperbarui.." : "Perbarui kelas"}
        </Button>
      </form>
    </Form>
  );
}
