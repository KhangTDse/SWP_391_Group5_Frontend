import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- 1. Thêm useNavigate

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // <--- 2. Khai báo hook chuyển trang
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login info:", email, password);

        // <--- 3. Giả lập đăng nhập thành công
        // Sau này có API thì thay thế đoạn này sau
        alert("Đăng nhập thành công! Chào mừng bạn quay lại.");

        // Chuyển hướng về trang chủ để mua hàng
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-gray-100">

                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Chào mừng trở lại
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Đăng nhập để trải nghiệm mua sắm tốt nhất
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                                placeholder="Địa chỉ Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mật khẩu</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Ghi nhớ đăng nhập
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                                Quên mật khẩu?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-300"
                        >
                            Đăng Nhập
                        </button>
                    </div>
                </form>

                {/* Footer - ĐÃ SỬA CHỖ NÀY */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Chưa có tài khoản?{' '}
                        {/* Thay thẻ span bằng Link để bấm vào chuyển trang */}
                        <Link to="/register" className="font-medium text-amber-600 hover:text-amber-500 cursor-pointer">
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;