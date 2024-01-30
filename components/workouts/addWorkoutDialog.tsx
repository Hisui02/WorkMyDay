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
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { ExercisesMultiSelect } from "./exercisesMultiSelect";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { Exercise, Workout } from "@prisma/client";
import { addWorkout } from "@/app/actions";

const exerciseSchema = z.object({
  id:z.string().min(1),
  title: z.string().min(1, {
    message: "Title cannot be empty.",
  }),
  notes: z.string().nullable(),
})

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name cannot be empty.",
  }),
  exercise:z.array(exerciseSchema)
});

interface Props {
  setData: (values: z.infer<typeof formSchema>) => void;
  exercises:Exercise[]
}

export function AddWorkoutDialog({ setData,exercises }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      exercise:[]
    },
  });


  const {toast} = useToast();

  const onSubmit = async (values: Workout) => {
    setData({  ...values } as Workout);
    const res = await addWorkout(values);
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
          <DialogTitle>Add a workout</DialogTitle>
          <DialogDescription>
            Create an workout here, add some exercises below and click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exercise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <ExercisesMultiSelect exercises={exercises} />
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
