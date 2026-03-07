import React from "react";
import { Link } from "react-router-dom";
import { FiBox, FiTruck, FiCheckCircle } from "react-icons/fi";

function OrderHistoryPage() {
  // Dữ liệu giả lập danh sách đơn hàng của khách
  const orders = [
    {
      id: "FALCON-8899",
      date: "15/10/2026",
      status: "Đang giao hàng",
      total: "3.500.000đ",
      product: "Aviator Polarized Gold",
      statusCode: 2, // Đang giao -> Hiện nút "Theo dõi tiến độ"
    },
    {
      id: "FALCON-7722",
      date: "01/09/2026",
      status: "Giao thành công",
      total: "2.100.000đ",
      product: "Classic Black Square",
      statusCode: 3, // Đã giao -> Hiện nút "Đánh giá" và "Đổi trả"
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-stone-900 mb-8 tracking-tight uppercase">
          Đơn hàng của bạn
        </h1>

        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
              {/* Tiêu đề đơn hàng */}
              <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-4">
                <div>
                  <p className="font-bold text-stone-900">#{order.id}</p>
                  <p className="text-sm text-stone-500">Đặt ngày {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-amber-600">{order.status}</p>
                  <p className="font-bold text-stone-900 mt-1">{order.total}</p>
                </div>
              </div>

              {/* Thông tin sản phẩm */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-stone-100 rounded-xl flex items-center justify-center text-stone-400">
                  <FiBox size={24} />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">{order.product}</p>
                  <p className="text-sm text-stone-500">Số lượng: 1</p>
                </div>
              </div>

              {/* CÁC NÚT CHỨC NĂNG (Tích hợp 3 trang vừa làm) */}
              <div className="flex flex-wrap gap-3 justify-end">
                
                {/* Nếu đơn hàng ĐANG GIAO (statusCode = 2) */}
                {order.statusCode === 2 && (
                  <Link 
                    to="/shipping-progress"
                    className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white font-semibold rounded-xl hover:bg-stone-800 transition-colors text-sm"
                  >
                    <FiTruck />
                    Theo dõi tiến độ
                  </Link>
                )}

                {/* Nếu đơn hàng ĐÃ GIAO (statusCode = 3) */}
                {order.statusCode === 3 && (
                  <>
                    <Link 
                      to="/return-request"
                      className="px-5 py-2.5 bg-white border border-stone-300 text-stone-700 font-semibold rounded-xl hover:bg-stone-50 transition-colors text-sm"
                    >
                      Yêu cầu Đổi/Trả
                    </Link>
                    <Link 
                      to="/order-feedback"
                      className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors text-sm"
                    >
                      <FiCheckCircle />
                      Đánh giá sản phẩm
                    </Link>
                  </>
                )}
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryPage;