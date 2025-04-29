import { useSelector } from "react-redux";

const OrderSummary = () => {
  const order = useSelector((state: any) => state.order);

  return (
    <div className="">
      <h3 className="text-center font-semibold text-xl">Your Orders</h3>

      <div className=" mx-auto my-5 flex flex-col overflow-y-auto border-[1px] border-gray-300 ">
        {order?.orderItems?.map((product: any) => (
          <div
            className="px-5 flex flex-row items-center bg-white shadow-md  justify-between py-[10px] border-b border-[#B0B0B0] min-h-16"
            key={product.id}
          >
            <div className="flex flex-row items-center justify-start gap-2 w-[80%]">
              <div className="flex w-[20%] justify-start rounded-lg items-start">
                <img
                  src={`https://api-bhansa.webstudiomatrix.com/${product.image}`}
                  alt={product.name}
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div className="flex flex-col items-left w-[75%]">
                <h3 className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.name}
                </h3>

                <div className="flex flex-col gap-1 mt-1 text-left">
                  <p className="text-sm font-normal text-gray-600">
                    {product.sizes}
                  </p>
                  <p className="text-sm font-semibold">
                    Rs.{Math.ceil(product.price)}
                  </p>
                  <p className="text-sm font-semibold text-gray-600">
                    Qty: {product.quantity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSummary;
