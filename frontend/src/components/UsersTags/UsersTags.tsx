import { DataTable } from "@/ui";
import { columns } from "./columns";
import { getData } from "../../actions/tableActions";
import { UpdateButton } from "./UpdateButton";

export const UsersTags = async () => {
  const { data } = await getData();

  return (
    <div>
      <UpdateButton />
      <DataTable columns={columns} data={data} />
    </div>
  );
};
UsersTags.displayName = "UsersTags";
