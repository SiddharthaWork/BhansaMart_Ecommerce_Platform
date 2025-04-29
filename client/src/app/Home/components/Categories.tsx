import categoryAll from '../../../assets/images/home/categoryAll.svg'
// import categoryBeauty from '../../../assets/images/home/categoryBeauty.svg'
// import categoryGifts from '../../../assets/images/home/categoryGifts.svg'
// import categoryGroceries from '../../../assets/images/home/categoryGroceries.svg'
// import categoryKids from '../../../assets/images/home/categoryKids.svg'
// import categoryStationary from '../../../assets/images/home/categoryStationary.svg'
import { useNavigate } from 'react-router-dom'
import { useGetAllCategoriesQuery } from '../../../redux/api/graphqlBaseApi'
import Loading from '../../../components/shared/Loading';


const Categories = () => {

    // const { data, isLoading } = useGetAllProductsQuery(undefined);
    const { data, isLoading } = useGetAllCategoriesQuery(undefined);


    const navigate = useNavigate();

    const handleRoute = (categoryName: string) => {
        const selectedCategory = categoryName === "All" ? "" : categoryName;
        navigate("/categories", { state: { selectedCategory } });
        console.log("tabCategory", selectedCategory)
    }


    // const categoryData = [
    //     {
    //         img: categoryAll,
    //         title: 'All'
    //     },
    //     {
    //         img: categoryGroceries,
    //         title: 'Groceries'
    //     }, {
    //         img: categoryBeauty,
    //         title: 'Beauty'
    //     }, {
    //         img: categoryKids,
    //         title: 'Kids'
    //     }, {
    //         img: categoryGifts,
    //         title: 'Gifts'
    //     }, {
    //         img: categoryStationary,
    //         title: 'Stationary'
    //     },


    // ]

    const categoryList = [
        { name: "All", images: [categoryAll] },
        ...(data?.getAllCategories || [])
    ];




    return (
        <div className='px-6 pt-2 pb-6 lg:px-24 md:px-16'>
            <div className='flex flex-col gap-5'>
                <h2 className='text-lg font-medium lg:text-2xl md:text-xl'>Product Categories</h2>
                {isLoading &&
                    <div>
                        <Loading />
                        Loading categories...
                    </div>
                }

                <div className='grid items-center justify-between h-full grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    {/* {categoryData.map((item, index) => (
                        <div onClick={handleRoute} key={index} className={`md:px-5 md:py-6 px-3 py-4 rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-custom-x ${index % 2 === 0 ? "bg-[#FDF3EB]" : "bg-[#EBF1F5]"}`}>
                            <img src={item.img} alt={item.title} className='md:w-[55%] md:h-[55%] sm:w-[40%] sm:h-[40%] w-[35%] h-[35%]' />
                            <p className='text-sm lg:text-lg md:text-base'>{item.title}</p>
                        </div>
                    ))} */}
                    {/* {data?.getAllCategories?.map((item: any, index: number) => ( */}
                    {categoryList.map((item, index) => (
                        <div onClick={() => handleRoute(item?.name)} key={index} className={`h-full md:px-5 md:py-6 px-3 py-4 rounded-lg flex flex-col items-center justify-center gap-4 cursor-pointer hover:shadow-custom-x ${index % 2 === 0 ? "bg-[#FDF3EB]" : "bg-[#EBF1F5]"}`}>

                            {item.images?.length > 0 && (
                                <img
                                    src={
                                        item.name === "All"
                                            ? categoryAll
                                            : item.images?.[0]?.startsWith("http")
                                                ? item.images[0]
                                                : `https://api-bhansa.webstudiomatrix.com/${item.images[0]}`
                                    }
                                    alt={item.name}
                                    className="md:w-[6rem] md:h-[5rem] sm:w-[5rem] sm:h-[4rem] w-[4rem] h-[3rem]"
                                />

                                // <img src={`https://api-bhansa.webstudiomatrix.com/${item.images[0]}`} alt={item.name} className='md:w-[9rem] md:h-[6rem] sm:w-[7rem] sm:h-[5rem] w-[5rem] h-[3rem]' />
                            )}
                            <p className='text-sm lg:text-lg md:text-base line-clamp-2'>{item?.name}</p>
                        </div>
                    ))}


                </div>
            </div>

        </div >
    )
}

export default Categories
