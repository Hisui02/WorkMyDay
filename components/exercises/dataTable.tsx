"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddExerciseDialog } from "./addExerciseDialog";
import { useState } from "react";


import { Button } from "@/components/ui/button";

import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { deleteExercise } from "@/app/actions";
import { useToast } from "../ui/use-toast";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface Exercise {
  id: string;
  title: string;
  notes: string | null;
}




interface Props{
  data: Exercise[];
}



export default function DataTable({ data: fullData }: Props) {
  
  const columns: ColumnDef<Exercise>[] = [
    {
      accessorKey: "title",
      header: "Title",
      size: 70,
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
                handleDeletion(row.original.id)
              }}
            >
              <FaTrashAlt />
            </Button>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState(fullData);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  //I just gave up on typing this
  const addTableData = (newData:any) => {
    setData([...data,newData])
  }

  const {toast} = useToast();

  const removeRow = (id: string)=>{
    const newData = data.filter((row) => { return row.id != id })
    setData(newData)
  }

  const handleDeletion = async (id:string) => {
    removeRow(id)
    const res =await deleteExercise(id);
    if (res) {
      toast({
        variant:"destructive",
        title:res.error.title,
        description: res.error.cause as string,
      });
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}rem` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
        <div className="py-4">
          <AddExerciseDialog setData={addTableData}/>
        </div>
      
    </>
  );
}
