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

/* ===== DANH SÁCH ĐƠN HÀNG (FULL) ===== */
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

/* ===== OVERVIEW CHART ===== */
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

/* ===== OVERVIEW STATS (STAT CARD) ===== */
export const overviewStats = [
  {
    title: "Tổng sản phẩm",
    value: "128",
    percent: "+4.2%",
    trend: "up",
    icon: "box",
  },
  {
    title: "Đơn hàng hôm nay",
    value: "32",
    percent: "-1.8%",
    trend: "down",
    icon: "shopping",
  },
  {
    title: "Khách hàng",
    value: "540",
    percent: "+6.1%",
    trend: "up",
    icon: "users",
  },
  {
    title: "Doanh thu",
    value: "12.400.000 ₫",
    percent: "+12.5%",
    trend: "up",
    icon: "wallet",
  },
];

/* ===== RECENT ORDERS (TABLE) ===== */
export const recentOrders = [
  {
    id: "#001",
    customer: "Nguyễn Văn A",
    status: "completed",
    statusLabel: "Hoàn thành",
    total: "120.000 ₫",
    statusBorder: "border-green-500",
  },
  {
    id: "#002",
    customer: "Trần Thị B",
    status: "pending",
    statusLabel: "Chờ xử lý",
    total: "80.000 ₫",
    statusBorder: "border-yellow-500",
  },
  {
    id: "#003",
    customer: "Lê Văn C",
    status: "cancelled",
    statusLabel: "Đã huỷ",
    total: "150.000 ₫",
    statusBorder: "border-red-500",
  },
];

/* ===== ADMIN PROFILE ===== */
export const adminMock = {
  id: 1,
  name: "Võ Dương Hoàng",
  email: "hoangvo@admin.com",
  password: "123",
  phone: "0787565699",
  role: "Quản trị hệ thống",
  role_EN: "Admin",
  img: "https://www.shutterstock.com/image-photo/create-imageiphone-memoji-avatar-style-600nw-2683889647.jpg",
  address:"39A đường 149C, Long Trường, Thủ Đức, Thành Phố Hồ Chí Minh"
};
