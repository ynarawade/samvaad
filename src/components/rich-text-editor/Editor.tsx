"use client";
import { editorExtensions } from "@/components/rich-text-editor/extensions";
import MenuBar from "@/components/rich-text-editor/MenuBar";
import { EditorContent, useEditor } from "@tiptap/react";

function RichTextEditor() {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        class:
          "min-h-[125px] max-w-none focus:outline-none p-4 !w-full !max-w-none prose dark:prose-invert marker:text-primary",
      },
    },
  });
  return (
    <div className="relative w-full border border-input rounded-2xl overflow-hidden dark:bg-input/30 flex flex-col">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="max-h-[200px] overflow-y-auto"
      />
    </div>
  );
}

export default RichTextEditor;
