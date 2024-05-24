import { Loader } from "@/components/loader";
import React from "react";

const EditAssignmentPageLoading = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-9rem)]">
      <Loader />
    </div>
  );
};

export default EditAssignmentPageLoading;
