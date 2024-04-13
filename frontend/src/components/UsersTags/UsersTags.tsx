import { DataTable } from "@/ui";
import { columns } from "./columns";

const getData = async (): Promise<any[]> => {
  // Fetch data from your API here.
  return [
    {
      id: "7 asf28ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728easdf dsdf52f",
      amount: 101,
      status: "qlnvvasdf",
      email: "maslajsf@example.com",
    },
    {
      id: "72asdf8e asdfd52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "728ea sdfd52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edsdf zxvas52f",
      amount: 101,
      status: "qlnvvasdf",
      email: "maslajsf@example.com",
    },
    {
      id: "af 72asdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edsdf52f",
      amount: 101,
      status: "qlnvvasdf",
      email: "maslajsf@example.com",
    },
    {
      id: "72asdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edsdf52f",
      amount: 101,
      status: "qlnvvasdf",
      email: "maslajsf@example.com",
    },
    {
      id: "72asdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edsdf52f",
      amount: 101,
      status: "qlnvvasdf",
      email: "maslajsf@example.com",
    },
    {
      id: "72asdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728edsdf52f",
      amount: 101,
      status: "qlnvvasdf",
      email: "maslajsf@example.com",
    },
    {
      id: "72asdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "asf72asdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "72basfasdf8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "72asd1234f8ed52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "72asdf8ea9ad52f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    {
      id: "72asdf8ed5as0122f",
      amount: 102,
      status: "asflj",
      email: "1234fas3@example.com",
    },
    // ...
  ];
};

export const UsersTags = async () => {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
};
