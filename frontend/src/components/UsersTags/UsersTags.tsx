import { DataTable } from "@/ui";
import { TrackType, columns } from "./columns";

const getData = async (): Promise<{ data: Array<TrackType> }> =>
  fetch("http://localhost:8888/track").then((res) => res.json());

export const UsersTags = async () => {
  const { data } = await getData();

  return <DataTable columns={columns} data={data} />;
};
