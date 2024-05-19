import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TooltipUtilsProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  asChild?: boolean;
}
export const TooltipUtils = ({ children, content, asChild }: TooltipUtilsProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
