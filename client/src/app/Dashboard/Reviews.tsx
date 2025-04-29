import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ReviewDialog from "./components/ReviewDialog";
import useFetchUserById from "../../hooks/useFetchUserById";
import { useReviewProductMutation } from "../../redux/api/rest/authApi";
import { toast } from "react-toastify";
import Pagination from "../../components/shared/Pagination";
import Loading from "../../components/shared/Loading";


const Reviews: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{
        product: string;
        user: string;
        rating?: number;
        reviewText?: string;
    } | null>(null);

    const [pagePending, setPagePending] = useState(1);
    const [pageReviewed, setPageReviewed] = useState(1);
    const [limit, setLimit] = useState(4);

    const { data: user, isLoading, refetch } = useFetchUserById();

    const [reviewProduct] = useReviewProductMutation();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const userOrders = user?.getUser?.orders || [];

    const userOrderedProducts = userOrders.flatMap((order: any) => order.orderedProducts) || [];

    const totalReviews = userOrderedProducts.length;
    const totalPagePending = Math.ceil(totalReviews / limit);



    const userReviews = user?.getUser?.reviews || [];
    console.log("userReviews", userReviews)

    const userReviewedProducts = userReviews.map((review: any) => review.product._id);
    console.log("userreviewdProduct", userReviewedProducts);

    const totalReviewedProducts = userReviewedProducts.length;
    const totalPagesReviewed = Math.ceil(totalReviewedProducts / limit);
    console.log("totalPagesReviewed:", totalPagesReviewed);


    const pendingProducts = userOrderedProducts.filter((orderedProduct: any) => !userReviewedProducts.includes(orderedProduct?.product?._id));

    const paginatedProductsPending = pendingProducts.slice((pagePending - 1) * limit, pagePending * limit);

    const paginatedProductsReviewed = userOrderedProducts
        .filter((orderedProduct: any) => userReviewedProducts.includes(orderedProduct?.product?._id))
        .map((orderedProduct: any) => {
            const matchingReview = userReviews.find(
                (review: any) => review.product._id === orderedProduct.product._id
            );
            return {
                ...orderedProduct,
                product: {
                    ...orderedProduct.product,
                    name: matchingReview?.product?.name || "No Name Available",
                },
            };
        })
        .slice((pageReviewed - 1) * limit, pageReviewed * limit);

    const userId = user?.getUser?._id;

    console.log("userOrder", userOrders);
    console.log("userId", userId);
    // console.log("reviewedProduct", paginatedProductsReviewed)


    const handleOpen = (productId: string) => {
        setSelectedProduct({
            product: productId,
            user: userId,
            rating: 4,
            reviewText: ""
        })
        setDialogOpen(true)
    };
    const handleClose = () => setDialogOpen(false);

    const handleSubmit = async (review: { product: string, user: string, rating: number; reviewText: string; }) => {
        console.log("Submitted Review:", review);
        try {
            const res = await reviewProduct(review).unwrap();

            if (res?.success) {
                toast.success("Product Reviewed successfully!");
                refetch();
            }

        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to Review Product, Try Again");

        }
    };
    const handlePageChange = (tab: number, { page, limit }: { page: number, limit: number }) => {
        if (tab === 0) {
            setPagePending(page);
        } else if (tab === 1) {
            setPageReviewed(page);
        }
        setLimit(limit);
    };

    return (
        <div className="p-4">
            {isLoading &&
                <Loading />}
            <h2 className="mt-3 text-xl font-semibold tracking-wide md:text-xl lg:text-2xl">
                My Reviews
            </h2>
            <Tabs
                value={activeTab}
                onChange={handleChange}
                aria-label="custom styled tabs"
                sx={{
                    marginBottom: "20px",
                    marginTop: "15px",
                    "& .MuiTabs-indicator": {
                        display: "none",
                    },
                }}
            >
                <Tab
                    label="Pending"
                    sx={{
                        border: "1px solid",
                        borderColor: activeTab === 0 ? "#4CAF50" : "#BDBDBD",
                        color: activeTab === 0 ? "#4CAF50 !important" : "#757575",
                        backgroundColor: activeTab === 0 ? "#f3fff4" : "transparent",
                        borderRadius: "10px",
                        padding: "5px 15px",
                        textTransform: "none",
                        fontWeight: "bold",
                        marginRight: '10px',
                        minWidth: "auto",
                        minHeight: "40px",
                        height: "40px",
                    }}
                />
                <Tab
                    label="Reviewed"
                    sx={{
                        border: "1px solid",
                        borderColor: activeTab === 1 ? "#4CAF50" : "#BDBDBD",
                        color: activeTab === 1 ? "#4CAF50 !important" : "#757575",
                        backgroundColor: activeTab === 1 ? "#f3fff4" : "transparent",
                        borderRadius: "10px",
                        padding: "5px 15px",
                        textTransform: "none",
                        fontWeight: "bold",
                        minWidth: "auto",
                        minHeight: "40px",
                        height: "40px",
                    }}
                />
            </Tabs>
            {/* {isLoading &&
                <div>
                    <p>Loading Coupons</p>
                </div>
                } */}
            <div className="flex flex-col gap-4">
                {activeTab === 0 ? (
                    paginatedProductsPending
                        .map((orderedProduct: any, index: number) => (
                            <div key={`${orderedProduct?.product?._id}-${index}`}
                                className="flex flex-row items-center gap-3 pb-2 border-b border-gray-300 justify-evenly md:justify-between">
                                <div className="md:w-[80%] w-[75%] flex flex-row gap-4">
                                    <div className="md:w-[15%] w-[18%] bg-gray-200 bg-opacity-75 rounded-lg flex items-center justify-center">
                                        <img src={`https://api-bhansa.webstudiomatrix.com/${orderedProduct?.product?.images[0]}`} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 md:w-12 md:h-12" />
                                    </div>
                                    <div className="lg:w-[85%] w-[82%] pt-[1%]">
                                        <h2 className="font-medium mb-1 lg:text-[15px] md:text-sm text-[13px] line-clamp-1">{orderedProduct?.product?.name}</h2>
                                        <p className="lg:text-[13px] md:text-xs text-[11px] text-gray-600">Quantity: {orderedProduct?.quantity}</p>
                                    </div>
                                </div>
                                <div className="md:w-[20%] w-[25%]">
                                    <button
                                        onClick={() => handleOpen(orderedProduct?.product?._id)}
                                        className="bg-[#2C5F2D] lg:py-[6px] md:py-[5px] py-1 md:text-[13px] text-xs lg:text-sm rounded-lg md:px-5 px-4 lg:px-6 text-white">
                                        Review Now
                                    </button>
                                </div>
                            </div>
                        ))

                ) : (
                    <div className="flex flex-col gap-4">
                        {paginatedProductsReviewed.map((products: any, index: number) => (
                            <div key={`${products?.product?._id}-${index}`} className="flex flex-row items-center gap-3 pb-2 border-b border-gray-300 justify-evenly md:justify-between">
                                <div className="md:w-[80%] w-[72%] flex flex-row gap-4">
                                    <div className="md:w-[15%] w-[18%] bg-gray-200 bg-opacity-75 rounded-lg flex items-center justify-center">
                                        <img src={`https://api-bhansa.webstudiomatrix.com/${products?.product?.images[0]}`} className="w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 md:w-12 md:h-12" />
                                    </div>
                                    <div className="lg:w-[85%] w-[82%] pt-[1%]">
                                        <h2 className="font-medium mb-1 lg:text-[15px] md:text-sm text-[13px] line-clamp-1">{products?.product?.name}</h2>
                                        <p className="lg:text-[13px] md:text-xs text-[11px] text-gray-600">Quantity: {products.quantity}</p>
                                    </div>
                                </div>
                                <div className="md:w-[20%] w-[28%]">
                                    <button
                                        disabled
                                        // onClick={handleOpen}
                                        className="bg-[#539818] bg-opacity-10  text-[#539818] lg:py-[6px] md:py-[5px] py-1 border border-[#539818] md:text-[13px] text-xs lg:text-sm rounded-lg md:px-5 px-2 lg:px-6">
                                        Reviewed
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <ReviewDialog open={dialogOpen} handleClose={handleClose}
                handleSubmit={(reviewText: string, rating: number) => handleSubmit({ product: selectedProduct!.product, user: selectedProduct!.user, reviewText, rating })}
            />

            {activeTab === 0 && pendingProducts.length > 4 && (
                <div className="flex items-center justify-center w-full pb-10">
                    <Pagination
                        totalPage={totalPagePending}
                        currentPage={pagePending}
                        limit={limit}
                        onClick={(pageInfo) => handlePageChange(0, pageInfo)}
                    />
                </div>
            )}
            {activeTab === 1 && userReviewedProducts.length > 4 && (
                <div className="flex items-center justify-center w-full pb-10">
                    <Pagination
                        totalPage={totalPagesReviewed}
                        currentPage={pageReviewed}
                        limit={limit}
                        onClick={(pageInfo) => handlePageChange(1, pageInfo)}
                    />
                </div>
            )}
        </div>
    )
}

export default Reviews;
