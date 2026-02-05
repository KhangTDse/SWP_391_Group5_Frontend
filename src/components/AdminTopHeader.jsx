import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiChevronRight } from "react-icons/fi";

function AdminTopHeader({ title, subtitle, breadcrumb = [] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`
        sticky top-0 z-40
        transition-all duration-300
        ${scrolled ? "backdrop-blur-md bg-white/80 shadow-sm" : "bg-transparent"}
      `}
    >
      <div className="px-6 pt-4">
        {/* TOP ROW */}
        <div className="flex justify-between items-center">
          {/* TITLE + BREADCRUMB */}
          <div>
            <AnimatePresence mode="wait">
              <motion.h1
                key={title}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </motion.h1>
            </AnimatePresence>

            {/* Breadcrumb */}
            {breadcrumb.length > 0 && (
              <div className="mt-1 flex items-center text-xs text-gray-500 gap-1">
                {breadcrumb.map((item, index) => (
                  <span key={index} className="flex items-center gap-1">
                    {index !== 0 && <FiChevronRight className="text-gray-400" />}
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            )}

            {subtitle && (
              <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
            )}
          </div>

          {/* RIGHT AREA */}
          <div className="flex items-center gap-4">
            {/* SEARCH */}
            <div className="relative hidden md:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="
                  w-56 pl-9 pr-3 py-1.5 text-sm
                  rounded-lg border border-gray-200
                  bg-gray-50
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                "
              />
            </div>

            {/* DIVIDER */}
            <div className="h-6 w-px bg-gray-200" />

            {/* USER MENU */}
            <div
              ref={menuRef}
              className="relative flex items-center gap-2 cursor-pointer select-none"
              onClick={() => setOpen((prev) => !prev)}
            >
              <img
                src="https://www.shutterstock.com/image-photo/create-imageiphone-memoji-avatar-style-600nw-2683889647.jpg"
                alt="admin"
                className="w-8 h-8 rounded-full ring-1 ring-transparent hover:ring-blue-500 transition"
              />

              <div className="hidden sm:block text-xs leading-tight">
                <p className="font-medium text-gray-800">Hoang Vo</p>
                <p className="text-gray-500">admin@eyewear.com</p>
              </div>

              {/* DROPDOWN */}
              <motion.div
                initial={false}
                animate={
                  open
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.96, y: -4 }
                }
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-52 bg-white rounded-lg shadow-xl border border-gray-200 z-50 origin-top-right"
                style={{ pointerEvents: open ? "auto" : "none" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-2">
                  <p className="font-medium text-sm text-gray-800">Hoang Vo</p>
                  <p className="text-xs text-gray-500">admin@eyewear.com</p>
                </div>

                <div className="h-px bg-gray-200 mx-4" />

                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 transition"
                >
                  Hồ sơ
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition rounded-b-lg"
                >
                  Đăng xuất
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM DIVIDER */}
        <div className="mt-3 h-px bg-gray-200" />
      </div>
    </div>
  );
}

export default AdminTopHeader;
