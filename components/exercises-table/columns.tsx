"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Exercise = {
  id: string;
  title: string;
  notes: string | null;
};

export const columns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
