// import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

import bannerimg1 from '../../../assets/images/home/bannerimg1.png';
import bannerimg2 from '../../../assets/images/home/bannerimg2.png';
import bannerimg3 from '../../../assets/images/home/bannerimg3.png';
import bannerimg4 from '../../../assets/images/home/bannerimg4.png';
import bannerimg5 from '../../../assets/images/home/bannerimg5.png';
import bannerimg6 from '../../../assets/images/home/bannerimg6.png';
import Button from '../../../components/shared/Button';



const Banner = () => {

    const navigate = useNavigate();

    const handleShopNow = (route: string) => {
        navigate(route)
    }

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1100,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    }

    const bannerData = [
        {
            img: bannerimg1,
            title: 'Home Essentials',
            desc: "Every you need, just a click away!",
            linkTo: "/categories",
            btnTextColor: 'text-[#617B47]'
        },
        {
            img: bannerimg2,
            title: 'Daily Fresh Veggies',
            desc: "Fresh, Farm-Fresh Veggies Delivered to Your Door!",
            linkTo: "/categories",
            btnTextColor: 'text-[#cc8c52]'
        },
        {
            img: bannerimg3,
            title: 'Pure Dairy Goodness',
            desc: "Indulge in rich, creamy dairy goodness every day!",
            linkTo: "/categories",
            btnTextColor: 'text-[#498EB6]'
        },
        {
            img: bannerimg4,
            title: 'Shine Bright',
            desc: "Beauty that shines from within, with every product!",
            linkTo: "/categories",
            btnTextColor: 'text-[#DC6976]'
        },
        {
            img: bannerimg5,
            title: 'Tools for Creativity',
            desc: "Organize your desk with premium stationery products!",
            linkTo: "/categories",
            btnTextColor: 'text-black'
        },
        {
            img: bannerimg6,
            title: 'Gifts for Everyone',
            desc: "Find the perfect gift for every occasion!",
            linkTo: "/categories",
            btnTextColor: 'text-[#7A1D97]'
        },

    ]


    return (
        <div className="relative w-full h-full px-6 py-3 md:px-14 lg:px-24 lg:py-4">
            <Slider className="flex flex-row overflow-hidden rounded-xl" {...settings}>
                {bannerData.map((item, index) => (
                    <div key={index} className='relative overflow-hidden rounded-xl'>
                        <div className='w-full lg:h-[35vh] h-[25vh] rounded-xl overflow-hidden'>
                            <img
                                src={item.img}
                                alt="Banner"
                                loading="lazy"
                                className="w-full h-full rounded-xl"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-start justify-center pl-5 text-center text-white md:pl-14 lg:pl-24">
                            <h2 className="mb-1 text-xl font-semibold text-left lg:mb-2 lg:text-4xl md:text-3xl">{item.title}</h2>
                            <p className="flex flex-wrap gap-1 mb-2 text-sm tracking-wider text-left md:mb-3 lg:text-lg md:text-base md:gap-2">
                                <span>{item.desc}</span>
                            </p>
                            <Button
                                aria-label={`Shop Now for ${item.title}`}
                                className={`bg-white font-medium text-sm text-[#617B47] md:py-2 py-[4px] lg:px-4 md:px-3 px-3 rounded-lg ${item.btnTextColor}`}
                                buttonText="Shop Now"
                                onClick={() => handleShopNow(item.linkTo)}
                            />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
