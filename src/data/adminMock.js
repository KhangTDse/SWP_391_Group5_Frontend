/* ============================
   ADMIN DASHBOARD MOCK DATA
   ============================ */

/* ===== THỐNG KÊ TỔNG QUAN ===== */
export const dashboardStats = [
  {
    id: 1,
    title: "Tổng sản phẩm",
    value: 128,
  },
  {
    id: 2,
    title: "Đơn hàng hôm nay",
    value: 32,
  },
  {
    id: 3,
    title: "Khách hàng",
    value: 540,
  },
  {
    id: 4,
    title: "Doanh thu",
    value: "12.400.000 ₫",
  },
];

/* ===== ĐƠN HÀNG GẦN ĐÂY ===== */
export const recentOrders = [
  {
    id: "DH001",
    customer: "Nguyễn Văn A",
    status: "Hoàn thành",
    total: "1.200.000 ₫",
  },
  {
    id: "DH002",
    customer: "Trần Thị B",
    status: "Đang xử lý",
    total: "800.000 ₫",
  },
  {
    id: "DH003",
    customer: "Lê Hoàng C",
    status: "Đang giao",
    total: "2.300.000 ₫",
  },
];

/* ===== DANH SÁCH SẢN PHẨM ===== */
export const productsMock = [
  {
    id: 1,
    name: "Gọng kính Kim loại HMK-01",
    category: "Gọng kính",
    price: 950000,
    stock: 12,
  },
  {
    id: 2,
    name: "Tròng kính chống ánh sáng xanh",
    category: "Tròng kính",
    price: 1200000,
    stock: 20,
  },
  {
    id: 3,
    name: "Gọng kính nhựa dẻo HMK-02",
    category: "Gọng kính",
    price: 750000,
    stock: 8,
  },
];

/* ===== DANH SÁCH ĐƠN HÀNG ===== */
export const ordersMock = [
  {
    id: "ORD001",
    customer: "Nguyễn Văn A",
    status: "Hoàn thành",
    total: 1200000,
    date: "2026-02-01",
  },
  {
    id: "ORD002",
    customer: "Trần Thị B",
    status: "Chưa hoàn thành",
    total: 800000,
    date: "2026-02-02",
  },
  {
    id: "ORD003",
    customer: "Lê Hoàng C",
    status: "Đang giao",
    total: 2300000,
    date: "2026-02-03",
  },
];

/* ===== DATA CHO CHART (OVERVIEW) ===== */
export const revenueChartData = [
  { day: "T2", revenue: 3000000 },
  { day: "T3", revenue: 4500000 },
  { day: "T4", revenue: 2800000 },
  { day: "T5", revenue: 5200000 },
  { day: "T6", revenue: 6100000 },
  { day: "T7", revenue: 7200000 },
  { day: "CN", revenue: 4000000 },
];


/* ======= HỒ SƠ ADMIN */
export const adminInfo = {
  name: "Nguyễn Văn Admin",
  role: "Quản trị viên",
  email: "admin@eyewear.vn",
  phone: "0909 123 456",
  avatar: "https://i.pravatar.cc/150?img=12",
};



