import { Button, Card, CardContent, Chip, Divider } from "@mui/material";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useGetOrderQuery } from "../../../redux/api/graphqlBaseApi";

interface OrderStatusCardProps {
  status: "placed" | "cancelled";
  timestamp: string;
  orderId: string;
  handleOpen?: () => void;
}

export default function OrderStatusCard({
  status = "placed",
  timestamp,
  orderId,
  handleOpen,
}: OrderStatusCardProps) {
  const isPlaced = status === "placed";

  const orderDetails = useGetOrderQuery({ id: orderId });

  const orderStatus = orderDetails?.currentData?.getOrder?.orderStatus;

  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex-row items-center justify-between pb-4 space-y-0">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-lg p-2 ${
              isPlaced ? "bg-gray-100" : "bg-red-50"
            }`}
          >
            {orderStatus === "isPlaced" ? (
              <div className="w-10 h-10">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MNxd7DnJFb9TAtamvPcXwTgMZEHzJi.png"
                  alt="Shopping bag"
                  width={40}
                  height={40}
                  className="rounded"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-10 h-10">
                <X className="w-6 h-6 text-red-500" />
              </div>
            )}
          </div>
          <div className="w-full space-y-1">
            <div className="flex justify-between w-full">
              <p className="text-lg font-medium">Order {orderStatus}</p>
              {orderStatus === "isPlaced" && (
                <div className="flex items-center gap-2">
                  <motion.div
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                    }}
                    animate={{
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />

                  <Chip size="small" label="Active" color="success" />
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Rs.{orderDetails?.currentData?.getOrder?.totalAmount} •{" "}
              {timestamp}
            </p>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex gap-5 py-2 overflow-x-auto justify-center">
          {orderDetails?.data?.getOrder?.orderedProducts.map(
            (item: any, index: number) => (
              <div
                className="w-20 h-20 p-2 overflow-hidden bg-white rounded-lg"
                key={index}
              >
                <img
                  src={`https://api-bhansa.webstudiomatrix.com/${item?.product?.images[0]}`}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            )
          )}
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <Button
          onClick={handleOpen}
          variant="contained"
          className={`w-full ${isPlaced ? "text-green-600" : "text-blue-600"}`}
        >
          {orderStatus === "isPlaced" ? "Order summary" : "Reorder"}
        </Button>
      </CardContent>
    </Card>
  );
}
