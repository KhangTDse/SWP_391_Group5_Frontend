import { useState } from "react";
import { FiX, FiPackage, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "unisex",
    frameMaterial: "",
    color: "",
    size: "",
    lensType: "",
    price: "",
    salePrice: "",
    stock: "",
    sku: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.price) return;

    onAdd({
      id: Date.now(),
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      stock: Number(form.stock),
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 40 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[92vh] overflow-y-auto"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-2">
              <FiPackage className="text-blue-600" />
              <h2 className="font-semibold text-lg">Thêm sản phẩm mới</h2>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* BASIC INFO */}
            <Section title="Thông tin cơ bản">
              <Input
                label="Tên sản phẩm"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                label="Thương hiệu"
                name="brand"
                value={form.brand}
                onChange={handleChange}
              />
              <Select
                label="Danh mục"
                name="category"
                value={form.category}
                onChange={handleChange}
                options={["Kính mát", "Kính cận", "Gọng kính", "Tròng kính"]}
              />
              <Select
                label="Giới tính"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                options={["unisex", "male", "female"]}
              />
            </Section>

            {/* TECH INFO */}
            <Section title="Thông số kỹ thuật">
              <Input
                label="Chất liệu gọng"
                name="frameMaterial"
                value={form.frameMaterial}
                onChange={handleChange}
              />
              <Input
                label="Màu sắc"
                name="color"
                value={form.color}
                onChange={handleChange}
              />
              <Input
                label="Kích thước (VD: 52-18-140)"
                name="size"
                value={form.size}
                onChange={handleChange}
              />
              <Input
                label="Loại tròng"
                name="lensType"
                value={form.lensType}
                onChange={handleChange}
              />
            </Section>

            {/* BUSINESS */}
            <Section title="Thông tin kinh doanh">
              <Input
                label="Giá"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
              <Input
                label="Giá khuyến mãi"
                name="salePrice"
                type="number"
                value={form.salePrice}
                onChange={handleChange}
              />
              <Input
                label="Tồn kho"
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
              />
              <Input
                label="SKU"
                name="sku"
                value={form.sku}
                onChange={handleChange}
              />
            </Section>

            {/* IMAGE */}
            <div>
              <label className="text-sm text-gray-600 mb-2 block">
                Hình ảnh sản phẩm
              </label>

              <div className="flex gap-6 items-start">
                <div className="w-28 h-28 border rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiImage className="text-gray-400 text-3xl" />
                  )}
                </div>

                <input
                  name="image"
                  placeholder="Dán link ảnh vào đây..."
                  value={form.image}
                  onChange={handleChange}
                  className="flex-1 border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
            >
              Huỷ
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Lưu sản phẩm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* COMPONENTS giữ nguyên */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-1 block">{label}</label>
      <select
        {...props}
        className="w-full border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Chọn...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddProductModal;
