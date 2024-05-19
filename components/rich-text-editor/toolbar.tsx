import { type Editor } from "@tiptap/react";

import { Bold, Italic, ListOrdered } from "lucide-react";
import { ListBulletIcon } from "@radix-ui/react-icons";

import { Toggle } from "@/components/ui/toggle";

interface ToolbarProps {
  editor: Editor | null;
}

export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="p-2 flex gap-x-2">
      <Toggle
        title="bold"
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        title="italic"
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        title="ordered list"
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>

      <Toggle
        title="unordered list"
        size="sm"
        pressed={editor.isActive("bulletedList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <ListBulletIcon className="h-4 w-4" />
      </Toggle>
    </div>
  );
};
