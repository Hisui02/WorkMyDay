
export interface Exercise{
    title: string,
    notes: string|null
}

export interface ExerciseWId extends Exercise {
    id: string;
}