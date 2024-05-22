"use client";
import { useRouter } from "next-nprogress-bar";
import { DateTimePicker } from "@mui/x-date-pickers";

import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/rich-texteditor";

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

import { useAction } from "@/hooks/use-action";
import { createAssignment } from "@/actions/create-assignments";
import { CreateAssignment } from "@/actions/create-assignments/schema";
import { Loader } from "@/components/loader";

const CreateAssignmentPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  const { userId } = useAuth();

  const router = useRouter();
  const queryClient = useQueryClient();

  const { execute } = useAction(createAssignment, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["assignments", data.classId] });
      toast.success(`Tugas ${data.assignmentTitle} telah dibuat!`);
      router.push(`/u/c/${data.classId}/assignments/${data.assignmentId}`);
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

  const defaultValues: Partial<z.infer<typeof CreateAssignment>> = {
    taskTitle: "",
    taskDescription: undefined,
    dueDate: undefined,
  };

  const form = useForm<z.infer<typeof CreateAssignment>>({
    resolver: zodResolver(CreateAssignment),
    mode: "onSubmit",
    defaultValues,
  });

  function onSubmit(data: z.infer<typeof CreateAssignment>) {
    execute({
      classId: data.classId,
      taskTitle: data.taskTitle,
      taskDescription: data.taskDescription,
      dueDate: selectedDate?.toISOString(),
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center  h-[calc(100vh-10rem)]">
        <Loader />
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
            name="taskTitle"
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
            name="classId"
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
                                form.setValue("classId", c.value);
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
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <DateTimePicker
                  onChange={(selected) => {
                    setSelectedDate(selected);
                  }}
                  disablePast
                  label="Deadline (opsional)"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div role="input">
            <FormLabel>Tulis detail tugas</FormLabel>
            <div className="mt-1">
              <RichTextEditor onValueChange={(value) => form.setValue("taskDescription", value)} />
            </div>
          </div>
          <Button type="submit">Buat Tugas</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateAssignmentPage;
