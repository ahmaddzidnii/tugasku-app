import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface RichTextEditorProps {
  onValueChange?: (value: string) => void;
}
export const RichTextEditor = ({ onValueChange }: RichTextEditorProps) => {
  const [model, setModel] = useState<string>("");

  useEffect(() => {
    if (onValueChange) {
      onValueChange(model);
    }
  }, [model]);

  return (
    <FroalaEditor
      model={model}
      onModelChange={(model: string) => {
        setModel(model);
      }}
      config={{
        placeholderText: "Tulis detail tugas..",
        // toolbarButtons: {
        //   moreText: {
        //     buttons: ["bold", "italic", "underline", "subscript", "superscript"],
        //   },
        // },
        toolbarButtons: [
          ["bold", "italic", "underline", "subscript", "superscript", "undo", "redo"],
          ["alert", "clear", "insert"],
        ],
      }}
      tag="textarea"
    />
  );
};
