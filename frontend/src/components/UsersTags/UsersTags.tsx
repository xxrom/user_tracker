import { DataTable } from "@/ui";
import { TrackType, columns } from "./columns";

const getData = async (): Promise<{ data: Array<TrackType> }> =>
  fetch(`http://utb:${process.env.NEXT_PUBLIC_SERVER_PORT0}/track`, {
    next: { revalidate: 1 },
  }).then((res) => res.json());

export const UsersTags = async () => {
  const { data } = await getData();

  return <DataTable columns={columns} data={data} />;
};
UsersTags.displayName = "UsersTags";
