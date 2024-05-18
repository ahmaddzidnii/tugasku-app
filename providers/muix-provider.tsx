"use client";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

interface MuixProviderProps {
  children: React.ReactNode;
}

export const MuixProvider = ({ children }: MuixProviderProps) => {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
};
