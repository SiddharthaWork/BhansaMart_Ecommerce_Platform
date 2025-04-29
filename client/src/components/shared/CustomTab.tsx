import React, { useEffect, useMemo, useRef, useState } from "react";
// import ProductCard from "../../app/Home/components/ProductCard";
// import CauliImg from "../../assets/images/extras/cauliimg.png";
// import { ProductDialog } from "../../app/Home/components/ProductDialog";
import { useGetProductsBycategoryQuery } from "../../redux/api/graphqlBaseApi";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import { imgUrl } from "../../constant/constant";
// import ProductCardDialog from "../../app/Home/components/ProductCardDialog";
import ProductCard from "../../app/Home/components/ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import NoProductsImg from "../../assets/images/extras/noProducts1.jpg"
import Loading from "./Loading";

interface SubCategoryType {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    images: string[];
}
interface CategoryType {
    _id: string;
    name: string;
    description: string;
    isActive: boolean;
    images: string[];
    subCategories: SubCategoryType[];

}

interface TabProps {
    tabs: CategoryType[];
    setTab: (tabValue: string) => void;
}

const CustomTabs: React.FC<TabProps> = ({ tabs, setTab }) => {

    const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.name || '');
    const [subActiveIndex, setSubActiveIndex] = useState<number | null>(null);
    // const [dialogOpen, setDialogOpen] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategoryType | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [maxVisibleTabs, setMaxVisibleTabs] = useState(4);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);

    const [sortOption, setSortOption] = useState("relevance");

    const dispatch = useDispatch();
    const location = useLocation();



    useEffect(() => {
        if (location.state?.selectedCategory) {
            setActiveTab(location.state.selectedCategory);
            setPage(1);
        }
    }, [location.state]);

    // const handleDialogOpen = (product: any) => {
    //     setSelectedProduct(product);
    //     setDialogOpen(true);
    // }

    useEffect(() => {
        setTab(tabs?.[0]?.description);
    }, [tabs, setTab]);

    useEffect(() => {
        const updateTabCount = () => {
            const width = window.innerWidth;
            if (width >= 1280) setMaxVisibleTabs(9); // Large screens (xl+)
            else if (width >= 1024) setMaxVisibleTabs(8); // Medium screens (lg)
            else if (width >= 768) setMaxVisibleTabs(7);
            else if (width >= 540) setMaxVisibleTabs(6); // Small screens (md)
            else if (width >= 400) setMaxVisibleTabs(4); // Small screens (md)
            else setMaxVisibleTabs(3); // Extra small screens (sm and below)
        };

        updateTabCount();
        window.addEventListener("resize", updateTabCount);
        return () => window.removeEventListener("resize", updateTabCount);
    }, []);

    const handleClick = (e: React.MouseEvent, newActiveTab: string, activeTabValue: string) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
        setTab(activeTabValue);
        setSubActiveIndex(null);
        setSelectedSubCategory(null);
        setShowDropdown(false);
        setPage(1);

    };
    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const visibleTabs = tabs.slice(0, maxVisibleTabs);
    const overflowTabs = tabs.slice(maxVisibleTabs);


    const handleSubCategoryClick = (index: number, subCategory: SubCategoryType) => {
        setSubActiveIndex(index);
        setSelectedSubCategory(subCategory);
        setPage(1);
        console.log("selectedSubcategory", subCategory)
    };

    const getSortField = useMemo(() => (option: string) => {
        switch (option) {
            case "name":
                return "name";
            case "hightolow":
            case "lowtohigh":
                return "sellingPrice";
            default:
                return "createdAt"; // Default sorting by latest products
        }
    }, []);

    const getSortOrder = useMemo(() => (option: string) => {
        switch (option) {
            case "name":
                return 1; // Ascending (A → Z)
            case "hightolow":
                return -1; // Descending (High → Low)
            case "lowtohigh":
                return 1; // Ascending (Low → High)
            default:
                return -1; // Default: newest first
        }
    }, []);

    const { data, error, isLoading } = useGetProductsBycategoryQuery({
        categoryId: tabs?.find(tab => tab.name === activeTab)?._id || '',
        subCategoryId: selectedSubCategory?._id || '',
        brandId: '',
        page,
        limit,
        sortBy: getSortField(sortOption),
        sortOrder: getSortOrder(sortOption),
    });


    const handlePageChange = ({ page, limit }: { page: number, limit: number }) => {
        setPage(page);
        setLimit(limit);
    };


    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value);
    };


    const sortedProducts = useMemo(() => {
        if (!data?.getProductsByCategory?.products) return [];

        let allProducts = [...data?.getProductsByCategory?.products];

        const activeProducts = allProducts.filter(product => product?.status === "Active");

        return activeProducts;
    }, [data]);

    // const totalPage = Math.ceil(data?.getProductsByCategory?.products?.length / limit) || 1;
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


    return (
        <div className="flex flex-col items-center justify-between w-full gap-[6px] bg-white">
            <div className="flex flex-row w-full bg-[#FCFCFC] px-2 md:px-14 lg:px-24 shadow-custom-x">
                {visibleTabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`flex md:py-3 py-2 lg:py-4 items-center border gap-2 md:px-3 px-2 lg:px-4 cursor-pointer ${activeTab === tab.name
                            ? `bg-gray-100 text-black border border-none`
                            : "text-gray-600 border-none"
                            }`}
                        onClick={(e) => handleClick(e, tab.name, tab.description)}
                    >
                        {/* {tab.icon && <span className="text-[12px] scale-125">{tab.icon}</span>} */}
                        <span className="text-[11px] md:text-base">{tab.name}</span>
                    </div>
                ))}
                {overflowTabs.length > 0 && (
                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex text-[11px] md:text-base items-center gap-2 px-3 py-2 text-gray-600 shadow-sm hover:bg-gray-100 hover:text-black"
                            onClick={handleDropdownToggle}
                        >
                            More
                            {/* <ChevronDownIcon className="w-4 h-4" /> */}
                        </div>

                        {showDropdown && (
                            <div className="absolute left-0 z-10 w-auto mt-2 ml-[-10px] bg-white border border-gray-300 rounded-md shadow-lg">
                                {overflowTabs.map((tab) => (
                                    <div
                                        key={tab.name}
                                        className="px-3 text-gray-700 py-2 cursor-pointer md:text-sm sm:text-xs text-[12px] hover:bg-gray-100"
                                        onClick={(e) => handleClick(e, tab.name, tab.description)}
                                    >
                                        {tab.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="w-full pb-10">
                {tabs.map((tab) => {
                    if (tab.name === activeTab) {
                        return <div key={tab.name} className="w-full h-full">
                            <div className="flex flex-row justify-between h-full gap-2">
                                <div className="w-[25%] pl-1 md:pl-12 lg:pl-20 h-full">
                                    <div className="flex flex-col h-full bg-white items-left shadow-custom-x">
                                        {tabs?.find((category) => category.name === activeTab)?.subCategories.map((subCategory: any, index: number) => (
                                            <div key={subCategory._id}
                                                onClick={() => handleSubCategoryClick(index, subCategory)} className={`flex flex-row items-center gap-3 lg:p-3 md:p-2 p-2 cursor-pointer ${subActiveIndex === index ? "bg-[#EBFFEF]" : ""}`}>
                                                {subCategory?.images?.length > 0 && (
                                                    <div className="hidden lg:w-11 lg:h-11 md:w-10 md:h-10 md:flex">
                                                        <img src={`${imgUrl}${subCategory?.images[0]}`} alt={subCategory.name} className="hidden w-full h-full transition-all duration-300 ease-in-out md:flex hover:scale-110" />
                                                    </div>
                                                )}
                                                <p className="text-[10px] lg:text-base md:text-sm">{subCategory.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-[75%] flex flex-col gap-4 bg-white">
                                    <div className="flex flex-row items-center justify-between w-full px-2 py-3 bg-white md:px-3 md:py-4 lg:py-5 shadow-custom-x">
                                        <h2 className="text-xs font-medium tracking-wide md:text-base lg:text-lg">
                                            Buy {selectedSubCategory?.name || `${activeTab} Products`}
                                        </h2>
                                        <div className="flex flex-col items-end justify-center gap-1 md:items-center md:gap-3 md:flex-row">
                                            <p className="text-xs lg:text-base md:text-sm">Sort by</p>
                                            <select className="text-[#407417] border-none outline-none ring-0 text-xs md:text-sm lg:text-base w-[80%] md:w-[60%]"
                                                value={sortOption}
                                                onChange={handleSortChange}>
                                                <option value="relevance">Relevance</option>
                                                <option value="name">Name</option>
                                                <option value="hightolow">Price High to Low</option>
                                                <option value="lowtohigh">Price Low to High</option>
                                                {/* <option value="newcoming">New comings</option> */}
                                            </select>
                                        </div>

                                    </div>
                                    <div className="bg-[#ffffff]">
                                        {isLoading ? (
                                            <Loading />
                                            // <p>Loading products...</p>
                                        ) : error ? (
                                            <p>Error fetching products</p>
                                        ) : sortedProducts?.length > 0 ? (
                                            <div className="grid grid-cols-2 gap-2 pl-1 pr-3 sm:gap-4 sm:pr-10 sm:grid-cols-2 md:pr-16 lg:pr-20 md:grid-cols-3 lg:grid-cols-4">
                                                {sortedProducts.map((product: any, index: number) => (
                                                    <div key={product._id || index}>
                                                        {/* <ProductCardDialog product={product} customStyles="bg-white shadow-custom-x w-full h-full" dialog={true} onOpenDialog={() => handleDialogOpen(product)} /> */}
                                                        <ProductCard product={product} customStyles="bg-white shadow-custom-x w-full h-full" onAdd={handleAddToCart} />

                                                    </div>
                                                ))
                                                }
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center w-full h-full p-5 text-center">
                                                <div className="flex lg:mt-[0px] md:mt-4 mt-6 items-center relative justify-center lg:w-[35%] md:w-[40%] w-[50%]">
                                                    <img src={NoProductsImg} alt="No Products Available" className="object-contain w-full h-full cursor-not-allowed" />
                                                </div>
                                                <p className="mt-2 text-sm text-gray-600 hover:text-camarone lg:text-lg md:text-base lg:mt-1 md:mt-3"> No Products Available </p>

                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>


                        </div>

                    }
                    return null;
                })}

            </div>
            {/* {dialogOpen && <ProductDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} product={selectedProduct} />} */}
            <div className="flex items-center justify-center w-full pb-10">
                <Pagination
                    totalPage={data?.getProductsByCategory?.totalPages}
                    currentPage={page}
                    limit={limit}
                    onClick={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CustomTabs;
