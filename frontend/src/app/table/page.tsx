import { UsersTags } from "@/components/UsersTags/UsersTags";
import { Card } from "@/ui";

const TablePage = async () => {
  return (
    <Card className="relative grid grid-cols-[1fr] grid-rows-[auto_1fr] p-4 overflow-scroll">
      <div className="mb-4 mr-16">Events (auto-updates)</div>

      <main className="grid grid-cols-[1fr] grid-rows-[1fr] overflow-scroll rounded-md">
        <UsersTags />
      </main>
    </Card>
  );
};

export default TablePage;
