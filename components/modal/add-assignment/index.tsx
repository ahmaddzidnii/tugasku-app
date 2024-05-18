"use client";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { RichTextEditor } from "@/components/rich-texteditor";
import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

import { FormSchema } from "./form-schema";

export const ModalAddAssignment = () => {
  const { isOpen, modalName, onClose } = useModal();
  const [richEditorValue, setRichEditorValue] = useState("");

  const { userId } = useAuth();

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
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const classes = Array.isArray(data.data)
    ? data.data.map((item: any) => ({ label: item.name, value: item.classId }))
    : [];

  return (
    <Dialog
      open={isOpen && modalName === "ADD_ASSIGNMENT"}
      onOpenChange={onClose}
      modal={true}
    >
      <DialogContent className="max-w-xl max-h-[400px] overflow-y-auto scrollbar-none">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">Buat Tugas</DialogTitle>
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
                      <PopoverContent className="w-full p-0">
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
                    <FormLabel>Deadline</FormLabel>

                    <DateTimePicker label="Basic date time picker" />

                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div role="input">
                <FormLabel>Tulis detail tugas</FormLabel>
                <RichTextEditor onValueChange={(value) => setRichEditorValue(value)} />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
