import { useState } from "react";
import { FiX, FiPackage, FiImage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    type: "",
    name: "",
    brand: "",
    gender: "unisex",
    price: "",
    salePrice: "",
    stock: "",
    sku: "",
    image: "",
    specs: {},
  });

  /* ========================= HANDLE CHANGE ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setForm({
        type: value,
        name: "",
        brand: "",
        gender: "unisex",
        price: "",
        salePrice: "",
        stock: "",
        sku: "",
        image: "",
        specs: {},
      });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      specs: {
        ...form.specs,
        [name]: value,
      },
    });
  };

  /* ========================= SUBMIT ========================= */
  const handleSubmit = () => {
    if (!form.name || !form.type || !form.price) return;

    const categoryMap = {
      kinhmat: "Kính mát",
      gongkinh: "Gọng kính",
      trongkinh: "Tròng kính",
    };

    onAdd({
      id: Date.now(),
      ...form,
      category: categoryMap[form.type], // 👈 thêm dòng này
      img: form.image, // 👈 nếu table dùng img
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      stock: Number(form.stock),
    });

    onClose();
  };

  /* ========================= RENDER TYPE ========================= */
  const renderTypeFields = () => {
    switch (form.type) {
      case "kinhmat":
        return (
          <Section title="Thông tin kính mát">
            <Input
              label="Màu tròng"
              name="lensColor"
              onChange={handleSpecChange}
            />
            <Input
              label="Chống UV"
              name="uvProtection"
              onChange={handleSpecChange}
            />
            <Input
              label="Polarized"
              name="polarized"
              onChange={handleSpecChange}
            />
          </Section>
        );

      case "gongkinh":
        return (
          <Section title="Thông tin gọng kính">
            <Input
              label="Chất liệu gọng"
              name="frameMaterial"
              onChange={handleSpecChange}
            />
            <Input
              label="Kích thước (VD: 52-18-140)"
              name="size"
              onChange={handleSpecChange}
            />
            <Input label="Màu gọng" name="color" onChange={handleSpecChange} />
          </Section>
        );

      case "trongkinh":
        return (
          <Section title="Thông tin tròng kính">
            <Input
              label="Chiết suất (1.56 / 1.67 / 1.74)"
              name="lensIndex"
              onChange={handleSpecChange}
            />
            <Input
              label="Chống ánh sáng xanh"
              name="blueLight"
              onChange={handleSpecChange}
            />
            <Input label="Chống UV" name="uv" onChange={handleSpecChange} />
          </Section>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="backdrop"
        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{
            opacity: 0,
            scale: 0.85,
            y: 80,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-4xl rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.18)] relative max-h-[95vh] flex flex-col"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-5 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50">
                <FiPackage className="text-blue-600 text-lg" />
              </div>
              <h2 className="font-semibold text-xl text-gray-800">
                Thêm sản phẩm mới
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-8 space-y-10 overflow-y-auto custom-scroll">
            <Section title="Loại sản phẩm">
              <Select
                label="Chọn loại"
                name="type"
                value={form.type}
                onChange={handleChange}
                options={[
                  { label: "Kính mát", value: "kinhmat" },
                  { label: "Gọng kính", value: "gongkinh" },
                  { label: "Tròng kính", value: "trongkinh" },
                ]}
              />
            </Section>

            {form.type && (
              <>
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
                    label="Giới tính"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    options={[
                      { label: "Unisex", value: "unisex" },
                      { label: "Nam", value: "male" },
                      { label: "Nữ", value: "female" },
                    ]}
                  />
                </Section>

                {renderTypeFields()}

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

                <div>
                  <label className="text-sm text-gray-600 mb-3 block">
                    Hình ảnh sản phẩm
                  </label>

                  <div className="flex gap-6 items-start">
                    <div className="w-32 h-32 border rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
                      {form.image ? (
                        <img
                          src={form.image}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiImage className="text-gray-400 text-4xl" />
                      )}
                    </div>

                    <input
                      name="image"
                      placeholder="Dán link ảnh vào đây..."
                      value={form.image}
                      onChange={handleChange}
                      className="flex-1 border px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-8 py-5 border-t bg-gray-50 rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm border rounded-xl hover:bg-gray-100 transition"
            >
              Huỷ
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Lưu sản phẩm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ========================= COMPONENTS ========================= */

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-5">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-2 block">{label}</label>
      <input
        {...props}
        className="w-full border px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600 mb-2 block">{label}</label>
      <select
        {...props}
        className="w-full border px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Chọn...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddProductModal;
