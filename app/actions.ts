"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
export async function addExercise(values: FormData) {
  console.log(values);
  // if (values.get("tittle")!=null && values.get("notes")) {

  const exercise: Prisma.ExerciseCreateInput = {
    title: values.get("title") as string,
    notes: values.get("notes") as string,
    userId: "clrs721n80000t3gglthpe61f",
  };
  prisma.exercise.create({
    data: exercise,
  });
  // }
}
