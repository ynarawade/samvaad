"use client";
import {
  WorkspaceSchema,
  type WorkspaceSchemaType,
} from "@/app/schemas/workspace";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { orpc } from "@/lib/orpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { isDefinedError } from "@orpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateWrokspaceBtn() {
  const [isOpen, isSetOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const form = useForm({
    resolver: zodResolver(WorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(value: WorkspaceSchemaType) {
    console.log("Hey Submitting the form");
    createWorkspaceMutation.mutate(value);
  }

  const createWorkspaceMutation = useMutation(
    orpc.workspace.create.mutationOptions({
      onSuccess: (newWorkspace) => {
        // toast message
        toast.success(
          `Workspace ${newWorkspace.workspaceName} created successfully`
        );
        // revalidating data with tanstack
        queryClient.invalidateQueries({
          queryKey: orpc.workspace.list.queryKey(),
        });

        // closing dialog and reset form
        form.reset();
        isSetOpen(false);
      },
      onError: (error) => {
        if (isDefinedError(error)) {
          if (error.code === "RATE_LIMITED") {
            toast.error(error.message);
            return;
          }
          toast.error(error.message);
          return;
        }
        toast.error(`Failed to create workspace, try again!`);
      },
    })
  );

  return (
    <Dialog open={isOpen} onOpenChange={isSetOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                isSetOpen(!isOpen);
              }}
              className="size-12 transition-all duration-300 rounded-2xl"
              variant={"outline"}
            >
              <Plus className="size-5" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Create workspace</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to get started
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="my workspace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button disabled={createWorkspaceMutation.isPending} type="submit">
              {createWorkspaceMutation.isPending
                ? "Creating..."
                : "Create Wrokspace"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWrokspaceBtn;
