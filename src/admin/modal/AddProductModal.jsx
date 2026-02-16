import { useState } from "react";
import {
  FiX,
  FiPackage,
  FiCheck,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* ================= STEPPER COMPONENT (ĐƯA RA NGOÀI ĐỂ FIX LỖI) ================= */
function Stepper({ step }) {
  const progressPercent = step === 1 ? 0 : step === 2 ? 50 : 100;

  return (
    <div className="px-8 pt-6 pb-2">
      <div className="relative flex items-center justify-between">
        {/* LINE WRAPPER - giới hạn đúng từ tâm circle 1 đến circle 3 */}
        <div className="absolute top-5 left-5 right-5 h-1">
          {/* Background Line */}
          <div className="w-full h-1 bg-gray-200 rounded-full" />

          {/* Active Line */}
          <div
            className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {[1, 2, 3].map((s) => (
          <div key={s} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                ${
                  step >= s
                    ? "bg-blue-600 text-white shadow-md scale-105"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {step > s ? <FiCheck /> : s}
            </div>

            <span className="text-xs mt-2 text-gray-500">
              {s === 1 && "Danh mục"}
              {s === 2 && "Chi tiết"}
              {s === 3 && "Hoàn thành"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
function AddProductModal({ onClose, onAdd }) {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);

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

  /* ================= HANDLE CHANGE ================= */
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

  /* ================= SUBMIT ================= */
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
      category: categoryMap[form.type],
      img: form.image,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      stock: Number(form.stock),
    });

    setCompleted(true);
    setStep(3);
  };

  const resetForm = () => {
    setCompleted(false);
    setStep(1);
    setForm({
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
  };

  /* ================= RENDER TYPE FIELDS ================= */
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
            <Input label="Kích thước" name="size" onChange={handleSpecChange} />
            <Input label="Màu gọng" name="color" onChange={handleSpecChange} />
          </Section>
        );
      case "trongkinh":
        return (
          <Section title="Thông tin tròng kính">
            <Input
              label="Chiết suất"
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col max-h-[95vh]"
      >
        {/* HEADER */}
        <div className="relative px-8 pt-6 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-50">
                <FiPackage className="text-blue-600 text-lg" />
              </div>
              <h2 className="font-semibold text-xl text-gray-800">
                Thêm sản phẩm
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* STRONG DIVIDER */}
          <div className="-mx-8 mt-6 border-t border-gray-300"></div>
        </div>

        {/* Stepper luôn hiển thị */}
        <Stepper step={step} />

        {/* CONTENT */}
        <div className="p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && !completed && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
              >
                <Section title="Chọn danh mục">
                  <Select
                    label="Loại sản phẩm"
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
              </motion.div>
            )}

            {step === 2 && !completed && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
              >
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
              </motion.div>
            )}

            {completed && (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FiCheck className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Đã thêm sản phẩm thành công 🎉
                </h3>
                <p className="text-gray-500 mb-6">
                  Bạn có muốn thêm sản phẩm khác không?
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-blue-600 text-white rounded-xl"
                  >
                    Thêm tiếp
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 border rounded-xl"
                  >
                    Thoát
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER */}
        {!completed && (
          <div className="flex justify-between px-8 py-5 border-t bg-gray-50">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border rounded-xl flex items-center gap-2"
              >
                <FiArrowLeft /> Quay lại
              </button>
            )}

            {step === 1 && (
              <button
                disabled={!form.type}
                onClick={() => setStep(2)}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-40"
              >
                Tiếp
              </button>
            )}

            {step === 2 && (
              <button
                onClick={handleSubmit}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-xl"
              >
                Hoàn thành
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div className="mb-10">
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
