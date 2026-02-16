import { Link } from "react-router-dom";
import Chart from "react-apexcharts";

import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

import {
  revenueData,
  orderStatusData,
  overviewStats,
  recentOrders,
} from "../data/adminMock";

/* =========================
    PREPARE DATA
========================= */

const revenueSeries = [
  {
    name: "Doanh thu",
    data: revenueData.map((item) => item.revenue),
  },
];

const revenueCategories = revenueData.map((item) => item.day);

function AdminOverview() {
  return (
    <div className="px-8 pt-8 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-full">
      {/* TITLE */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
        <p className="text-sm text-gray-500 mt-1">
          Theo dõi hiệu suất kinh doanh và đơn hàng
        </p>
      </div>

      {/* =========================
            STATS
      ========================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Doanh thu */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Tổng doanh thu</p>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-inner group-hover:scale-110 transition">
              <FiDollarSign size={18} />
            </div>
          </div>

          <p className="text-2xl font-semibold mt-5 text-gray-800">
            {overviewStats[0].value}
          </p>
        </div>

        {/* Đơn hàng */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Đơn hàng</p>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-green-50 text-green-600 shadow-inner group-hover:scale-110 transition">
              <FiShoppingCart size={18} />
            </div>
          </div>

          <p className="text-2xl font-semibold mt-5 text-gray-800">
            {overviewStats[1].value}
          </p>
        </div>

        {/* Khách hàng */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Khách hàng</p>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 shadow-inner group-hover:scale-110 transition">
              <FiUsers size={18} />
            </div>
          </div>

          <p className="text-2xl font-semibold mt-5 text-gray-800">
            {overviewStats[2].value}
          </p>
        </div>

        {/* Tăng trưởng */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Tăng trưởng</p>
            <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-purple-50 text-purple-600 shadow-inner group-hover:scale-110 transition">
              <FiTrendingUp size={18} />
            </div>
          </div>

          <p className="text-2xl font-semibold mt-5 text-gray-800">
            {overviewStats[3].value}
          </p>
        </div>
      </section>

      {/* =========================
            CHART LỚN + RECENT ORDERS
      ========================= */}
      <section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AREA */}
        <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Doanh thu 7 ngày
          </h2>

          <Chart
            type="area"
            height={320}
            series={revenueSeries}
            options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false },
                animations: { enabled: true },
              },
              stroke: { curve: "smooth", width: 3 },
              colors: ["#2563eb"],
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.4,
                  opacityTo: 0.05,
                  stops: [0, 90, 100],
                },
              },
              dataLabels: { enabled: false },
              xaxis: { categories: revenueCategories },
              grid: {
                borderColor: "#f1f5f9",
                strokeDashArray: 4,
              },
              tooltip: {
                y: {
                  formatter: (val) => val.toLocaleString("vi-VN") + " đ",
                },
              },
            }}
          />
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-gray-800">
              Đơn hàng gần đây
            </h2>

            <Link
              to="/dashboard/orders"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
            >
              Xem tất cả →
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={order.avatar}
                    alt={order.customer}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {order.customer}
                    </p>
                    <p className="text-xs text-gray-500">{order.createdAt}</p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  {order.total}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
            CÁC CHART KHÁC
      ========================= */}
      <section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* DONUT */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Tỷ lệ trạng thái
          </h2>

          <Chart
            type="donut"
            height={320}
            series={orderStatusData.map((i) => i.value)}
            options={{
              labels: orderStatusData.map((i) => i.name),
              colors: ["#2563eb", "#22c55e", "#facc15", "#ef4444"],
              stroke: { width: 0 },
              legend: {
                position: "bottom",
                fontSize: "13px",
              },
            }}
          />
        </div>

        {/* LINE */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 xl:col-span-2">
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            Xu hướng tăng trưởng
          </h2>

          <Chart
            type="line"
            height={300}
            series={revenueSeries}
            options={{
              chart: { toolbar: { show: false } },
              stroke: { curve: "smooth", width: 3 },
              markers: { size: 4, hover: { size: 7 } },
              colors: ["#22c55e"],
              xaxis: { categories: revenueCategories },
              grid: {
                borderColor: "#f1f5f9",
                strokeDashArray: 4,
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}

export default AdminOverview;
