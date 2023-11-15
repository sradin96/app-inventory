import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useRef } from "react";

type SwiperRef = typeof Swiper | null;

const Banner = () => {
	const sliderRef = useRef<SwiperRef>(null);
	const dealRef = useRef<SwiperRef>(null);

  const handleSlidePrev = () => {
    if (sliderRef.current) {
      // sliderRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="banner">
      <div className="wrap">
        <div className="banner__container">
          <div className="banner__slider">
						<button type="button" onClick={handleSlidePrev}>Prev</button>
            <Swiper
        			// ref={sliderRef}
              modules={[Pagination, Navigation]}
              spaceBetween={50}
              slidesPerView={1}
      				pagination={{ clickable: true }}
              onSlideChange={() => {}}
              onSwiper={(swiper: any) => {}}
            >
              <SwiperSlide className="banner__slider-slide">
                <Link className="banner__slider-holder" to="">
									<img className="banner__slider-img" src="https://mediamodifier.com/blog/wp-content/uploads/2020/03/online-mockup-generator-mediamodifier.jpeg" alt="" />
								</Link>
              </SwiperSlide>
              <SwiperSlide className="banner__slider-slide">
                <Link className="banner__slider-holder" to="">
									<img className="banner__slider-img" src="https://mediamodifier.com/blog/wp-content/uploads/2020/03/online-mockup-generator-mediamodifier.jpeg" alt="" />
								</Link>
              </SwiperSlide>
            </Swiper>
						<button type="button" onClick={handleSlidePrev}>Prev</button>
          </div>
          <div className="banner__deal">
            <Swiper
              modules={[Navigation]}
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => {}}
              onSwiper={(swiper: any) => {}}
            >
              <SwiperSlide>
                <Link to="">1</Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to="">2</Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
