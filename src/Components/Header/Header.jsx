import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './header.css';

export default function Header(props) {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    const allTrending = props.allTrending;
    return (
        <>
            <header className=' position-relative'>

                <div className="slider-header row justify-content-center">
                    <Slider {...settings} className="col-11">
                        {allTrending.map((trend) => {
                            return <img className=' w-100' key={trend.id} src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} alt="" />
                        })}
                    </Slider>
                </div>

            </header>
        </>
    )
}
