import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState({ name: '', phone: '', address: '' });
    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod | banking

    // Lấy dữ liệu giỏ hàng và User khi vào trang
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);

        // Nếu giỏ hàng trống thì đá về trang chủ
        if (storedCart.length === 0) {
            navigate('/');
        }

        // Tự động điền thông tin nếu user đã đăng nhập
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setUserInfo({
                ...userInfo,
                name: storedUser.name || '',
                phone: storedUser.phone || '', // Giả sử user có lưu sđt
            });
        }
    }, [navigate]);

    // Tính tổng tiền
    const subtotal = cart.reduce((total, item) => total + (parseInt(item.price.replace(/\./g, '').replace('₫', '')) * item.quantity), 0);
    const shippingFee = 30000; // Phí ship cố định
    const total = subtotal + shippingFee;

    const handleOrder = (e) => {
        e.preventDefault();

        if (!userInfo.name || !userInfo.phone || !userInfo.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        // 1. Xử lý đặt hàng thành công (Ở đây chỉ mô phỏng)
        // Lưu đơn hàng vào localStorage nếu cần quản lý lịch sử đơn hàng
        // const newOrder = { id: Date.now(), items: cart, total: total, ...userInfo, method: paymentMethod };

        // 2. Xóa giỏ hàng
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event("storage")); // Cập nhật số lượng trên Header

        // 3. Chuyển sang trang Cảm ơn
        navigate('/order-success');
    };

    return (
        <div className="container mx-auto px-4 py-8 font-sans">
            <h1 className="text-3xl font-bold mb-8 text-center">Thanh Toán & Đặt Hàng</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            📍 Thông tin giao hàng
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500"
                                    placeholder="Nguyễn Văn A"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500"
                                    placeholder="0912345678"
                                    value={userInfo.phone}
                                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ nhận hàng</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500"
                                    rows="3"
                                    placeholder="Số nhà, Đường, Phường/Xã..."
                                    value={userInfo.address}
                                    onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            💳 Phương thức thanh toán
                        </h2>
                        <div className="space-y-3">
                            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                    className="mr-3 accent-amber-600"
                                />
                                <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                            </label>

                            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'banking' ? 'border-amber-500 bg-amber-50' : ''}`}>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="banking"
                                    checked={paymentMethod === 'banking'}
                                    onChange={() => setPaymentMethod('banking')}
                                    className="mr-3 accent-amber-600"
                                />
                                <span className="font-medium">Chuyển khoản ngân hàng (QR Code)</span>
                            </label>

                            {/* Hiển thị thông tin chuyển khoản nếu chọn Banking */}
                            {paymentMethod === 'banking' && (
                                <div className="mt-4 p-4 bg-gray-50 rounded border text-sm text-gray-600">
                                    <p>Ngân hàng: <strong>MB Bank</strong></p>
                                    <p>STK: <strong>0333666999</strong></p>
                                    <p>Chủ TK: <strong>FALCON STORE</strong></p>
                                    <p>Nội dung: <strong>SDT_DatHang</strong></p>
                                    <p className="mt-2 text-amber-600 italic">* Vui lòng chụp màn hình chuyển khoản để đối soát.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: TỔNG KẾT ĐƠN HÀNG */}
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn ({cart.length} món)</h2>

                        <div className="max-h-80 overflow-y-auto pr-2 space-y-4 mb-4">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold line-clamp-1 w-40">{item.name}</p>
                                            <p className="text-xs text-gray-500">x{item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-bold text-gray-700">{item.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Tạm tính</span>
                                <span>{subtotal.toLocaleString()}₫</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Phí vận chuyển</span>
                                <span>{shippingFee.toLocaleString()}₫</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-amber-600 pt-2 border-t mt-2">
                                <span>Tổng cộng</span>
                                <span>{total.toLocaleString()}₫</span>
                            </div>
                        </div>

                        <button
                            onClick={handleOrder}
                            className="w-full mt-6 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            ĐẶT HÀNG NGAY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;