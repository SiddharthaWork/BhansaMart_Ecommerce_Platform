import { useParams } from "react-router-dom";
import { useGetProductsBycategoryQuery } from "../../../redux/api/graphqlBaseApi";
import ProductCard from "../../Home/components/ProductCard";
import { addToCart } from "../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Pagination from "../../../components/shared/Pagination";

const Brands = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const dispatch = useDispatch();
    const { brandName, brandId } = useParams();

    const { data, error, isLoading } = useGetProductsBycategoryQuery({
        categoryId: '',
        subCategoryId: '',
        brandId,
        page,
        limit,
        // sortBy,
        // sortOrder,
    });

    const productData = data?.getProductsByCategory?.products || [];
    console.log("brandProduct", productData)


    const handlePageChange = ({ page, limit }: { page: number, limit: number }) => {
        setPage(page);
        setLimit(limit);
    };

    const handleAddToCart = (productId: string, quantity: number) => {
        const selectedProduct = data?.getProductsByCategory?.products?.find((p: any) => p._id === productId);

        if (selectedProduct) {
            const cartItem = {
                id: selectedProduct._id.toString(),
                name: selectedProduct.name,
                image: selectedProduct.images[0],
                price: selectedProduct.sellingPrice,
                // price: selectedProduct.sellingPrice - selectedProduct.discountPrice,
                quantity: quantity,
            };
            dispatch(addToCart(cartItem));
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading products!</p>;
    }

    return (
        <div className="relative w-full h-full px-6 py-3 md:px-14 lg:px-24 lg:py-4">
            <div>
                <div>
                    <h1 className="text-2xl font-bold">All products By <span className="text-green-400">{brandName}</span></h1>
                </div>
                <div className="bg-[#ffffff]">
                    {productData.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 pl-1 pr-3 sm:gap-4 sm:pr-10 sm:grid-cols-3 md:pr-16 lg:pr-20 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {productData.map((product: any, index: number) => (
                                <div key={product._id || index}>
                                    <ProductCard product={product} customStyles="bg-white shadow-custom-x w-full h-full" onAdd={handleAddToCart} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No products found for this brand.</p>

                    )}
                </div>
            </div>
            <div className="flex items-center justify-center w-full pb-10">
                <Pagination
                    totalPage={data?.getProductsByCategory?.totalPages}
                    currentPage={page}
                    limit={limit}
                    onClick={handlePageChange}
                />
            </div>
        </div>
    )
}

export default Brands
