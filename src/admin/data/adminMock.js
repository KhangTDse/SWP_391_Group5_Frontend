/* ============================
   ADMIN DASHBOARD MOCK DATA
   ============================ */

/* ===== DANH SÁCH SẢN PHẨM ===== */
export const productsMock = [
  {
    id: 1,
    name: "Gọng kính Kim loại HMK-01",
    category: "Gọng kính",
    price: 950000,
    stock: 12,
    img: "https://picsum.photos/seed/frame1/400/400",
  },
  {
    id: 2,
    name: "Tròng kính chống ánh sáng xanh",
    category: "Tròng kính",
    price: 1200000,
    stock: 20,
    img: "https://picsum.photos/seed/lens1/400/400",
  },
  {
    id: 3,
    name: "Gọng kính nhựa dẻo HMK-02",
    category: "Gọng kính",
    price: 750000,
    stock: 8,
    img: "https://picsum.photos/seed/frame2/400/400",
  },

  /* =========================
     THÊM SẢN PHẨM MỚI
  ========================= */

  {
    id: 4,
    name: "Kính mát thời trang KM-01",
    category: "Kính mát",
    price: 1350000,
    stock: 18,
    img: "https://picsum.photos/seed/sunglass1/400/400",
  },
  {
    id: 5,
    name: "Kính mát cao cấp KM-02",
    category: "Kính mát",
    price: 1850000,
    stock: 10,
    img: "https://picsum.photos/seed/sunglass2/400/400",
  },
  {
    id: 6,
    name: "Gọng kính Titanium HMK-03",
    category: "Gọng kính",
    price: 1650000,
    stock: 6,
    img: "https://picsum.photos/seed/frame3/400/400",
  },
  {
    id: 7,
    name: "Gọng kính vuông thời trang",
    category: "Gọng kính",
    price: 890000,
    stock: 14,
    img: "https://picsum.photos/seed/frame4/400/400",
  },
  {
    id: 8,
    name: "Tròng kính siêu mỏng 1.67",
    category: "Tròng kính",
    price: 1450000,
    stock: 22,
    img: "https://picsum.photos/seed/lens2/400/400",
  },
  {
    id: 9,
    name: "Tròng kính đổi màu",
    category: "Tròng kính",
    price: 1750000,
    stock: 9,
    img: "https://picsum.photos/seed/lens3/400/400",
  },
  {
    id: 10,
    name: "Kính mát Polarized KM-03",
    category: "Kính mát",
    price: 2100000,
    stock: 5,
    img: "https://picsum.photos/seed/sunglass3/400/400",
  },
  {
    id: 11,
    name: "Kính mát thể thao KM-04",
    category: "Kính mát",
    price: 990000,
    stock: 16,
    img: "https://picsum.photos/seed/sunglass4/400/400",
  },
  {
    id: 12,
    name: "Gọng kính trẻ em HMK-05",
    category: "Gọng kính",
    price: 550000,
    stock: 25,
    img: "https://picsum.photos/seed/frame5/400/400",
  },
];

/* ===== DANH SÁCH ĐƠN HÀNG (FULL) ===== */
export const ordersMock = [
  {
    id: 1,
    code: "ORD-001",
    customer: "Nguyễn Văn An",
    email: "nguyenvanan@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "completed",
    createdAt: "02/02/2026",
    items: [
      { productId: 2, quantity: 1 }, // Tròng 1.200.000
    ],
    total: 1200000,
  },
  {
    id: 2,
    code: "ORD-002",
    customer: "Trần Thị Bình",
    email: "tranbinh@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    status: "pending",
    createdAt: "03/02/2026",
    items: [
      { productId: 3, quantity: 1 }, // 750.000
      { productId: 12, quantity: 1 }, // 550.000
    ],
    total: 1300000,
  },
  {
    id: 3,
    code: "ORD-003",
    customer: "Lê Minh Cường",
    email: "cuongle@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    status: "cancelled",
    createdAt: "04/02/2026",
    items: [
      { productId: 10, quantity: 1 }, // 2.100.000
    ],
    total: 2100000,
  },
  {
    id: 4,
    code: "ORD-004",
    customer: "Phạm Thu Hà",
    email: "thuhapham@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "completed",
    createdAt: "05/02/2026",
    items: [
      { productId: 7, quantity: 1 }, // 890.000
    ],
    total: 890000,
  },
  {
    id: 5,
    code: "ORD-005",
    customer: "Võ Hoàng Nam",
    email: "namvo@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    status: "pending",
    createdAt: "06/02/2026",
    items: [
      { productId: 6, quantity: 1 }, // 1.650.000
    ],
    total: 1650000,
  },
  {
    id: 6,
    code: "ORD-006",
    customer: "Ngô Thuỳ Linh",
    email: "linhngo@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    status: "completed",
    createdAt: "07/02/2026",
    items: [
      { productId: 9, quantity: 1 }, // 1.750.000
    ],
    total: 1750000,
  },
  {
    id: 7,
    code: "ORD-007",
    customer: "Đặng Quốc Bảo",
    email: "bao.dang@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    status: "cancelled",
    createdAt: "08/02/2026",
    items: [
      { productId: 12, quantity: 1 }, // 550.000
    ],
    total: 550000,
  },
  {
    id: 8,
    code: "ORD-008",
    customer: "Trịnh Mỹ Hạnh",
    email: "hanhtrinh@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    status: "completed",
    createdAt: "09/02/2026",
    items: [
      { productId: 4, quantity: 1 }, // 1.350.000
      { productId: 2, quantity: 1 }, // 1.200.000
    ],
    total: 2550000,
  },
];


/* ===== THỐNG KÊ TỔNG QUAN ===== */
export const dashboardStats = [
  {
    id: 1,
    title: "Tổng sản phẩm",
    value: productsMock.length,
  },
  {
    id: 2,
    title: "Đơn hàng hôm nay",
    value: ordersMock.filter((o) => o.createdAt === "09/02/2026").length,
  },
  {
    id: 3,
    title: "Khách hàng",
    value: 540,
  },
  {
    id: 4,
    title: "Doanh thu",
    value:
      ordersMock
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + o.total, 0)
        .toLocaleString("vi-VN") + " ₫",
  },
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
// export const recentOrders = [
//   {
//     id: "#001",
//     customer: "Nguyễn Văn An",
//     email: "nguyenvanan@gmail.com",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     status: "completed",
//     total: "1.200.000 ₫",
//     createdAt: "02/02/2026",
//   },
//   {
//     id: "#002",
//     customer: "Trần Thị Bình",
//     email: "tranbinh@gmail.com",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     status: "pending",
//     total: "850.000 ₫",
//     createdAt: "03/02/2026",
//   },
//   {
//     id: "#003",
//     customer: "Lê Minh Cường",
//     email: "cuongle@gmail.com",
//     avatar: "https://randomuser.me/api/portraits/men/65.jpg",
//     status: "cancelled",
//     total: "2.150.000 ₫",
//     createdAt: "04/02/2026",
//   },
//   {
//     id: "#004",
//     customer: "Phạm Thu Hà",
//     email: "thuhapham@gmail.com",
//     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//     status: "completed",
//     total: "980.000 ₫",
//     createdAt: "05/02/2026",
//   },
// ];
export const recentOrders = ordersMock.slice(0, 4).map((order) => ({
  id: order.code,
  customer: order.customer,
  email: order.email,
  avatar: order.avatar,
  status: order.status,
  total: order.total.toLocaleString("vi-VN") + " ₫",
  createdAt: order.createdAt,
}));

export const orderStatusData = [
  {
    name: "Hoàn thành",
    value: ordersMock.filter((o) => o.status === "completed").length,
  },
  {
    name: "Chờ xử lý",
    value: ordersMock.filter((o) => o.status === "pending").length,
  },
  {
    name: "Đã huỷ",
    value: ordersMock.filter((o) => o.status === "cancelled").length,
  },
];

/* ===== OVERVIEW CHART ===== */
export const revenueData = [
  { day: "Thứ 2", revenue: 1200000 },
  { day: "Thứ 3", revenue: 2100000 },
  { day: "Thứ 4", revenue: 1800000 },
  { day: "Thứ 5", revenue: 2600000 },
  { day: "Thứ 6", revenue: 3200000 },
  { day: "Thứ 7", revenue: 2800000 },
  { day: "Chủ nhật", revenue: 3500000 },
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
  address: "39A đường 149C, Long Trường, Thủ Đức, Thành Phố Hồ Chí Minh",
  social: {
    github: "https://github.com/mikeyvo",
    facebook: "https://facebook.com/mikeyvo",
    gmail: "mailto:admin@gmail.com",
  },
};
