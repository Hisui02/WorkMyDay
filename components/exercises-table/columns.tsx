"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { deleteExercise } from "@/app/actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Exercise = {
  id: string;
  title: string;
  notes: string | null;
};

export const columns: ColumnDef<Exercise>[] = [
  {
    id: "id",
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 40,
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "actions",
    header: () => {
      return <div className="text-center">Actions</div>;
    },
    id: "actions",
    size: 20,

    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <Button variant={"secondary"}>
            <FaEdit />
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              deleteExercise(row.original.id);
            }}
          >
            <FaTrashAlt />
          </Button>
        </div>
      );
    },
  },
];
