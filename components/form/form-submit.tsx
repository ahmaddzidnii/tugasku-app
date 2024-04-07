"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "../spinner";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "link" | "outline" | "ghost";
}

export const FormSubmit = ({
  children,
  disabled = false,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className={cn(className)}
      variant={variant}
      size="sm"
    >
      {pending ? <Spinner className="w-4 h-4 animate-spin fill-white" /> : children}
    </Button>
  );
};
