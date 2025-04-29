import { useCallback, useState } from "react";
import OrderDetailsDrawer from "./components/OrderDetailsDrawer";
import OrderStatusCard from "./components/OrderStatusCard";
import { useGetUserQuery } from "../../redux/api/graphqlBaseApi";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [selectOrder, setSelectOrder] = useState<any>("");

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const userId = JSON.parse(localStorage.getItem("user") || "[]")._id;

  const { data: user } = useGetUserQuery({ userId: userId });

  const orders = user?.getUser?.orders;

  const handleOrderClick = (id: string) => {
    setSelectOrder(id);
  };

  return (
    <div className="flex flex-col flex-wrap gap-6 p-4 my-4 md:flex-row h-[90vh] overflow-y-auto">
      {orders?.map((order: any) => {
        return (
          <div
            key={order._id}
            className="w-[400px] "
            onClick={() => handleOrderClick(order._id)}
          >
            <OrderStatusCard
              status="placed"
              timestamp="Today, 10:00 am"
              handleOpen={handleOpen}
              orderId={order._id}
            />
          </div>
        );
      })}

      <OrderDetailsDrawer
        open={open}
        onClose={handleClose}
        orderId={selectOrder}
      />
    </div>
  );
};
export default Orders;
