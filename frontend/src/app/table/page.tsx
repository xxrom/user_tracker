import { UsersTags } from "@/components/UsersTags/UsersTags";
import { Card } from "@/ui";

const TablePage = () => {
  return (
    <Card className="grid grid-cols-[1fr] grid-rows-[auto_1fr] p-2 overflow-scroll">
      <div>All User Events</div>

      <main className="grid grid-cols-[1fr] grid-rows-[1fr] overflow-scroll rounded-md bg-slate-100">
        <UsersTags />
      </main>
    </Card>
  );
};

export default TablePage;
