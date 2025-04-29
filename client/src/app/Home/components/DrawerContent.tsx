// import Button from "../../../components/shared/Button";
import DrawerIcon from "../../../assets/images/extras/drawericon1.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../../../redux/slices/cartSlice";
import React, { useEffect } from "react";
import { placeOrder } from "../../../redux/slices/orderslice";
import {
  useAddCartMutation,
  useUpdateCartMutation,
} from "../../../redux/api/rest/authApi";
import { useGetCartByUserQuery } from "../../../redux/api/graphqlBaseApi";

type Props = {
  onClose: () => void;
};

const DrawerContent: React.FC<Props> = ({ onClose }) => {
  const cart = useSelector((state: any) => state.cart);

  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser)._id : null;

  const dispatch = useDispatch();

  const [loggedIn, setLoggedIn] = React.useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  const [addCart] = useAddCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const { data: availableCart, isFetching: isCartFetching } =
    useGetCartByUserQuery(user, { skip: !user });
  const cartCall = async (value: any) => {
    const availableCartId = availableCart?.getByUserId?._id;

    if (availableCartId) {
      try {
        console.log("cart update");
        const response = await updateCart(value).unwrap();

        console.log("newItems", response);
      } catch (error) {
        console.log("Error updating cart", error);
      }
    } else {
      try {
        console.log("cart create");
        const response = await addCart(value).unwrap();

        console.log("response", response);
      } catch (error) {
        console.log("couldnot add to cart", error);
      }
    }
  };

  useEffect(() => {
    if (isCartFetching) return;

    const formattedCart = {
      user: user,
      cartID: availableCart?.getByUserId._id,
      products: cart.items.map((item: any) => ({
        product: item.id,
        quantity: item.quantity,
        variant: item.sizes || "Default", // Adjust variant handling
        price: item.price,
      })),
    };

    (async () => {
      await cartCall(formattedCart);
    })();
  }, [cart, availableCart?.getByUserId?._id, isCartFetching]);

  const handleCheckout = () => {
    const order = {
      items: cart.items,
      totalAmount: cart.totalAmount,
    };

    dispatch(placeOrder(order));

    dispatch(clearCart());

    onClose();

    navigate("/checkout");
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Scrollable Content */}
      <div className="flex-1 mx-4 my-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {/* <div className="bg-[#FFDFDF] flex flex-row justify-between items-center rounded-lg py-4 px-3">
            <div className="flex flex-col gap-0">
              <p className="text-[#FF3B30] lg:text-xl md:text-lg font-semibold text-base">
                4 out of Stock items...
              </p>
              <span className="text-[#353537] lg:text-base md:text-sm text-xs">
                You can continue to checkout
              </span>
            </div>

            <Button
              buttonText="Review"
              className="bg-[#539818] h-10 text-white px-3 py-1 rounded-lg"
              onClick={() => {}}
            />
          </div> */}
          <div className="pt-4 bg-white rounded-t-lg shadow-custom-x">
            <div className="flex flex-row items-center justify-start gap-3 px-5">
              <img src={DrawerIcon} className="h-auto w-11" />
              <div className="flex flex-col">
                <p className="text-base font-semibold md:text-lg">Delivery</p>
                <span className="font-sans text-sm md:text-base">
                  Shipment of {cart?.items?.length} items
                </span>
              </div>
            </div>
            <div className="mt-2 border-b border-[#B0B0B0]"></div>
            <div className="">
              {cart?.items?.map((product: any) => (
                <div
                  className="px-5 flex flex-row items-center justify-between py-[10px] border-b border-[#B0B0B0] min-h-24"
                  key={product.id}
                >
                  <div className="flex flex-row items-center justify-start gap-2 w-[80%]">
                    <div className="flex w-[25%] justify-start bg-[#D9F3F4CC] p-[3px] rounded-lg items-start">
                      <img
                        src={`https://api-bhansa.webstudiomatrix.com/${product.image}`}
                        alt={product.name}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col items-left w-[75%]">
                      <h3 className="overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap">
                        {product.name}
                      </h3>

                      <div className="flex flex-col gap-1 mt-1 text-left">
                        <p className="text-sm font-normal text-gray-600">
                          {product.sizes}
                        </p>
                        <p className="text-sm font-semibold">
                          Rs.{Math.ceil(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-end bg-[#539818] rounded-lg w-[20%]">
                    <Counter
                      quantity={product.quantity}
                      productID={product.id}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="p-3 mt-auto bg-white ">
        <div className="bg-[#024756] py-4 px-3 rounded-lg text-white flex flex-row justify-between items-center mt-auto">
          <div>
            <p className="font-semibold">{cart.totalAmount}</p>
            <span>Total</span>
          </div>
          <div className="font-semibold text-white ">
            {loggedIn ? (
              <button onClick={handleCheckout}>Proceed to Checkout</button>
            ) : (
              <Link to="/login" className="flex items-center">
                <span>Login to proceed </span>
                <Icon
                  icon="ic:outline-arrow-right"
                  width="24"
                  height="24"
                  style={{ color: "white" }}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerContent;

type CounterProps = {
  quantity: number;
  productID: string;
};

const Counter: React.FC<CounterProps> = ({ quantity, productID }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: productID, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id: productID, quantity: quantity - 1 }));
    } else if (quantity === 1) {
      dispatch(removeFromCart(productID));
    }
  };

  return (
    <div className="flex flex-row items-center justify-between w-[100px] text-white h-[30px] rounded-lg">
      <button
        className="flex items-center justify-center w-1/3 h-full"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="flex items-center justify-center w-1/3 h-full font-semibold">
        {quantity}
      </span>
      <button
        className="flex items-center justify-center w-1/3 h-full"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
};
