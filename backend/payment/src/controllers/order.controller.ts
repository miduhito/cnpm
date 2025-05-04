import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { OrderRequest, OrderStatus } from '../interfaces/order.interface';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  checkout = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderRequest: OrderRequest = req.body;

      // Validate request
      if (!orderRequest.customerId || !orderRequest.items || orderRequest.items.length === 0) {
        res.status(400).json({ message: 'Invalid order request. Missing required fields.' });
        return;
      }

      // Validate items
      for (const item of orderRequest.items) {
        if (!item.productId || !item.name || !item.price || !item.quantity) {
          res.status(400).json({ message: 'Invalid order items. Each item must have productId, name, price and quantity.' });
          return;
        }
      }

      // Create order
      const order = await this.orderService.createOrder(orderRequest);
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: order
      });
    } catch (error) {
      console.error('Checkout error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process checkout',
        error: error.message
      });
    }
  };

  getOrdersByCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
      const customerId = parseInt(req.params.customerId);
      
      if (isNaN(customerId)) {
        res.status(400).json({ message: 'Invalid customer ID' });
        return;
      }

      const orders = await this.orderService.getOrdersByCustomerId(customerId);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: orders
      });
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  };

  getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as OrderStatus | undefined;

      const result = await this.orderService.getAllOrders(page, limit, status);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully',
        data: result.orders,
        pagination: {
          total: result.total,
          pages: result.pages,
          currentPage: page,
          limit
        }
      });
    } catch (error) {
      console.error('Error fetching all orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message
      });
    }
  };

  getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        res.status(400).json({ message: 'Invalid order ID' });
        return;
      }

      const order = await this.orderService.getOrderById(orderId);
      if (!order) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Order fetched successfully',
        data: order
      });
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch order',
        error: error.message
      });
    }
  };
}
