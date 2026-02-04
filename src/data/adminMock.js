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
// src/data/adminMock.js (bổ sung)
export const ordersMock = [
  {
    id: 1,
    code: "ORD001",
    customer: "Nguyễn Văn A",
    total: 1250000,
    status: "completed",
    createdAt: "02/02/2026",
  },
  {
    id: 2,
    code: "ORD002",
    customer: "Trần Thị B",
    total: 780000,
    status: "pending",
    createdAt: "03/02/2026",
  },
  {
    id: 3,
    code: "ORD003",
    customer: "Lê Văn C",
    total: 2150000,
    status: "cancelled",
    createdAt: "04/02/2026",
  },
];


/* ===== OVERVIEW MOCK DATA ===== */

export const revenueData = [
  { day: "Thứ 2", revenue: 1200 },
  { day: "Thứ 3", revenue: 2100 },
  { day: "Thứ 4", revenue: 1800 },
  { day: "Thứ 5", revenue: 2600 },
  { day: "Thứ 6", revenue: 3200 },
  { day: "Thứ 7", revenue: 2800 },
  { day: "Chủ nhật", revenue: 3500 },
];

export const orderStatusData = [
  { name: "Hoàn thành", value: 68 },
  { name: "Chờ xử lý", value: 32 },
  { name: "Đang giao", value: 20 },
];

export const overviewStats = [
  { title: "Tổng sản phẩm", value: "128" },
  { title: "Đơn hàng hôm nay", value: "32" },
  { title: "Khách hàng", value: "540" },
  { title: "Doanh thu", value: "12.400.000 ₫" },
];

export const recentOrders = [
  {
    id: "#001",
    customer: "Nguyễn Văn A",
    status: "Hoàn thành",
    total: "120.000 ₫",
    statusColor: "text-green-600",
  },
  {
    id: "#002",
    customer: "Trần Thị B",
    status: "Chờ xử lý",
    total: "80.000 ₫",
    statusColor: "text-yellow-600",
  },
];



/* ======= HỒ SƠ ADMIN */
export const adminMock = {
  id: 1,
  name: "Admin Chính",
  email: "admin@shop.vn",
  phone: "0909 123 456",
  role: "Quản trị hệ thống",
};



