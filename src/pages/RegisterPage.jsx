import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {
    const navigate = useNavigate();

    // State để lưu thông tin nhập vào
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Hàm xử lý khi gõ phím
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Hàm xử lý khi bấm nút Đăng Ký
    const handleRegister = (e) => {
        e.preventDefault(); // Chặn reset trang

        // 1. Kiểm tra mật khẩu nhập lại có khớp không
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        // 2. Giả lập đăng ký thành công
        console.log("Thông tin đăng ký:", formData);
        alert("Đăng ký thành công! Vui lòng đăng nhập.");

        // 3. Chuyển hướng về trang Login
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">

                {/* Tiêu đề */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Tạo tài khoản mới
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Trở thành thành viên của Eyewear ngay hôm nay
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="rounded-md shadow-sm space-y-4">

                        {/* Tên hiển thị */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Họ và Tên</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm mt-1"
                                placeholder="Nguyễn Văn A"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm mt-1"
                                placeholder="name@example.com"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm mt-1"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Nhập lại Mật khẩu */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nhập lại mật khẩu</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm mt-1"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Nút Đăng ký */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                        >
                            ĐĂNG KÝ
                        </button>
                    </div>

                    {/* Link quay lại đăng nhập */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;