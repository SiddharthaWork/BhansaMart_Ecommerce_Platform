import { Table } from "../../shared"

// Rename this interface to be more specific to table rows
interface OrderData {
  _id: string
  orderid: string;
  orderdate: string;
  totalamount: string;
  status: string;
  deliverydate: string;
}

const columns = [
  {
    key: "orderid",
    header: "Order Id",
    width: "90px",
  },
  {
    key: "orderdate",
    header: "Order Date",
    width: "90px",
  },
  {
    key: "totalamount",
    header: "Total Amount",
    width: "90px",
  },

  {
    key: "status",
    header: "Status",
    width: "90px",
    render: (_: any, data: any) => (
      <span
        className={`p-1 rounded ${
          data.status === "Success"
            ? "bg-fade-green text-parrot"
            : data.status === "Pending"
            ? "bg-grey-extra text-grey-400"
            : "bg-[#F87D08] text-fade-black"
        }`}
      >
        {data.status}
      </span>
    ),
  },



  {
    key: "deliverydate",
    header: "Delivery Date",
    width: "90px",
  },
];

const data: OrderData[] = [
  {
    _id: "1",
    orderid: "O-19870",
    orderdate: "2024-12-25 2:00 PM",
    totalamount: "$25.50",
    status: "Success",
    deliverydate: "2024-12-28",
  },
  {
    _id: "2",
    orderid: "O-19871",
    orderdate: "2024-12-25 2:00 PM",
    totalamount: "$25.50",
    status: "Pending",
    deliverydate: "2024-12-28",
  },
  {
    _id: "3",
    orderid: "O-19872",
    orderdate: "2024-12-25 2:00 PM",
    totalamount: "$25.50",
    status: "Success",
    deliverydate: "2024-12-28",
  },
];

// Define props interface for the component

export const _OrderTable = (
  {
    customerData
  }: {
    customerData: any
  }
) => {
  return (
    <div className="w-full h-fit bg-white rounded-lg shadow-sm">
      <div className="w-full h-16 p-6 flex flex-row items-center justify-between border-b">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-[#8695AA] text-xl">
          Total Spent Rs.12980 on 7 Orders
        </p>
      </div>

      <Table
        showSelectAll={false}
        showAction={false}
        data={data}
        columns={columns}
      />
    </div>
  );
};