# 🍔 FastFood POS System

Hệ thống quản lý cửa hàng đồ ăn nhanh gồm **frontend** (ReactJS) và **backend** (NestJS). Dự án hỗ trợ người dùng đặt hàng, quản lý giỏ hàng, thanh toán và đánh giá đơn hàng.

---

## 🧩 Cấu trúc dự án

```
cnpm/
│
├── backend/           # Backend NestJS (API + Cơ sở dữ liệu)
│   └── fastfood/
│
└── frontend/          # Frontend ReactJS (Giao diện người dùng)
    └── restaurant-cart/
```

---

## 🚀 Hướng dẫn cài đặt và chạy

### ✅ Yêu cầu

- **Node.js** v18 hoặc mới hơn
- **npm** v9+ hoặc **yarn**
- **MySQL** (cho backend)

---

### 🔧 1. Cài đặt và chạy Backend (NestJS)

```bash
cd backend/fastfood
npm install
npm run start:dev
```

> ⚠️ Đảm bảo bạn đã cấu hình file `.env` (hoặc tương đương) và MySQL đang chạy đúng cổng. Dự án dùng `TypeORM` và `mysql2`.

---

### 💻 2. Cài đặt và chạy Frontend (ReactJS)

```bash
cd frontend/restaurant-cart
npm install
npm start
```

> Frontend sẽ chạy mặc định ở [http://localhost:3000](http://localhost:3000)

---

## 🔗 Kết nối giữa frontend và backend

- Frontend gọi API từ backend tại địa chỉ:  
  `http://localhost:3001` (ví dụ: `/products`, `/cart`, `/order`...)

> Bạn có thể cấu hình lại base URL trong file chứa các lệnh gọi `axios`.

---

## ✨ Tính năng chính

- 📦 Xem và thêm sản phẩm vào giỏ hàng
- 🛒 Quản lý giỏ hàng
- 💳 Thanh toán và tạo đơn hàng
- ⭐ Đánh giá đơn hàng
- 📄 QR Code hóa đơn (tùy chọn)
---

## 📁 Các công nghệ sử dụng

| Layer      | Công nghệ                            |
|------------|--------------------------------------|
| Frontend   | ReactJS, Bootstrap, Axios, SCSS      |
| Backend    | NestJS, TypeORM, MySQL               |
| Dev Tools  | ESLint, Prettier, Jest               |

---