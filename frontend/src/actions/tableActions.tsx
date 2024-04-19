"use server";

import { TrackType } from "@/components/UsersTags/columns";
import { revalidateTag } from "next/cache";

const tableTag = "table-data";

export const getData = async (): Promise<{ data: Array<TrackType> }> => {
  "use server";
  try {
    return fetch(
      `http://${process.env.SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT0}/track`,
      {
        cache: "no-store",
        next: { tags: [tableTag] },
      },
    ).then((res) => res.json());
  } catch (err) {
    console.error(err);
  }

  return { data: [] };
};

export const revalidateTable = async () => {
  "use server";

  revalidateTag(tableTag);
};
