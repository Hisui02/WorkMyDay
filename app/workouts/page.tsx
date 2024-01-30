import WorkoutsTable from '@/components/workouts/dataTable'
import React from 'react'
import { Exercise, Workout } from '@prisma/client';

async function getWorkouts(user: string) {
    return await prisma.workout.findMany({
      where: { userId: user },
      select: { id: true, name:true, Exercise:true },
    });
}
  
async function getExercises(user: string) {
    return await prisma.exercise.findMany({
      where: { userId: user },
      select: { id: true, title: true, notes: true },
    });
  }

async function Workouts() {
    const data: Workout[] = await getWorkouts("clrs721n80000t3gglthpe61f");
    const exercises: Exercise[] = await getExercises("clrs721n80000t3gglthpe61f");
    // console.log(data)
  return (
    <div className="container mx-auto py-10">
      <WorkoutsTable data={data} exercises={exercises} />
    </div>
  )
}

export default Workouts