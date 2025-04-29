import { Divider, Card, CardContent } from "@mui/material";
import { useAppData } from "../../../context/AppContext";
import OrderSummary from "./components/OrderSummary";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../../../redux/api/rest/authApi";
import { resetOrder } from "../../../redux/slices/orderslice";

const OrderDetails = () => {
  const { orderData } = useAppData();

  const customer = JSON.parse(localStorage.getItem("user") || "null") || {};

  const dispatch = useDispatch();

  // Get the createOrder mutation hook (isLoading and isError are optional)
  const [createOrder] = useCreateOrderMutation();

  const totalAmount = orderData?.orders?.totalAmount ?? 0;
  const coupon = orderData?.coupon?.getCoupon;
  const discountValue = coupon?.value ?? 0;
  const discountType = coupon?.couponType ?? "fixed";

  // Function to calculate discount based on coupon type
  const calculateDiscount = (
    orderValue: number,
    value: number,
    type: string
  ) => {
    if (type === "percentage") {
      return (value * orderValue) / 100;
    }
    return value;
  };

  // Calculate discount amount
  const discountAmount = Math.round(
    calculateDiscount(totalAmount, discountValue, discountType)
  );

  // Define additional charges
  const handlingCharge = 50;
  const deliveryCharge = 0; // Assuming free delivery

  // Calculate final bill total
  const finalBillTotal =
    totalAmount - discountAmount + handlingCharge + deliveryCharge;
  const handleOrderConfirm = async () => {
    const payload = {
      customer: customer._id || "", // Ensure customer ID is a string
      shippingAddress: {
        fullname: orderData?.name ?? "", // Ensure fullname is a string
        address: orderData?.address ?? "",
        landmark: orderData?.landmark ?? "",
        phone: orderData?.phone ?? "",
        email: orderData?.email ?? "",
      },
      billingAddress: {
        fullname: customer.name ?? "",
        address: customer.address ?? "",
        landmark: customer.address ?? "",
        phone: customer.phone ?? "",
        email: customer.email ?? "",
      },
      orderedProducts:
        orderData?.orders?.orderItems?.map((item: any) => ({
          product: item.id || "", // Ensure ID is a string
          quantity: item.quantity?.toString() || "1", // Convert to string with default
        })) || [],
      totalAmount: finalBillTotal,
      billDetails: {
        subTotalItemPrice: orderData?.orders?.totalAmount,
        shippingCost: deliveryCharge,
        discount: discountAmount,
        coupon: orderData?.coupon?.getCoupon?._id,
        totalBill: finalBillTotal,
      }, // Ensure number type
    };

    try {
      const res = await createOrder(payload).unwrap();
      console.log("Order created successfully:", res);

      // Clear the saved form data and reset the order in Redux.
      sessionStorage.removeItem("checkoutFormData");
      dispatch(resetOrder());

      // Optionally navigate to a confirmation page:
      // navigate("/order-success", { state: { order: res } });
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="mx-auto max-w-[600px] min-w-[500px] border-[1px] rounded-lg my-5 border-gray-400 p-10 ">
      <div className="flex flex-col gap-5">
        <OrderSummary />

        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-bold">Shipping Details</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-blue-600">
                <span>Customer Name</span>
                <span className="capitalize">{orderData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address</span>
                <span>{orderData?.address}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact No.</span>
                <span>{orderData?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Email Address</span>
                <span>{orderData?.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon Code</span>
                <span className="text-green-600">
                  {orderData?.coupon?.getCoupon?.couponCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Option</span>
                <span className="text-green-600">
                  {orderData?.paymentMethod}
                </span>
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
                <span>Rs. {discountAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Item total</span>
                <span>Rs. {totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Handeling charge</span>
                <span>Rs. {handlingCharge}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery charge</span>
                <span className="text-green-600">{deliveryCharge}</span>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Bill total</span>
                <span>Rs.{finalBillTotal}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <button
        className="text-lg font-medium bg-slate-800 py-2 text-white rounded-md my-5 w-full"
        type="button"
        onClick={handleOrderConfirm}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default OrderDetails;
