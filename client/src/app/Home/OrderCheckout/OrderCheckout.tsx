// OrderCheckout.tsx
import { useFormik, FormikProvider, Form } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import OrderSummary from "./components/OrderSummary";
import {
  useGetUserQuery,
  useLazyGetCouponQuery,
} from "../../../redux/api/graphqlBaseApi";
import { useAppData } from "../../../context/AppContext";
import { Card, CardContent, Divider } from "@mui/material";

const OrderCheckout = () => {
  // Get order data from Redux (populated when checkout is initiated from the cart)
  const order = useSelector((state: any) => state.order);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const location = useLocation();

  const { setOrderData } = useAppData();

  // const { location: address } = useAppData();

  // Get the logged-in customer from localStorage.
  // Adjust these fields to match your stored user object.
  const customer = JSON.parse(localStorage.getItem("user") || "null") || {};

  const { data: user } = useGetUserQuery({ userId: customer._id });

  // State to manage the selected coupon
  const [selectedCoupon, setSelectedCoupon] = useState<any>("");

  // Yup validation for the checkout form fields
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    landmark: Yup.string().required("landmark is required"),
    phone: Yup.string().required("Phone number is required"),
    paymentMethod: Yup.string().required("Payment method is required"),
  });

  // Retrieve any saved form data from sessionStorage (if available)
  const getInitialValues = () => {
    const savedData = sessionStorage.getItem("checkoutFormData");

    return savedData
      ? JSON.parse(savedData)
      : {
        name: "",
        email: "",
        address: "",
        phone: "",
        landmark: "",
        paymentMethod: "Cash",
      };
  };

  // Handle form submission: merge form data with order and customer data, then call the API.
  const handleSubmit = async (values: any) => {
    if (!order.orderItems || order.orderItems.length === 0) {
      console.error("No order items found");
      return;
    }

    // Store form values in the context
    setOrderData({
      name: values.name,
      email: values.email,
      address: values.address,
      landmark: values.landmark,
      phone: values.phone,
      coupon: couponDetails,
      orders: order,
      paymentMethod: values.paymentMethod,
    });

    navigate("/order-summary");

    // const payload = {
    //   customer: customer._id, // Customer ID from the logged-in user
    //   shippingAddress: {
    //     fullname: values.name,
    //     address: values.address,
    //     landmark: values.landmark, // For example, same as address
    //     phone: values.phone,
    //     email: values.email,
    //   },
    //   billingAddress: {
    //     fullname: customer.name,
    //     address: customer.address,
    //     landmark: customer.address, // Adjust if needed
    //     phone: customer.phone,
    //     email: customer.email,
    //   },
    //   orderedProducts: order.orderItems.map((item: any) => ({
    //     product: item.id, // Assumes each order item has an "id" property
    //     quantity: item.quantity.toString(), // Convert quantity to string if needed
    //   })),
    //   totalAmount: order.totalAmount,
    // };

    // try {
    //   const res = await createOrder(payload).unwrap();
    //   console.log("Order created successfully:", res);

    //   // Clear the saved form data and reset the order in Redux.
    //   sessionStorage.removeItem("checkoutFormData");
    //   dispatch(resetOrder());

    //   // Optionally navigate to a confirmation page:
    //   // navigate("/order-success", { state: { order: res } });
    // } catch (error) {
    //   console.error("Failed to create order:", error);
    // }
  };

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Save form values to sessionStorage whenever they change.
  useEffect(() => {
    sessionStorage.setItem("checkoutFormData", JSON.stringify(formik.values));
  }, [formik.values]);

  // When returning from the address selection page, update the address field.
  useEffect(() => {
    if (location.state?.selectedAddress) {
      formik.setFieldValue("address", location.state.selectedAddress);
    }
  }, [location.state?.selectedAddress]);

  const [triggerGetCoupon, { data: couponDetails }] = useLazyGetCouponQuery();

  const handleCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const couponId = e.target.value;
    setSelectedCoupon(couponId);
    // Trigger the lazy query with the coupon id as variable.
    triggerGetCoupon({ id: couponId });
  };

  return (
    <div className="flex flex-col-reverse items-center gap-10 my-10 md:w-full md:flex md:flex-row md:justify-center ">
      <div className="w-full lg:3/5 md:w-1/2">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-center text-slate-800">
            CheckOut
          </h2>
          <p className="text-center">Enter the Shipping Details</p>
        </div>

        <FormikProvider value={formik}>
          <Form className=" max-w-[600px] mx-auto">
            <div className="flex flex-col gap-3 mx-10">
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Payment Method</label>
                <div className="flex justify-between gap-10 my-3">
                  <div className="border-[1px] border-black py-6 px-8 rounded-md w-1/2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash"
                        checked={formik.values.paymentMethod === "Cash"}
                        onChange={formik.handleChange}
                        className="w-4 h-4 "
                      />
                      Cash
                    </label>
                  </div>
                  <div className="border-[1px] border-black py-6 px-8 rounded-md w-1/2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={formik.values.paymentMethod === "online"}
                        onChange={formik.handleChange}
                        className="w-4 h-4"
                      />
                      Online
                    </label>
                  </div>
                </div>
                {formik.touched.paymentMethod &&
                  formik.errors.paymentMethod && (
                    <div className="text-red-400">
                      {formik.errors.paymentMethod as string}
                    </div>
                  )}
              </div>
              {/* Email Field */}
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="focus:outline-none border-[1px] border-gray-400 py-2 px-3 rounded-md"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-400">
                    {formik.errors.email as string}
                  </div>
                )}
              </div>

              {/* Full Name Field */}
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="focus:outline-none border-[1px] border-gray-400 py-2 px-3 rounded-md"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-400">
                    {formik.errors.name as string}
                  </div>
                )}
              </div>

              {/* Shipping Address Field */}
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className="focus:outline-none border-[1px] border-gray-400 py-2 px-3 rounded-md"
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="text-red-400">
                    {formik.errors.address as string}
                  </div>
                )}
                {/* Navigate to the address selection page */}
                {/* <div
                  className="py-1 mt-2 text-lg font-semibold text-center text-white bg-blue-600 rounded-md cursor-pointer"
                  onClick={() =>
                    navigate("/dashboard/add-address", {
                      state: { from: "orderCheckout" },
                    })
                  }
                >
                  Choose on Map
                </div> */}
              </div>

              {/* Landmark Field */}
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Landmark</label>
                <input
                  type="text"
                  name="landmark"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.landmark}
                  className="focus:outline-none border-[1px] border-gray-400 py-2 px-3 rounded-md"
                />
                {formik.touched.landmark && formik.errors.landmark && (
                  <div className="text-red-400">
                    {formik.errors.landmark as string}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="focus:outline-none border-[1px] border-gray-400 py-2 px-3 rounded-md"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-400">
                    {formik.errors.phone as string}
                  </div>
                )}
              </div>

              {/* Coupon Field */}
              <div className="flex flex-col gap-1 text-slate-800">
                <label className="font-medium">Select Coupon</label>
                <select
                  name="coupon"
                  value={selectedCoupon}
                  onChange={handleCoupon}
                  className="focus:outline-none border-[1px] border-gray-400 py-2 px-2 rounded-md"
                >
                  <option value="" disabled>
                    Choose a coupon
                  </option>
                  {user?.getUser?.collectedCoupons.length >= 1 ? (
                    user?.getUser?.collectedCoupons?.map((coupon: any) => {
                      return (
                        <option value={coupon._id} key={coupon._id}>
                          {coupon.couponCode}
                        </option>
                      );
                    })
                  ) : (
                    <option value="" disabled>
                      No coupons to Show
                    </option>
                  )}
                </select>
              </div>

              {/* Submit Button */}
              <button
                className="py-2 my-5 text-lg font-medium text-white rounded-md bg-slate-800"
                type="submit"
              >
                Proceed to Order
              </button>
            </div>
          </Form>
        </FormikProvider>
      </div>
      <div className="w-full px-5 lg:w-2/5 md:w-1/2">
        <OrderSummary />
        <Card>
          <CardContent>
            <h2 className="mb-4 text-xl font-bold">Bill details</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Item total</span>
                <span>Rs.{order.totalAmount}</span>
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
                <span>Rs.{order.totalAmount + 50}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderCheckout;
