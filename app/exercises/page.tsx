import ExercisesTable from "@/components/exercises-table/dataTable";
import prisma from "@/lib/prisma";

async function getExercises(user: string) {
  return await prisma.exercise.findMany({
    where: { userId: user },
    select: { id: true, title: true, notes: true },
  });
}

export default async function Page() {
  const data = await getExercises("clrs721n80000t3gglthpe61f");

  return (
    <div className="container mx-auto py-10">
      <ExercisesTable data={data} />
    </div>
  );
}
export const revalidate = 1;
