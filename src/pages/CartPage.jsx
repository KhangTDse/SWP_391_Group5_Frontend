import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // 1. Load dữ liệu từ LocalStorage khi mới vào trang
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    // Helper: Hàm cập nhật giỏ hàng và lưu vào LocalStorage
    const updateCartData = (newCart) => {
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        // Bắn sự kiện để các component khác (như Header) biết dữ liệu đã đổi
        window.dispatchEvent(new Event("storage"));
    };

    // 2. Logic Tăng/Giảm số lượng
    const handleQuantityChange = (id, amount) => {
        const newCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + amount;
                // Nếu giảm xuống 0 thì giữ là 1 (muốn xóa thì bấm nút xóa riêng)
                return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
        });
        updateCartData(newCart);
    };

    // 3. Logic Xóa sản phẩm
    const handleRemove = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ?")) {
            const newCart = cartItems.filter(item => item.id !== id);
            updateCartData(newCart);
        }
    };

    // 4. Helper: Chuyển đổi giá tiền từ chuỗi "3.500.000₫" sang số 3500000 để tính toán
    const parsePrice = (priceString) => {
        if (!priceString) return 0;
        return parseInt(priceString.replace(/\./g, "").replace("₫", ""));
    };

    // 5. Tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => {
        return total + parsePrice(item.price) * item.quantity;
    }, 0);

    // 6. Xử lý thanh toán (Demo)
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Giỏ hàng đang trống!");
            return;
        }
        const currentUser = localStorage.getItem("currentUser"); // Giả sử bạn lưu user khi login
        if (!currentUser) {
            alert("Vui lòng đăng nhập để thanh toán!");
            navigate("/login");
            return;
        }
        alert("Đang chuyển đến trang thanh toán...");
        // Sau này sẽ navigate qua trang Checkout
    };

    // GIAO DIỆN: Nếu giỏ hàng trống
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng của bạn đang trống</h2>
                <Link to="/shop" className="mt-4 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 font-bold transition">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    // GIAO DIỆN: Nếu có sản phẩm
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ Hàng ({cartItems.length})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CỘT TRÁI: LIST SẢN PHẨM */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
                                {/* Ảnh */}
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md bg-gray-100" />

                                {/* Thông tin */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-amber-600 font-bold mt-1">{item.price}</p>
                                </div>

                                {/* Bộ chỉnh số lượng & Xóa */}
                                <div className="flex flex-col items-center sm:items-end gap-2">
                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                        <button onClick={() => handleQuantityChange(item.id, -1)} className="px-3 py-1 hover:bg-gray-100">-</button>
                                        <span className="px-3 py-1 font-medium min-w-[30px] text-center">{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
                                    </div>
                                    <button onClick={() => handleRemove(item.id)} className="text-red-500 text-sm underline hover:text-red-700">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CỘT PHẢI: TỔNG TIỀN */}
                    <div className="h-fit bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Đơn Hàng</h3>

                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Tạm tính:</span>
                            <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
                        </div>
                        <div className="flex justify-between mb-6 text-gray-600">
                            <span>Phí vận chuyển:</span>
                            <span className="text-green-600 font-medium">Miễn phí</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between items-center mb-6">
                            <span className="text-lg font-bold">Tổng cộng:</span>
                            <span className="text-2xl font-bold text-amber-600">{totalPrice.toLocaleString('vi-VN')}₫</span>
                        </div>

                        <button onClick={handleCheckout} className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-amber-600 transition shadow-lg">
                            THANH TOÁN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;