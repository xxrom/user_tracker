"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TrackType = {
  event: string;
  tags: Array<string>;
  title: string;
  ts: number;
  url: string;
};

export const columns: ColumnDef<TrackType>[] = [
  {
    accessorKey: "event",
    header: "Event",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ getValue }) => {
      return <div>{`[${getValue()}]`}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "ts", // Time
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex">
            Time:
            {column.getIsSorted() === "asc" ? "^" : "v"}
          </div>
        </button>
      );
    },
    cell: ({ getValue }) => {
      return <div>{new Date((getValue() as number) * 1000).toUTCString()}</div>;
    },
  },
];
