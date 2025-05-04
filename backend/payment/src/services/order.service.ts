import { getRepository } from 'typeorm';
import { Order } from '../models/order.model';
import { OrderRequest, OrderStatus } from '../interfaces/order.interface';

export class OrderService {
  private orderRepository = getRepository(Order);

  async createOrder(orderRequest: OrderRequest): Promise<Order> {
    try {
      // Tính tổng tiền đơn hàng
      const totalAmount = orderRequest.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Tạo đơn hàng mới
      const newOrder = this.orderRepository.create({
        customerId: orderRequest.customerId,
        items: orderRequest.items,
        totalAmount,
        address: orderRequest.address,
        phoneNumber: orderRequest.phoneNumber,
        paymentMethod: orderRequest.paymentMethod,
        notes: orderRequest.notes,
        status: OrderStatus.PENDING
      });

      // Lưu đơn hàng vào database
      const savedOrder = await this.orderRepository.save(newOrder);
      return savedOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }

  async getOrdersByCustomerId(customerId: number): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        where: { customerId },
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    try {
      return await this.orderRepository.findOne(id);
    } catch (error) {
      console.error(`Error fetching order with ID ${id}:`, error);
      throw new Error('Failed to fetch order');
    }
  }

  async getAllOrders(
    page: number = 1,
    limit: number = 10,
    status?: OrderStatus
  ): Promise<{ orders: Order[]; total: number; pages: number }> {
    try {
      const skip = (page - 1) * limit;
      const whereClause = status ? { status } : {};

      const [orders, total] = await this.orderRepository.findAndCount({
        where: whereClause,
        order: { createdAt: 'DESC' },
        skip,
        take: limit
      });

      return {
        orders,
        total,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw new Error('Failed to fetch orders');
    }
  }
}