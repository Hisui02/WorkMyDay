import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addExercise } from "@/app/actions";
import { Exercise } from "@/interfaces";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  notes: z.string().optional(),
});

interface Props {
  setData: (values: z.infer<typeof formSchema>) => void;
}

export function AddExerciseDialog({ setData }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      notes: "",
    },
  });

  interface ExerciseWId extends Exercise {
    id: string;
  }

  const {toast} = useToast();

  const onSubmit = async (values: Exercise) => {
    setData({ id: "temp", ...values } as ExerciseWId);
    const res = await addExercise(values);
    console.log(!!res)
    if (res) {
      toast({
        variant:"destructive",
        title:res.error.title,
        description: res.error.cause as string,
      });
    }
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an exercise</DialogTitle>
          <DialogDescription>
            Create an exercise here, click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit" className="text-secondary-foreground">
                Save
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
