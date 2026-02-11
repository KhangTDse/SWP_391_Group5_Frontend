import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function ViewOrderDetailsModal({ order, products = [], onClose }) {
  if (!order) return null;

  const statusMap = {
    pending: "Đang xử lý",
    completed: "Hoàn thành",
    cancelled: "Đã huỷ",
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const getProduct = (id) => {
    return products.find((p) => p.id === id);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 80 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-3xl rounded-3xl shadow-xl relative max-h-[95vh] flex flex-col"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-5 border-b">
            <h2 className="font-semibold text-xl text-gray-800">
              Chi tiết đơn hàng
            </h2>

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="p-8 space-y-8 overflow-y-auto">
            {/* THÔNG TIN KHÁCH HÀNG */}
            <div className="flex items-center gap-5">
              <img
                src={order.avatar}
                alt={order.customer}
                className="w-20 h-20 rounded-2xl object-cover border"
              />

              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-800">
                  {order.customer}
                </p>
                <p className="text-sm text-gray-500">{order.email}</p>
              </div>
            </div>

            {/* THÔNG TIN ĐƠN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Info label="Mã đơn" value={order.code} />
              <Info label="Ngày tạo" value={order.createdAt} />
              <div>
                <p className="text-sm text-gray-500 mb-2">Trạng thái</p>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusColor[order.status]}`}
                >
                  {statusMap[order.status]}
                </span>
              </div>
              <Info
                label="Tổng tiền"
                value={order.total.toLocaleString("vi-VN") + " đ"}
              />
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Sản phẩm
              </h3>

              <div className="space-y-4">
                {order.items.map((item, index) => {
                  const product = getProduct(item.productId);

                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center border rounded-xl p-4"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {product?.name || "Sản phẩm"}
                        </p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>

                      <div className="font-semibold text-gray-800">
                        {product
                          ? (product.price * item.quantity).toLocaleString(
                              "vi-VN",
                            ) + " đ"
                          : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end px-8 py-5 border-t bg-gray-50 rounded-b-3xl">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-800 text-white rounded-xl"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ================= COMPONENT INFO ================= */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

export default ViewOrderDetailsModal;
