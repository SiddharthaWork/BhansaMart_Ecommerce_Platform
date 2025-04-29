import React from 'react'
import { Coupon } from "../Coupons";
import { toast } from 'react-toastify';

interface CollectedCouponCardProps extends Coupon {
    buttonDisable?: boolean;
}

const CollectedCouponCard: React.FC<CollectedCouponCardProps> = ({
    // id,
    couponCode,
    couponType,
    value,
    minPurchase,
    // maxUsage,
    // perUserLimit,
    expiresOn,
    buttonDisable = false,
}) => {

    const handleCopy = (couponCode?: string) => {
        if (couponCode) {
            navigator.clipboard.writeText(couponCode);
            toast.success("Coupon code copied to clipboard!"); // Optional: Show a confirmation message
        }
    };

    return (
        <div className='flex flex-row gap-3 px-2 py-2 border shadow-custom-x rounded-xl'>
            <div className='w-[35%] flex flex-col items-center justify-center gap-1 border-r-[2px] border-dashed'>
                <p className='lg:text-[19px] md:text-lg text-[17px] text-[#539818] font-semibold'>{value}{couponType === "percentage" ? (
                    <span className='text-[13px] md:text-sm lg:text-[15px]'>% </span>
                ) : (
                    <span className='text-[13px] md:text-sm lg:text-[15px]'>Rs </span>
                )}
                    <span className='text-[13px] md:text-sm lg:text-[15px]'>OFF</span>
                </p>
                <p className='text-xs md:text-[13px] lg:text-[14px]'>Min Spend: <span className='font-semibold md:text-sm text-[13px] lg:text-[15px]'>Rs {minPurchase}</span></p>
            </div>
            <div className='w-[65%] flex flex-col justify-between md:gap-7 gap-4 lg:gap-8 px-1 md:py-2 py-2'>
                <div className='flex flex-row items-center justify-between'>
                    <p className='font-semibold md:text-[15px] text-sm lg:text-base'>Get uptp Rs.150 OFF</p>
                    <span className='lg:text-sm md:text-[13px] text-xs bg-[#F3FAF3] text-[#2C5F2D] rounded-lg px-[10px] py-[2px]'>T&C</span>
                </div>
                <div className='flex flex-col items-start justify-between gap-3'>
                    <p className='lg:text-sm md:text-[13px] text-xs text-gray-700'>Valid Till: {new Date(Number(expiresOn)).toDateString()}</p>
                    {buttonDisable ? (
                        <button onClick={() => handleCopy(couponCode)} disabled className='text-[#539818] bg-[#539818] bg-opacity-5 font-semibold w-full text-sm border px-3 py-[5px] rounded-lg border-[#024756] transition-all duration-300 ease-in-out'>Used</button>
                    ) : (
                        <button onClick={() => handleCopy(couponCode)} className='text-[#539818] bg-[#539818] bg-opacity-5 font-semibold w-full text-sm border px-3 py-[5px] rounded-lg border-[#024756] hover:bg-[#539818] hover:border-[#539818] hover:text-white transition-all duration-300 ease-in-out'>{couponCode}</button>

                    )}
                </div>

            </div>
        </div>
    )
}

export default CollectedCouponCard
