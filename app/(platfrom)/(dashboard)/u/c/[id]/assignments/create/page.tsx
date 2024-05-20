"use client";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { RichTextEditor } from "@/components/rich-texteditor";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

import { FormSchema } from "@/components/modal/add-assignment/form-schema";
import { useAction } from "@/hooks/use-action";
import { createAssignment } from "@/actions/create-assignments";
import { useRouter } from "next-nprogress-bar";

const CreateAssignment = () => {
  const [richEditorValue, setRichEditorValue] = useState("");

  const { userId } = useAuth();

  const router = useRouter();

  const { execute } = useAction(createAssignment, {
    onSuccess: (data) => {
      toast.success(`Tugas ${data.taskTitle} telah dibuat!`);
      router.push(`/u/c/${data.classId}/assignments/${data.taskId}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      return axios
        .get("/api/v2/classes", {
          params: {
            userId,
          },
        })
        .then((res) => res.data);
    },
  });

  // This can come from your database or API.
  const defaultValues: Partial<z.infer<typeof FormSchema>> = {
    assignments_title: "",
    class_name: undefined,
    due: undefined,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({
      ...data,
      richEditorValue,
    });

    execute({
      classId: data.class_name,
      taskTitle: data.assignments_title,
      taskDescription: richEditorValue,
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center  h-[calc(100vh-10rem)]">
        <Loader2
          size={32}
          className="  animate-spin"
        />
      </div>
    );
  }
  const classes = Array.isArray(data.data)
    ? data.data.map((item: any) => ({ label: item.name, value: item.classId }))
    : [];

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
            name="assignments_title"
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

          <FormField
            control={form.control}
            name="class_name"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pilih kelas</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? classes.find((c: any) => c.value === field.value)?.label
                          : "Select class"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    side="top"
                    className="w-[300px] p-0"
                  >
                    <Command>
                      <CommandInput placeholder="Search kelas..." />
                      <CommandEmpty>No class found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {classes.map((c: any) => (
                            <CommandItem
                              value={c.label}
                              key={c.value}
                              onSelect={() => {
                                form.setValue("class_name", c.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  c.value === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {c.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="due"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <DateTimePicker
                  onChange={(selected) => {
                    form.setValue("due", selected);
                  }}
                  label="Deadline (opsional)"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div role="input">
            <FormLabel>Tulis detail tugas</FormLabel>
            <div className="mt-1">
              <RichTextEditor onValueChange={(value) => setRichEditorValue(value)} />
            </div>
          </div>
          <Button type="submit">Buat Tugas</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAssignment;
