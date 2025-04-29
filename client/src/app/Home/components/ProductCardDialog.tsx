import React from "react";
import { useNavigate } from "react-router-dom";


export interface AttributeType {
    name: string;
    value: string;
    unit: string;
    color: string;
}
interface ProductCardProps {
    product: {
        _id: number;
        images: string[];
        name: string;
        size: string;
        attributes: AttributeType[];
        discountPrice: number;
        sellingPrice: number;
    };
    customStyles: string;
    //   onAdd: (productId: number, quantity: number) => void;
    //   onRemove?: (productId: number) => void;
    dialog?: boolean;
    onOpenDialog?: (productId: number) => void;
}

const ProductCardDialog: React.FC<ProductCardProps> = ({
    product,
    customStyles = "",
    //   onAdd,
    //   onRemove,
    dialog = false,
    onOpenDialog,
}) => {
    // const [quantity, setQuantity] = useState(() => {
    //   const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    //   const existingProduct = cart.find((item: any) => item._id === product._id);
    //   return existingProduct ? existingProduct.quantity : 0;
    // });



    const navigate = useNavigate();

    const handleAdd = (event: React.MouseEvent) => {
        event.stopPropagation();
        // if (dialog) {
        //   onOpenDialog?.(product._id);
        // } else {
        //   setQuantity(1);
        //   onAdd(product._id, 1);
        // }

        if (dialog) {
            onOpenDialog?.(product._id);
        } else {
            // Call parent component's handler
            //   onAdd(product._id, 1);
        }
    };

    //   const handleIncrement = (event: React.MouseEvent) => {
    //     event.stopPropagation();

    //     // setQuantity((prev: any) => {
    //     //   const newQuantity = prev + 1;
    //     //   onAdd(product._id, newQuantity);
    //     //   return newQuantity;
    //     // });

    //     const newQuantity = quantity + 1;
    //     dispatch(
    //       updateQuantity({ id: product._id.toString(), quantity: newQuantity })
    //     );
    //   };

    //   const handleDecrement = (event: React.MouseEvent) => {
    //     event.stopPropagation();
    //     // setQuantity((prev: any) => {
    //     //   if (prev > 1) {
    //     //     const newQuantity = prev - 1;
    //     //     onAdd(product._id, newQuantity);
    //     //     return newQuantity;
    //     //   } else {
    //     //     onRemove?.(product._id);
    //     //     return 0;
    //     //   }
    //     // });

    //     if (quantity > 1) {
    //       const newQuantity = quantity - 1;
    //       dispatch(
    //         updateQuantity({ id: product._id.toString(), quantity: newQuantity })
    //       );
    //     } else {
    //       dispatch(removeFromCart(product._id.toString()));
    //       onRemove?.(product._id);
    //     }
    //   };

    return (
        <div
            className={`px-2 py-2 md:px-4 md:py-4 lg:px-4 lg:py-4 rounded-lg h-[17rem]  ${customStyles}`}
            onClick={() => {
                console.log(product);
                navigate(`/product/${product._id}`);
            }}
        >
            <div className="flex justify-center flex-shrink-0 mb-4">
                <img
                    src={`https://api-bhansa.webstudiomatrix.com/${product?.images[0]}`}
                    alt={product?.name}
                    className="object-contain w-full h-20 md:h-32"
                />
            </div>
            <h3 className="mt-4 text-xs font-semibold md:text-sm line-clamp-1">
                {product?.name}
            </h3>
            <div className="flex flex-col items-start justify-between flex-grow gap-2 mt-2 sm:gap-0 sm:items-center sm:flex-row">
                <div className="flex flex-col gap-1 md:gap-2">
                    {/* <p className="text-sm text-gray-600">{product.size}</p> */}
                    {product.attributes.slice(0, 1).map((item, index) => (
                        <div key={index}>
                            <div className="flex flex-row " >
                                <p className="text-xs text-gray-600 md:text-sm">
                                    {item.value}
                                </p>
                                <p className="text-xs text-gray-600 md:text-sm">
                                    {item.unit}
                                </p>
                            </div>
                        </div>

                    ))}

                    {product?.discountPrice === null ? (
                        <p className="text-xs font-medium md:text-sm ">

                            Price: Rs {Math.ceil(product?.sellingPrice).toString()}
                        </p>

                    ) : (
                        <p className="text-xs font-medium md:text-sm ">

                            Price: Rs {Math.ceil(product?.sellingPrice - product?.discountPrice).toString()}
                        </p>

                    )}
                </div>
                <div>
                    <button
                        onClick={handleAdd}
                        className="lg:px-5 md:px-4 px-3 md:py-2 py-[5px] lg:text-sm md:text-[13px] text-xs font-semibold text-[#4F7743] transition-colors duration-300 bg-white border border-[#4F7743] rounded-lg hover:bg-[#4F7743] hover:text-white"
                    >
                        ADD
                    </button>
                    {
                        // !dialog && (
                        //   <div className="flex items-center lg:gap-2 gap-[6px] px-2 lg:px-3 lg:py-2 py-[6px] bg-[#539818] rounded-lg text-white">
                        //     <button
                        //       onClick={handleDecrement}
                        //       className="text-lg font-bold lg:text-lg"
                        //     >
                        //       -
                        //     </button>
                        //     <span className="w-5 text-sm font-semibold text-center md:text-[15px] lg:text-base">
                        //       {quantity}
                        //     </span>
                        //     <button
                        //       onClick={handleIncrement}
                        //       className="text-lg font-bold lg:text-lg"
                        //     >
                        //       +
                        //     </button>
                        //   </div>
                        // )
                    }

                </div>
            </div>
        </div>
    );
};

export default ProductCardDialog;
