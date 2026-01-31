import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ProductDetailPage() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL (để sau này gọi API)
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    // Dữ liệu giả lập (Mock data) cho đẹp
    const product = {
        id: id,
        name: "Kính Râm Ray-Ban Classic Aviator",
        price: "3.500.000₫",
        description: "Mẫu kính phi công huyền thoại, gọng kim loại vàng sang trọng, tròng kính xanh rêu chống tia UV tuyệt đối. Phù hợp cho cả nam và nữ.",
        images: [
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        colors: ["Vàng Gold", "Đen Nhám", "Bạc Silver"]
    };

    const handleAddToCart = () => {
        // Kiểm tra đăng nhập (Logic cũ của bạn)
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để mua hàng!");
            navigate('/login');
            return;
        }
        alert(`Đã thêm ${quantity} sản phẩm vào giỏ!`);
    };

    return (
        <div className="container mx-auto px-4 py-8 font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* CỘT TRÁI: ẢNH SẢN PHẨM */}
                <div className="space-y-4">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* CỘT PHẢI: THÔNG TIN */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-2xl text-amber-600 font-semibold mt-2">{product.price}</p>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4">
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Chọn màu sắc */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
                        <div className="flex items-center space-x-3 mt-2">
                            {product.colors.map((color, index) => (
                                <button
                                    key={index}
                                    className="px-4 py-2 border rounded-md hover:border-amber-500 hover:text-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chọn số lượng */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">Số lượng</h3>
                        <div className="flex items-center mt-2 w-32">
                            <button
                                className="w-10 h-10 border rounded-l-md bg-gray-50 hover:bg-gray-200"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >-</button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="w-12 h-10 border-t border-b text-center focus:outline-none"
                            />
                            <button
                                className="w-10 h-10 border rounded-r-md bg-gray-50 hover:bg-gray-200"
                                onClick={() => setQuantity(quantity + 1)}
                            >+</button>
                        </div>
                    </div>

                    {/* Nút Mua Hàng */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-amber-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-amber-700 transition-all shadow-md transform active:scale-95"
                        >
                            THÊM VÀO GIỎ
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-500">
                            ❤️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;