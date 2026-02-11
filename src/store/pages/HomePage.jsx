import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link và useNavigate
/* LƯU Ý: Đảm bảo bạn vẫn giữ các hình ảnh này trong thư mục image */
import glassesImg from "../image/img1.png";
import glassesImg1 from "../image/images.jpg";
import glassesImg2 from "../image/getty-images-t00PsxNOJrg-unsplash.jpg";

/* ===== DATA SLIDER (Banner chính) ===== */
const sliderData = [
  {
    id: 1,
    title: "Modern Eyewear Collection",
    desc: "Thiết kế tối giản, tinh tế cho sự thoải mái hàng ngày.",
    image: glassesImg2,
  },
  {
    id: 2,
    title: "Premium Optical Experience",
    desc: "Trải nghiệm hình ảnh rõ nét với tròng kính công nghệ cao.",
    image: glassesImg1,
  },
  {
    id: 3,
    title: "Seasonal Limited Selection",
    desc: "Bộ sưu tập giới hạn dành riêng cho mùa hè này.",
    image: glassesImg,
  },
];

/* ===== DATA SẢN PHẨM NỔI BẬT ===== */
const featuredProducts = [
  {
    id: 1,
    name: "Classic Round Ray-Ban",
    price: "2.500.000đ",
    category: "Unisex",
    img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Matte Black Wayfarer",
    price: "3.200.000đ",
    category: "Men",
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Titanium Gold Frame",
    price: "4.500.000đ",
    category: "Women",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Blue Light Filter Lens",
    price: "1.800.000đ",
    category: "Office",
    img: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

/* ===== DATA DỊCH VỤ ===== */
const services = [
  {
    title: "Bảo Dưỡng Kính",
    desc: "Vệ sinh và nắn chỉnh kính miễn phí trọn đời.",
  },
  {
    title: "Giao Hàng Nhanh",
    desc: "Miễn phí vận chuyển cho đơn hàng trên 1 triệu.",
  },
  { title: "Thu Cũ Đổi Mới", desc: "Trợ giá lên đời kính mới cực hấp dẫn." },
  {
    title: "Đo Mắt Miễn Phí",
    desc: "Kỹ thuật viên chuyên nghiệp, máy móc hiện đại.",
  },
];

function HomePage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // <--- CẬP NHẬT LOGIC MỚI Ở ĐÂY (Check currentUser thay vì isLoggedIn)
  const handleAddToCart = (e, productName) => {
    // Ngăn không cho sự kiện click lan ra ngoài
    e.stopPropagation();

    // 1. Lấy user từ localStorage
    const storedUser = localStorage.getItem("currentUser");

    // 2. Nếu không có user -> Bắt đăng nhập
    if (!storedUser) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ!");
      navigate("/login");
    } else {
      // 3. Nếu có user -> Thành công
      const user = JSON.parse(storedUser);
      alert(`Đã thêm ${productName} vào giỏ hàng!\n(Khách hàng: ${user.name || user.email})`);
    }
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

  return (
      <main className="w-full font-sans text-gray-800">
        {/* ===== 1. SLIDER SECTION ===== */}
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-100">
          <div className="w-full h-full relative">
            <img
                key={current}
                src={sliderData[current].image}
                alt={sliderData[current].title}
                className="w-full h-full object-cover md:object-contain object-center transition-all duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent md:via-black/10" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 max-w-4xl text-white">
          <span className="text-amber-400 font-bold tracking-widest uppercase mb-2 text-sm md:text-base animate-fadeIn">
            New Collection 2026
          </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              {sliderData[current].title}
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg drop-shadow-md">
              {sliderData[current].desc}
            </p>

            <button className="w-fit px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full shadow-lg hover:shadow-amber-500/50 transition-all transform hover:-translate-y-1">
              Khám Phá Ngay
            </button>
          </div>

          <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white border border-white/30 flex items-center justify-center backdrop-blur-sm transition"
          >
            ❮
          </button>
          <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white border border-white/30 flex items-center justify-center backdrop-blur-sm transition"
          >
            ❯
          </button>
        </section>

        {/* ===== 2. FEATURED PRODUCTS (SẢN PHẨM NỔI BẬT) ===== */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sản Phẩm Nổi Bật
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4">
              Những mẫu kính được yêu thích nhất tháng này
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
                <div
                    key={product.id}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer"
                >
                  {/* <--- 2. THÊM LINK ĐỂ CHUYỂN SANG TRANG CHI TIẾT */}
                  {/* Bấm vào vùng ảnh sẽ chuyển trang */}
                  <Link to={`/product/${product.id}`}>
                    <div className="relative h-64 overflow-hidden bg-gray-50">
                      <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md text-gray-800">
                    {product.category}
                  </span>

                      {/* NÚT ADD TO CART */}
                      <button
                          onClick={(e) => handleAddToCart(e, product.name)} // Truyền thêm 'e' để chặn sự kiện
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-amber-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg whitespace-nowrap z-10"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </Link>

                  <div className="p-5 text-center">
                    {/* Bấm vào tên sản phẩm cũng chuyển trang */}
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-amber-600 font-bold text-lg">
                      {product.price}
                    </p>
                  </div>
                </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 font-bold uppercase tracking-widest hover:bg-gray-800 hover:text-white transition rounded-md">
                Xem Tất Cả Sản Phẩm
              </button>
            </Link>
          </div>
        </section>

        {/* ===== 3. SERVICES SECTION ===== */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            {services.map((item, index) => (
                <div
                    key={index}
                    className="text-center p-6 hover:bg-white hover:shadow-lg rounded-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl mb-4">
                    ✦
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
            ))}
          </div>
        </section>

        {/* ===== 4. CTA SECTION ===== */}
        <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative max-w-4xl mx-auto text-center px-6 z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Tìm Chiếc Kính Hoàn Hảo Của Bạn
            </h2>
            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Hàng ngàn mẫu gọng kính và tròng kính chất lượng cao đang chờ bạn
              khám phá. Đặt lịch đo mắt ngay hôm nay.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/shop">
                <button className="px-8 py-4 bg-amber-600 text-white uppercase font-bold tracking-widest rounded-lg hover:bg-amber-500 transition shadow-lg shadow-amber-900/50">
                  Mua Ngay
                </button>
              </Link>
              <button className="px-8 py-4 border border-gray-600 text-white uppercase font-bold tracking-widest rounded-lg hover:bg-white hover:text-black transition">
                Tìm Cửa Hàng Gần Nhất
              </button>
            </div>
          </div>
        </section>
      </main>
  );
}

export default HomePage;