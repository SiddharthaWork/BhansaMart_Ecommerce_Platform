// import React from 'react'
import Flashsale from '../../../assets/images/home/flashsale.svg'
import dealsImg1 from '../../../assets/images/home/dealsimg1.png'
import dealsImg2 from '../../../assets/images/home/dealsimg2.png'
import dealsImg3 from '../../../assets/images/home/dealsimg3.png'
import dealsImg4 from '../../../assets/images/home/dealsimg4.png'


const Deals = () => {
    const dealsData = [
        {
            img: dealsImg1,
            altText: 'Toy Deals'
        },
        {
            img: dealsImg2,
            altText: 'Groceries Sale'
        }, {
            img: dealsImg3,
            altText: 'Drink Deals'
        }, {
            img: dealsImg4,
            altText: 'Beauty Sale'
        },

    ]
    return (
        <div className='px-6 pt-8 pb-6 lg:px-24 md:px-16'>
            <div className='flex flex-col gap-12'>
                <div className='flex items-center justify-center'>
                    <img src={Flashsale} alt='Flash Sale' className='w-[15rem] h-auto xl:w-[26rem] xl:h-auto md:w-[22rem] md:h-auto' />
                </div>
                <div className='grid items-center w-full grid-cols-2 gap-4 px-8 sm:px-16 lg:px-0 md:grid-cols-4'>
                    {dealsData.map((item, index) => (
                        <div key={index} className='overflow-hidden rounded-2xl'>
                            <img src={item.img} alt={item.altText} className='object-contain' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Deals
