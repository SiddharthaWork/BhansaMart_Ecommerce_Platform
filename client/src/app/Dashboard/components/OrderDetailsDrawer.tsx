import {
  Button,
  Card,
  CardContent,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { Copy, X } from "lucide-react";
import { memo } from "react";
import { useGetOrderQuery } from "../../../redux/api/graphqlBaseApi";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  orderId: string;
}

const OrderDetailsDrawer: React.FC<DrawerProps> = memo(
  ({ open, onClose, orderId }) => {
    const orderDetails = useGetOrderQuery({ id: orderId });

    const billDetails = orderDetails?.currentData?.getOrder?.billDetails;

    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <div className="max-w-md p-0">
          <div className="flex flex-row items-center justify-between p-4 space-y-0">
            <Typography
              variant="h3"
              fontSize="1.4rem"
              className="text-xl font-bold"
            >
              Order Summary
            </Typography>
            <IconButton onClick={onClose} color="error" className="w-8 h-8">
              <X size={24} />
            </IconButton>
          </div>
          <div className="bg-[#F9F9F9] p-4 space-y-4">
            <Card className="border-0 ">
              <CardContent className="p-0">
                <div className="p-4 ">
                  <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                    <span className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                      📝
                    </span>
                    4 items in this order
                  </div>
                  <div className="space-y-4">
                    {orderDetails?.currentData?.getOrder?.orderedProducts.map(
                      (item: any, index: any) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-20 h-20 p-2 overflow-hidden bg-white rounded-lg">
                            <img
                              src={`https://api-bhansa.webstudiomatrix.com/${item?.product?.images[0]}`}
                              alt={item.title}
                              width={80}
                              height={80}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex justify-between flex-1">
                            <div className="space-y-1">
                              <h3 className="font-medium">
                                {item?.product?.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item?.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500 line-through">
                                Rs.{item?.product?.sellingPrice}
                              </p>
                              <p className="font-semibold">
                                Rs.
                                {item?.product?.discountPrice |
                                  item?.product?.sellingPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h2 className="mb-4 text-xl font-bold">Bill details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-blue-600">
                    <span>Product discount</span>
                    <span>Rs.{billDetails?.discount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Item total</span>
                    <span>Rs.{billDetails?.subTotalItemPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Handeling charge</span>
                    <span>Rs.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery charge</span>
                    <span className="text-green-600">free</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Bill total</span>
                    <span>Rs.{billDetails?.totalBill}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="p-4">
                  <h2 className="mb-4 text-xl font-bold">Order details</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Order id</p>
                      <div className="flex items-center gap-2">
                        <span>{orderDetails?.currentData?.getOrder?._id}</span>
                        <Button variant="contained" className="w-6 h-6">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <p>Pay on delivery</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Deliver to</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Drawer>
    );
  }
);
export default OrderDetailsDrawer;
