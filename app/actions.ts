"use server";

import { Exercise } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Prisma, Workout } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addExercise(values: Exercise) {
  const exercise: Prisma.ExerciseCreateInput = {
    title: values.title as string,
    notes: values.notes as string,
    user: { connect: { id: "clrs721n80000t3gglthpe61f" } },
  };

  try {
    await prisma.exercise.create({
      data: exercise,
    });
    revalidatePath("/exercises");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(e);
      return {
        error: {
          title: "Error",
          cause: e.meta?.cause,
        },
      };
    }
  }
}

export async function deleteExercise(id: string) {
  try {
    await prisma.exercise.delete({ where: { id: id } });
    revalidatePath("/exercises");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(e);
      if (e.code != "P2025") {
        return {
          error: {
            title: "Error",
            cause: e.meta?.cause,
          },
        };
      }
    }
  }
}

export async function addWorkout(values: Workout) {
  const workout: Prisma.WorkoutCreateInput = {
    name: values.name as string,
    user: { connect: { id: "clrs721n80000t3gglthpe61f" } },
  };

  try {
    await prisma.workout.create({
      data: workout,
    });
    revalidatePath("/exercises");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log(e);
      return {
        error: {
          title: "Error",
          cause: e.meta?.cause,
        },
      };
    }
  }
}

