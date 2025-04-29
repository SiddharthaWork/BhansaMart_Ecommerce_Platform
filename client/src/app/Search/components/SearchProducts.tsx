import { useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../redux/api/graphqlBaseApi";
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../../Home/components/ProductCard";
import { addToCart } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import Pagination from "../../../components/shared/Pagination";
import NoProductsImg from "../../../assets/images/extras/noProducts1.jpg"
import Loading from "../../../components/shared/Loading";

const SearchProducts: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(15);


    const { data, error, isLoading } = useGetAllProductsQuery({
        page,
        limit,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        setPage(1);
    }, [query]);

    // Memoize filtered products to prevent unnecessary re-renders
    const filteredProducts = useMemo(() => {
        // if (!query.trim()) return data?.getAllProducts?.products || [];
        if (!query.trim()) return [];

        return data?.getAllProducts?.products?.filter((product: any) =>
            product.name.toLowerCase().includes(query)
        ) || [];
    }, [query, data]);

    const handlePageChange = ({ page, limit }: { page: number, limit: number }) => {
        setPage(page);
        setLimit(limit);
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
                <div className="px-6 pt-4 pb-6 lg:px-24 md:px-16">
                    {query ? "Loading Products..." : ""}
                </div>
            </div>

        );
    }

    if (error) {
        return (
            <div className="px-6 pt-4 pb-6 lg:px-24 md:px-16">
                Error fetching Products
            </div>
        );
    }

    // const products = data?.getAllProducts?.products || [];

    // const filteredProducts = products.filter((product: any) =>
    //     product.name.toLowerCase().includes(query)
    // );

    const handleAddToCart = (productId: string, quantity: number) => {
        const productdata = filteredProducts.find((p: any) => p._id === productId);

        if (productdata) {
            const cartItem = {
                id: productdata._id.toString(),
                name: productdata.name,
                image: productdata.images[0] || "",
                price: productdata.sellingPrice - productdata.discountPrice,
                quantity: quantity,
            };
            dispatch(addToCart(cartItem));
        }
    };

    return (
        <div className="relative w-full h-full px-6 py-3 md:px-14 lg:px-24 lg:py-4">
            {query &&
                <h2 className="mt-4 mb-5">Search Results for: {query}</h2>
            }
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-[6px] sm:gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {filteredProducts.map((product: any, index: number) => (
                        <div key={product._id || index}>
                            <ProductCard
                                product={product}
                                onAdd={handleAddToCart}
                                customStyles="w-[95%] shadow-custom-x shadow-custom-y bg-[#FCFCFC]"
                            />
                        </div>
                    ))
                    }
                </div>
            ) : (
                query &&
                <div className="flex flex-col items-center justify-center w-full h-full text-center">
                    <div className="flex lg:mt-[-10px] md:mt-8 mt-14 items-center relative justify-center lg:w-[35%] md:w-[40%] w-[50%]">
                        <img src={NoProductsImg} className="object-contain w-full h-full cursor-not-allowed" />
                    </div>
                    <p className="mt-4 text-sm text-gray-600 lg:text-lg md:text-base lg:mt-0 md:mt-4"> No Products found for : <span className="text-camarone">{query}</span></p>

                </div>
            )
            }

            {filteredProducts.length > 0 && query && (
                <div className="flex items-center justify-center w-full pb-10">
                    <Pagination
                        totalPage={data?.getAllProducts?.totalPages || 1}
                        currentPage={page}
                        limit={limit}
                        onClick={handlePageChange}
                    />
                </div>
            )}

        </div>
    )
}

export default SearchProducts;
