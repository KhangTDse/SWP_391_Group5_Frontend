import { FiX, FiCheckCircle, FiClock, FiXCircle, FiEye } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function ViewOrderDetailsModal({ order, products = [], onClose }) {
  if (!order) return null;

  const statusConfig = {
    pending: {
      label: "Đang xử lý",
      color: "bg-yellow-100 text-yellow-700",
      icon: <FiClock size={14} />,
    },
    completed: {
      label: "Hoàn thành",
      color: "bg-green-100 text-green-700",
      icon: <FiCheckCircle size={14} />,
    },
    cancelled: {
      label: "Đã huỷ",
      color: "bg-red-100 text-red-700",
      icon: <FiXCircle size={14} />,
    },
  };

  const getProduct = (id) => products.find((p) => p.id === id);

  const subtotal = order.items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  const total = order.total || subtotal;
  const status = statusConfig[order.status];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-6xl rounded-3xl shadow-xl max-h-[95vh] flex flex-col overflow-hidden"
        >
          {/* HEADER */}
          <div className="relative px-10 pt-8 pb-6">
            {/* CLOSE BUTTON - TOP RIGHT */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiX size={18} />
            </button>

            {/* TITLE SECTION */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FiEye size={18} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Xem chi tiết đơn hàng
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Đơn hàng {order.code} • {order.createdAt}
                </p>

                {/* STATUS BADGE */}
                <span
                  className={`inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full text-xs font-medium ${status.color}`}
                >
                  {status.icon}
                  {status.label}
                </span>
              </div>
            </div>

            {/* STRONG DIVIDER */}
            <div className="-mx-10 mt-8 border-t border-gray-300"></div>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto px-10 pb-10 grid grid-cols-3 gap-16">
            {/* LEFT - PRODUCTS */}
            <div className="col-span-2 space-y-8">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Sản phẩm
              </h3>

              <div className="space-y-6">
                {order.items.map((item, index) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={product.img}
                          alt=""
                          className="w-20 h-20 rounded-2xl object-cover bg-gray-100"
                        />

                        <div>
                          <p className="font-medium text-gray-900 text-base">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {product.category}
                          </p>
                          <p className="text-sm text-gray-400 mt-2">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-base font-semibold text-gray-900">
                          {(product.price * item.quantity).toLocaleString(
                            "vi-VN",
                          )}{" "}
                          đ
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {product.price.toLocaleString("vi-VN")} đ / sp
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT - SUMMARY + CUSTOMER */}
            <div className="space-y-10">
              {/* PAYMENT */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-6">
                  Thanh toán
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tạm tính</span>
                    <span>{subtotal.toLocaleString("vi-VN")} đ</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span>0 đ</span>
                  </div>

                  <div className="border-t pt-5 flex justify-between text-lg font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-blue-600">
                      {total.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
              </div>

              {/* CUSTOMER INFO (NHỎ GỌN) */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                  Khách hàng
                </h3>

                <div className="flex items-center gap-4">
                  <img
                    src={order.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500">{order.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-10 py-5 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:opacity-90 transition"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ViewOrderDetailsModal;
