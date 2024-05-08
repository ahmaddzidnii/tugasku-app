"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        color="#6034D4"
        shallowRouting={true}
        options={{
          showSpinner: false,
        }}
        height="4px"
      />
    </>
  );
};
