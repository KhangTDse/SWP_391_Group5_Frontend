  import StatCard from "../components/StatCard";
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

  const orderSeries = [
    {
      name: "Đơn hàng",
      data: orderStatusData.map((item) => item.value),
    },
  ];

  const orderCategories = orderStatusData.map((item) => item.name);

  function AdminOverview() {
    return (
      <div className="px-8 pt-6 pb-12 bg-gray-50 min-h-full">
        {/* TITLE */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800">Tổng quan hệ thống</h1>
          <p className="text-sm text-gray-500">
            Theo dõi hiệu suất kinh doanh và đơn hàng
          </p>
        </div>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard title="Tổng doanh thu" value={overviewStats[0].value} icon={<FiDollarSign />} color="blue" />
          <StatCard title="Đơn hàng" value={overviewStats[1].value} icon={<FiShoppingCart />} color="green" />
          <StatCard title="Khách hàng" value={overviewStats[2].value} icon={<FiUsers />} color="yellow" />
          <StatCard title="Tăng trưởng" value={overviewStats[3].value} icon={<FiTrendingUp />} color="purple" />
        </section>

        {/* ROW 1 */}
        <section className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* AREA */}
          <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
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
                  animations: {
                    enabled: true,
                    easing: "easeinout",
                    speed: 800,
                  },
                },
                stroke: {
                  curve: "smooth",
                  width: 3,
                },
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
                xaxis: {
                  categories: revenueCategories,
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                },
                grid: {
                  borderColor: "#f1f5f9",
                  strokeDashArray: 4,
                },
                tooltip: {
                  y: {
                    formatter: (val) =>
                      val.toLocaleString("vi-VN") + " đ",
                  },
                },
              }}
            />
          </div>

          {/* DONUT */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
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
                plotOptions: {
                  pie: {
                    donut: {
                      size: "70%",
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          label: "Tổng",
                          formatter: function (w) {
                            return w.globals.seriesTotals.reduce(
                              (a, b) => a + b,
                              0
                            );
                          },
                        },
                      },
                    },
                  },
                },
                tooltip: {
                  y: {
                    formatter: (val) => val + " đơn",
                  },
                },
              }}
            />
          </div>
        </section>

        {/* ROW 2 */}
        <section className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* LINE */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Xu hướng tăng trưởng
            </h2>

            <Chart
              type="line"
              height={300}
              series={revenueSeries}
              options={{
                chart: {
                  toolbar: { show: false },
                  animations: { enabled: true },
                },
                stroke: {
                  curve: "smooth",
                  width: 3,
                },
                markers: {
                  size: 4,
                  hover: { size: 7 },
                },
                colors: ["#22c55e"],
                xaxis: {
                  categories: revenueCategories,
                },
                grid: {
                  borderColor: "#f1f5f9",
                  strokeDashArray: 4,
                },
                tooltip: {
                  y: {
                    formatter: (val) =>
                      val.toLocaleString("vi-VN") + " đ",
                  },
                },
              }}
            />
          </div>

          {/* BAR */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Số lượng đơn hàng
            </h2>

            <Chart
              type="bar"
              height={300}
              series={orderSeries}
              options={{
                chart: {
                  toolbar: { show: false },
                  animations: { enabled: true },
                },
                colors: ["#2563eb"],
                plotOptions: {
                  bar: {
                    borderRadius: 10,
                    columnWidth: "45%",
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                xaxis: {
                  categories: orderCategories,
                },
                grid: {
                  borderColor: "#f1f5f9",
                },
                tooltip: {
                  y: {
                    formatter: (val) => val + " đơn",
                  },
                },
              }}
            />
          </div>
        </section>

        {/* RECENT ORDERS giữ nguyên */}
        <section className="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase text-gray-500 border-b border-gray-200">
                  <th className="py-3 text-left">Mã đơn</th>
                  <th className="text-left">Khách hàng</th>
                  <th className="text-left">Ngày</th>
                  <th className="text-left">Trạng thái</th>
                  <th className="text-right">Tổng tiền</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => {
                  const statusMap = {
                    completed: "bg-green-50 text-green-700 border-green-200",
                    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
                    cancelled: "bg-red-50 text-red-700 border-red-200",
                  };

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-4 font-medium text-gray-800">
                        {order.id}
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={order.avatar}
                            alt={order.customer}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {order.customer}
                            </p>
                            <p className="text-xs text-gray-500">{order.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="text-sm text-gray-600">{order.createdAt}</td>

                      <td>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                            statusMap[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="text-right font-semibold text-gray-800">
                        {order.total}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  export default AdminOverview;
