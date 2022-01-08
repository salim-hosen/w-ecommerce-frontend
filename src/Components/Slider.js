// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Link } from "react-router-dom";

export default () => {
  return (
    <section className="relative">
      <div>
        <img src="images/slider-bg.jpg" alt="Slider Image" />
      </div>
      <div className="h-full absolute z-10 w-full flex items-center top-0">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-indigo-600 text-xl md:text-3xl font-bold">
                Sale 20% Off
            </h1>
            <h1 className="text-gray-800 text-xl md:text-3xl font-bold">
                On Everything
            </h1>
            <p className="hidden md:block py-5 max-w-lg">
              Explicabo esse amet tempora quibusdam laudantium, laborum eaque
              magnam fugiat hic? Esse dicta aliquid error repudiandae earum
              suscipit fugiat molestias, veniam, vel architecto veritatis
              delectus repellat modi impedit sequi.
            </p>
            <div className="mt-2">
              <Link to="/products" className="inline-block px-3 py-1 md:px-10 md: py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-indigo-600 text-xl md:text-3xl font-bold">
                Sale 10% Off
            </h1>
            <h1 className="text-gray-800 text-xl md:text-3xl font-bold">
                On Everything
            </h1>
            <p className="hidden md:block py-5 max-w-lg">
              Explicabo esse amet tempora quibusdam laudantium, laborum eaque
              magnam fugiat hic? Esse dicta aliquid error repudiandae earum
              suscipit fugiat molestias, veniam, vel architecto veritatis
              delectus repellat modi impedit sequi.
            </p>
            <div className="mt-2">
              <Link to="/products" className="inline-block px-3 py-1 md:px-10 md: py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      </div>
    </section>
  );
};
