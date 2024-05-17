import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with ssr disabled
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export const RichTextEditor = ({ onValueChange }: { onValueChange?: (value: string) => void }) => {
  const [value, setValue] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (onValueChange) {
      onValueChange(value);
    }
  }, [value]);

  if (!isMounted) return null;
  return (
    <ReactQuill
      id="editor"
      modules={{
        toolbar: [
          [{ header: [false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      }}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};
