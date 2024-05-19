import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Placeholder from "@tiptap/extension-placeholder";

import { Toolbar } from "./rich-text-editor/toolbar";

interface RichTextEditorProps {
  onValueChange?: (value: string) => void;
}
export const RichTextEditor = ({ onValueChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ms-5",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ms-5",
        },
      }),
      Placeholder.configure({
        placeholder: "Tulis detail tugas..",
      }),
    ],
    // content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "border-t-2 p-2 min-h-[100px]",
      },
    },
    onUpdate: ({ editor }) => {
      if (onValueChange) {
        onValueChange(editor.getHTML());
      }
    },
  });

  return (
    <div className="relative border-2 rounded-md">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
