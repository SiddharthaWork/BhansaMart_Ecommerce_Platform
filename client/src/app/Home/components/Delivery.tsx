// import React from 'react'
import deliveryimg1 from "../../../assets/images/home/deliveryimg1.svg";
import deliveryimg2 from "../../../assets/images/home/deliveryimg2.svg"
import deliveryimg3 from "../../../assets/images/home/deliveryimg3.svg"
import deliveryimg4 from "../../../assets/images/home/deliveryimg4.svg"


const Delivery = () => {

    const deliveryData = [
        {
            img: deliveryimg1,
            title: 'Free Delivery',
            desc: 'Get your order delivered for free, every time!'
        },
        {
            img: deliveryimg2,
            title: 'Best Prices Guaranteed',
            desc: 'Shop at the most competitive prices in town!'
        },
        {
            img: deliveryimg3,
            title: 'Hassle-Free Returns',
            desc: 'Return or exchange your products within 3 days!'
        },
        {
            img: deliveryimg4,
            title: 'Fast and Fresh',
            desc: 'Get your order delivered in just 30 minutes!'
        }
    ]
    return (
        <div className='px-6 pt-4 pb-6 lg:px-24 md:px-16'>
            <div className='grid grid-cols-1 gap-6 xl:grid-cols-4 md:grid-cols-2'>
                {deliveryData.map((item, index) => (
                    <div key={index} className='flex flex-row gap-5'>
                        <div className='flex items-center justify-center'>
                            <img src={item.img} alt={item.title} className='object-contain' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h2 className='lg:text-[17px] md:text-base text-sm font-semibold tracking-wide'>{item.title}</h2>
                            <p className='text-xs tracking-wide lg:text-base md:text-sm'>{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Delivery
