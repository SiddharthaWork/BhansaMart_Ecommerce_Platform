import Loading from '../../../components/shared/Loading';
import { useGetCouponsQuery } from '../../../redux/api/graphqlBaseApi';
import { Coupon } from '../../Dashboard/Coupons';
import { useNavigate } from 'react-router-dom';

const Coupons = () => {
    const { data, isLoading } = useGetCouponsQuery(undefined);

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/login");
    }

    return (
        <div className='px-6 pt-6 pb-6 lg:px-24 md:px-16'>
            <div className="flex flex-row items-center justify-between px-2">
                <h2 className="text-lg font-medium lg:text-2xl md:text-xl">Collect Available Coupons</h2>
                <p className="text-base font-normal cursor-pointer lg:text-xl md:text-lg" onClick={handleNavigate}>See all</p>
            </div>

            {isLoading &&
                <div>
                    <Loading />
                    <p>Loading Coupons</p>
                </div>
            }
            <div className='grid grid-cols-1 gap-4 mt-6 lg:grid-cols-3 sm:grid-cols-2'>
                {data?.getCoupons?.slice(0, 3).map((coupon: Coupon, index: number) => (
                    <div key={index} className='flex flex-row gap-3 px-2 py-2 border shadow-custom-x rounded-xl'>
                        <div className='w-[35%] flex flex-col items-center justify-center gap-1 border-r-[2px] border-dashed'>
                            <p className='lg:text-[19px] md:text-lg text-[17px] text-[#539818] font-semibold'>{coupon?.value}{coupon?.couponType === "percentage" ? (
                                <span className='text-[13px] md:text-sm lg:text-[15px]'>% </span>
                            ) : (
                                <span className='text-[13px] md:text-sm lg:text-[15px]'>Rs </span>
                            )}
                                <span className='text-[13px] md:text-sm lg:text-[15px]'>OFF</span>
                            </p>
                            <p className='text-xs md:text-[13px] lg:text-[14px]'>Min Spend: <span className='font-semibold md:text-sm text-[13px] lg:text-[15px]'>Rs {coupon?.minPurchase}</span></p>
                        </div>
                        <div className='w-[65%] flex flex-col justify-between md:gap-7 gap-4 lg:gap-8 px-1 md:py-3 py-2'>
                            <div className='flex flex-row items-center justify-between'>
                                <p className='font-semibold md:text-[15px] text-sm lg:text-base'>Get uptp Rs.150 OFF</p>
                                <span className='lg:text-sm md:text-[13px] text-xs bg-[#F3FAF3] text-[#2C5F2D] rounded-lg px-[10px] py-[2px]'>T&C</span>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <p className='lg:text-sm md:text-[13px] text-xs text-gray-700'>Valid Till: {new Date(Number(coupon?.expiresOn)).toDateString()}</p>
                                <button onClick={handleNavigate} className='text-[#539818] text-sm border-2 px-3 py-[3px] rounded-lg border-[#539818] hover:bg-[#539818] hover:text-white transition-all duration-300 ease-in-out'>Collect</button>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Coupons
