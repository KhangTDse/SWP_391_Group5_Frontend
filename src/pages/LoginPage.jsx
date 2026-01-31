import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // MOCK TÀI KHOẢNG ADMIN 
    const adminAccount = {
            email: "admin@gmail.com",
            password: "123456",
            role: "admin",
    };

    

    // 🔒 Khóa scroll khi vào trang login
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login info:", email, password);

        alert("Đăng nhập thành công (demo)");
        // CHECK ADMIN
        if (email == adminAccount.email && password == adminAccount.password){
            navigate("/dashboard");
            return;
        }
        navigate("/");
    };

    const handleGoogleLogin = () => {
        alert("Đăng nhập Google (demo)");
        navigate("/");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Chào mừng trở lại
                    </h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Đăng nhập để tiếp tục mua sắm
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleLogin}>
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        required
                        placeholder="Mật khẩu"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-amber-600 transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">hoặc</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Đăng nhập với Google
                    </span>
                </button>

                {/* Footer */}
                <p className="text-center text-sm text-gray-600 mt-6">
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="text-amber-600 font-medium hover:underline"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
