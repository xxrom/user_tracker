"use server";

import { TrackType } from "@/components/UsersTags/columns";
import { revalidateTag } from "next/cache";

const tableTag = "table-data";

export const getData = async (): Promise<{ data: Array<TrackType> }> => {
  "use server";
  const url = `http://${process.env.SERVER_URL}/track`;

  console.log("SERVER URL:", url);

  try {
    const data = await fetch(url, {
      cache: "no-store",
      next: { tags: [tableTag] },
    });

    return data.json();
  } catch (err) {
    console.error(err);
  }

  return { data: [] };
};

export const revalidateTable = async () => {
  "use server";

  revalidateTag(tableTag);
};
