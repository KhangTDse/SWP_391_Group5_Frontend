import { useState } from "react";
import glassesImg from "../image/img1.png";
import glassesImg1 from "../image/images.jpg";
import glassesImg2 from "../image/getty-images-t00PsxNOJrg-unsplash.jpg";

/* ===== DATA (đổi text thoải mái sau này) ===== */
const sliderData = [
  {
    id: 1,
    title: "Modern Eyewear Collection",
    desc: "Minimal design crafted for everyday comfort",
    image: glassesImg2,
  },
  {
    id: 2,
    title: "Premium Optical Experience",
    desc: "Designed for clarity, durability, and style",
    image: glassesImg,
  },
  {
    id: 3,
    title: "Seasonal Limited Selection",
    desc: "Exclusive designs available for a short time",
    image: glassesImg2,
  },
];

const services = [
  {
    title: "Eyewear Care Service",
    desc: "Professional maintenance available nationwide",
  },
  {
    title: "Fast Nationwide Delivery",
    desc: "Quick and reliable shipping across the country",
  },
  {
    title: "Upgrade & Trade Program",
    desc: "Support for upgrading your eyewear collection",
  },
  {
    title: "Vision Support",
    desc: "Expert assistance at all brand locations",
  },
];

function HomePage() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="w-full">
      {/* ===== SLIDER ===== */}
      {/* ===== SLIDER ===== */}
      <section className="relative w-full h-[460px] overflow-hidden bg-white">
        {/* Image */}
        <img
          key={current}
          src={sliderData[current].image}
          alt={sliderData[current].title}
          className="w-full h-full object-contain bg-white transition-all duration-700 ease-in-out"
        />

        {/* Overlay nhẹ để chữ rõ */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

        {/* Content */}
        <div
          key={`content-${current}`}
          className="absolute inset-0 flex flex-col justify-center
               px-16 md:px-24
               max-w-3xl
               text-white animate-fadeUp pointer-events-none"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {sliderData[current].title}
          </h2>

          <p className="text-sm md:text-base opacity-90">
            {sliderData[current].desc}
          </p>
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-6 top-1/2 -translate-y-1/2
               w-14 h-14 rounded-full
               bg-white/90 backdrop-blur-md
               border border-gray-200
               flex items-center justify-center
               text-2xl font-medium
               shadow-lg
               hover:scale-110 hover:bg-white
               transition z-20"
        >
          ‹
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-6 top-1/2 -translate-y-1/2
               w-14 h-14 rounded-full
               bg-white/90 backdrop-blur-md
               border border-gray-200
               flex items-center justify-center
               text-2xl font-medium
               shadow-lg
               hover:scale-110 hover:bg-white
               transition z-20"
        >
          ›
        </button>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        {services.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Explore Our Eyewear System
          </h2>

          <p className="text-gray-600 mb-10">
            Discover premium eyewear collections or find a store near you.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button className="px-8 py-3 bg-black text-white uppercase tracking-widest text-sm hover:opacity-80 transition">
              Buy Now
            </button>

            <button className="px-8 py-3 border border-black text-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition">
              Find Nearest Store
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
