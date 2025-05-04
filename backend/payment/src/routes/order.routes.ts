import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const orderController = new OrderController();

// API đặt hàng (checkout)
router.post('/checkout', orderController.checkout);

// API lấy danh sách đơn hàng theo khách hàng
router.get('/customer/:customerId', orderController.getOrdersByCustomer);

// API lấy thông tin chi tiết đơn hàng
router.get('/:id', orderController.getOrderById);

// API lấy tất cả đơn hàng (thường dùng cho admin)
router.get('/', orderController.getAllOrders);

export default router;