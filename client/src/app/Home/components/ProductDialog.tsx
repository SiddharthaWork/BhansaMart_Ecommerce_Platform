import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/slices/cartSlice";

interface ModalProps {
    isOpen?: boolean;
    product: any;
    onClose?: () => void;
}

export const ProductDialog: React.FC<ModalProps> = ({ isOpen, product, onClose }) => {
    const [quantity, setQuantity] = useState(0);
    console.log("Product:", product);

    const dispatch = useDispatch();
    // const products = [
    //     {
    //         id: 1,
    //         image: "https://via.placeholder.com/60",
    //         name: "1 Pack (10 pieces)",
    //         price: 500,
    //         discountPrice: null,
    //     },
    //     {
    //         id: 2,
    //         image: "https://via.placeholder.com/60",
    //         name: "2 * 1 Pack (10 pieces)",
    //         price: 1000,
    //         discountPrice: 900,
    //     },
    // ];

    useEffect(() => {
        if (product) {
            const cart = JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
            const existingProduct = cart.items?.find((item: any) => item.id === product._id);
            setQuantity(existingProduct ? existingProduct.quantity : 0);
        }
    }, [product]);

    const handleAddToCart = (product: any, quantity: number) => {
        let cart = JSON.parse(localStorage.getItem("cart") || '{"items": [], "totalAmount": 0}');
        const existingProductIndex = cart.items.findIndex((item: any) => item.id === product._id);

        const cartItem = {
            id: product._id.toString(),
            name: product.name,
            image: product.images[0],
            price: product.sellingPrice,
            quantity: quantity,
        };

        if (existingProductIndex !== -1) {
            // If the product exists, update its quantity
            cart.items[existingProductIndex].quantity = quantity;
        } else {
            // If the product does not exist, add it to the cart
            cart.items.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        dispatch(addToCart(cartItem));
    };


    const handleRemoveFromCart = (product: any) => {
        let cart = JSON.parse(localStorage.getItem("cart") || '{"items": [], "totalAmount": 0}');
        cart.items = cart.items.filter((item: any) => item.id !== product._id); // Remove product
        localStorage.setItem("cart", JSON.stringify(cart));
        setQuantity(0);
        dispatch(removeFromCart(product._id.toString()));

    };

    const handleAdd = (product: any) => {
        setQuantity(1);
        handleAddToCart(product, 1);
    };

    const handleIncrement = (product: any) => {
        setQuantity((prev) => {
            const newQuantity = prev + 1;
            handleAddToCart(product, newQuantity); // Save the updated quantity
            return newQuantity;
        });
    };

    const handleDecrement = (product: any) => {
        setQuantity((prev) => {
            if (prev > 1) {
                const newQuantity = prev - 1;
                handleAddToCart(product, newQuantity); // Save the updated quantity
                return newQuantity;
            }
            handleRemoveFromCart(product);
            return 0;
        });
    };

    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">
            <div className="relative w-full max-w-xs p-6 bg-white rounded-lg shadow-lg sm:max-w-sm md:max-w-[34rem] lg:max-w-xl">
                <button
                    onClick={onClose}
                    className="absolute text-gray-600 top-3 right-3 hover:text-gray-800"
                >
                    <Icon icon="line-md:close-circle-filled" width="24" height="24" />
                </button>

                <h2 className="mb-4 text-lg font-semibold">{product?.name}</h2>

                <div className="space-y-4">
                    {/* {products.map((product) => ( */}
                    <div key={product._id} className="flex flex-row items-center justify-between gap-4 rounded-lg md:gap-0">
                        <div className="lg:w-[20%] md:w-[24%] w-[37%]">
                            {product?.images?.length > 0 && (
                                <div className="bg-[#D9F3F4] flex items-center justify-center p-3 rounded-lg">
                                    <img src={`https://api-bhansa.webstudiomatrix.com/${product?.images[0]}`} alt={product.name} className="w-24 h-18 rounded-md lg:w-20 lg:h-20 md:w-[88px] md:h-20" />
                                </div>

                            )}
                        </div>
                        <div className="lg:w-[80%] md:w-[75%] w-[63%] md:ml-0 ml-1 flex md:flex-row flex-col md:justify-evenly justify-start md:items-center items-start gap-1">
                            <div className="flex-1 ml-0 md:ml-4">
                                <p className="text-base font-medium md:text-sm line-clamp-2">{product.name}</p>
                            </div>

                            <div className="mr-4 text-left md:text-right">
                                {product.sellingPrice ? (
                                    <div className="flex flex-col items-center gap-1 md:flex-row md:gap-2">
                                        <span className="text-sm md:ml-0 ml-[-20px] text-gray-400 line-through md:text-sm">Rs.{product.basePrice}</span>
                                        <p className="text-sm font-semibold text-gray-700 md:text-sm">Rs.{product.sellingPrice}</p>
                                    </div>
                                ) : (
                                    <p className="font-semibold text-black">Rs.{product.sellingPrice}</p>
                                )}
                            </div>
                            {quantity === 0 ? (
                                <button
                                    onClick={() => handleAdd(product)}
                                    className="lg:px-6 md:mt-0 mt-1 md:px-5 px-4 py-[6px] md:py-2 text-sm font-semibold text-[#4F7743] transition-colors duration-300 bg-white border border-[#4F7743] rounded-lg hover:bg-[#4F7743] hover:text-white"
                                >
                                    ADD
                                </button>
                            ) : (
                                <div className="flex items-center md:gap-2 gap-4 md:px-3 px-3 py-2 bg-[#539818] rounded-lg text-white">
                                    <button onClick={() => handleDecrement(product)} className="text-xl font-bold md:text-lg">-</button>
                                    <span className="text-base font-semibold md:text-sm lg:text-base">{quantity}</span>
                                    <button onClick={() => handleIncrement(product)} className="text-xl font-bold md:text-lg">+</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
