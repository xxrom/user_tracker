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
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "ts",
    header: "Time",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
];
