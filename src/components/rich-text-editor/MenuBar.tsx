import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  // Reactively track editor active states
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) =>
      editor
        ? {
            bold: editor.isActive("bold"),
            italic: editor.isActive("italic"),
            underline: editor.isActive("underline"),
            strike: editor.isActive("strike"),
            codeBlock: editor.isActive("codeBlock"),
            bulletList: editor.isActive("bulletList"),
            orderedList: editor.isActive("orderedList"),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
          }
        : null,
  });

  if (!editor) return null;

  return (
    <div className="border border-input border-t-0 border-x-0 rounded-t-2xl p-2 bg-card flex flex-wrap gap-2 items-center">
      <TooltipProvider delayDuration={300}>
        {/* Text Formatting */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.bold}
                onPressedChange={() =>
                  editor.chain().focus().toggleBold().run()
                }
                className={cn(editorState?.bold && "bg-muted text-primary")}
              >
                <Bold className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bold (⌘B / Ctrl+B)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.italic}
                onPressedChange={() =>
                  editor.chain().focus().toggleItalic().run()
                }
                className={cn(editorState?.italic && "bg-muted text-primary")}
              >
                <Italic className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Italic (⌘I / Ctrl+I)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.underline}
                onPressedChange={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
                className={cn(
                  editorState?.underline && "bg-muted text-primary"
                )}
              >
                <Underline className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Underline (⌘U / Ctrl+U)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.strike}
                onPressedChange={() =>
                  editor.chain().focus().toggleStrike().run()
                }
                className={cn(editorState?.strike && "bg-muted text-primary")}
              >
                <Strikethrough className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Strikethrough (⌘⇧X / Ctrl+Shift+X)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.codeBlock}
                onPressedChange={() =>
                  editor.chain().focus().toggleCodeBlock().run()
                }
                className={cn(
                  editorState?.codeBlock && "bg-muted text-primary"
                )}
              >
                <Code className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Code Block (⌘⇧C / Ctrl+Shift+C)</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="min-h-6 mx-2" />

        {/* Lists */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.bulletList}
                onPressedChange={() =>
                  editor.chain().focus().toggleBulletList().run()
                }
                className={cn(
                  editorState?.bulletList && "bg-muted text-primary"
                )}
              >
                <ListIcon className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Bullet List (⌘⇧8 / Ctrl+Shift+8)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                size="sm"
                pressed={editorState?.orderedList}
                onPressedChange={() =>
                  editor.chain().focus().toggleOrderedList().run()
                }
                className={cn(
                  editorState?.orderedList && "bg-muted text-primary"
                )}
              >
                <ListOrdered className="size-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>Numbered List (⌘⇧7 / Ctrl+Shift+7)</TooltipContent>
          </Tooltip>
        </div>

        <Separator
          orientation="vertical"
          className="min-h-6 mx-2 w-px bg-border"
        />

        {/* Undo / Redo */}
        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                disabled={!editorState?.canUndo}
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo (⌘Z / Ctrl+Z)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                disabled={!editorState?.canRedo}
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo (⌘⇧Z / Ctrl+Shift+Z)</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
