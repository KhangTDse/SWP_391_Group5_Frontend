import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        note: ""
    });

    // 1. Load giỏ hàng & thông tin user khi vào trang
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Nếu giỏ hàng trống thì đá về trang Shop
        if (storedCart.length === 0) {
            alert("Giỏ hàng trống! Vui lòng mua hàng trước.");
            navigate("/shop");
        }
        setCartItems(storedCart);

        // Tự động điền tên nếu đã đăng nhập
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
            setFormData(prev => ({ ...prev, fullName: currentUser.name || "" }));
        }
    }, [navigate]);

    // 2. Tính tổng tiền
    const parsePrice = (priceStr) => parseInt(priceStr.replace(/\./g, "").replace("₫", ""));
    const totalPrice = cartItems.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);

    // 3. Xử lý nhập form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 4. XỬ LÝ ĐẶT HÀNG (QUAN TRỌNG)
    const handlePlaceOrder = (e) => {
        e.preventDefault();

        // Validate đơn giản
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        // Tạo object Đơn hàng
        const newOrder = {
            id: Date.now(), // Mã đơn hàng ngẫu nhiên theo thời gian
            customer: formData,
            items: cartItems,
            total: totalPrice,
            date: new Date().toLocaleString(),
            status: "Pending" // Trạng thái chờ xử lý (để Admin duyệt)
        };

        // Lấy danh sách đơn hàng cũ ra (để lưu chung cho Admin xem)
        const currentOrders = JSON.parse(localStorage.getItem("orders")) || [];
        currentOrders.push(newOrder);

        // LƯU VÀO LOCAL STORAGE
        localStorage.setItem("orders", JSON.stringify(currentOrders)); // Lưu đơn hàng
        localStorage.setItem("cart", JSON.stringify([])); // Xóa sạch giỏ hàng

        // Bắn sự kiện để Header cập nhật lại số lượng giỏ hàng về 0
        window.dispatchEvent(new Event("storage"));

        alert("🎉 ĐẶT HÀNG THÀNH CÔNG!\nCảm ơn bạn đã mua sắm tại Falcon Eyewear.");
        navigate("/"); // Về trang chủ
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Thanh Toán & Đặt Hàng</h1>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* --- CỘT TRÁI: THÔNG TIN GIAO HÀNG --- */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">1. Thông tin giao hàng</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                                <input
                                    type="text" name="fullName" required
                                    value={formData.fullName} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                                <input
                                    type="tel" name="phone" required
                                    value={formData.phone} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                                    placeholder="0912 xxx xxx"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ nhận hàng *</label>
                                <textarea
                                    name="address" required rows="3"
                                    value={formData.address} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                                    placeholder="Số nhà, đường, phường/xã..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (Tùy chọn)</label>
                                <input
                                    type="text" name="note"
                                    value={formData.note} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
                                    placeholder="Giao giờ hành chính, gọi trước khi giao..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: TÓM TẮT ĐƠN HÀNG --- */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">2. Đơn hàng của bạn</h2>

                            {/* List sản phẩm rút gọn */}
                            <div className="max-h-64 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                                <img src={item.image} alt="product" className="w-full h-full object-cover"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 truncate w-40">{item.name}</p>
                                                <p className="text-gray-500">x{item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-gray-700">{item.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Tạm tính:</span>
                                    <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Phí vận chuyển:</span>
                                    <span className="text-green-600 font-medium">Miễn phí</span>
                                </div>
                            </div>

                            <div className="border-t mt-4 pt-4 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                                <span className="text-2xl font-bold text-amber-600">{totalPrice.toLocaleString('vi-VN')}₫</span>
                            </div>
                        </div>

                        {/* Phương thức thanh toán (Mock) */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Phương thức thanh toán</h3>
                            <div className="flex items-center gap-3 p-3 border border-amber-500 bg-amber-50 rounded-lg cursor-pointer">
                                <input type="radio" checked readOnly className="text-amber-600" />
                                <span className="font-medium text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 px-1">Bạn chỉ phải thanh toán khi đã nhận được hàng và kiểm tra sản phẩm.</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-600 transition shadow-lg transform active:scale-95"
                        >
                            ĐẶT HÀNG NGAY ({totalPrice.toLocaleString('vi-VN')}₫)
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;