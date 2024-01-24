-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "workoutsId" TEXT,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutsHistoryId" TEXT,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workoutsHistory" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workoutsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workoutsHistoryExercises" (
    "workoutId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "RIR" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "rPEId" TEXT NOT NULL,

    CONSTRAINT "workoutsHistoryExercises_pkey" PRIMARY KEY ("workoutId","exerciseId")
);

-- CreateTable
CREATE TABLE "RPEs" (
    "id" TEXT NOT NULL,
    "descrip" TEXT NOT NULL,

    CONSTRAINT "RPEs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutsId_fkey" FOREIGN KEY ("workoutsId") REFERENCES "workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_workoutsHistoryId_fkey" FOREIGN KEY ("workoutsHistoryId") REFERENCES "workoutsHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutsHistory" ADD CONSTRAINT "workoutsHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutsHistoryExercises" ADD CONSTRAINT "workoutsHistoryExercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutsHistoryExercises" ADD CONSTRAINT "workoutsHistoryExercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutsHistoryExercises" ADD CONSTRAINT "workoutsHistoryExercises_rPEId_fkey" FOREIGN KEY ("rPEId") REFERENCES "RPEs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutsHistoryExercises" ADD CONSTRAINT "workoutsHistoryExercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
