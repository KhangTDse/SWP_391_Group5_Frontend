import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function RegisterPage() {
  const navigate = useNavigate();

  // 🔒 Khóa scroll khi ở trang register
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    console.log("Thông tin đăng ký:", formData);
    alert("Đăng ký thành công! Vui lòng đăng nhập.");

    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Tạo tài khoản mới
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Trở thành thành viên của Eyewear ngay hôm nay
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          <input
            name="name"
            type="text"
            required
            placeholder="Họ và tên"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            required
            placeholder="Mật khẩu"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={handleChange}
          />

          <input
            name="confirmPassword"
            type="password"
            required
            placeholder="Nhập lại mật khẩu"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-amber-600 transition"
          >
            Đăng ký
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-amber-600 font-medium hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
