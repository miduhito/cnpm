/* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Cart } from '../cart/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async createOrder(createOrderDto: {
    orderID: string;
    customerName: string;
    paymentMethod: 'CASH' | 'CARD' | 'MOMO' | 'ZALO_PAY';
    totalPrice: number;
    cartID: string;
    note?: string;
    print: boolean;
  }): Promise<Order> {
    const { orderID, customerName, paymentMethod, totalPrice, cartID, note,print } = createOrderDto;

    // Kiểm tra giỏ hàng tồn tại
    const cart = await this.cartRepository.findOne({ where: { cartID } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    // Kiểm tra dữ liệu đầu vào
    if (!customerName || !paymentMethod || totalPrice <= 0) {
      throw new BadRequestException('Invalid order data');
    }

    const order = this.orderRepository.create({
      ID: orderID,
      customerName,
      paymentMethod,
      totalPrice,
      cartID,
      orderStatus: 'PENDING',
      createdDate: new Date(),
      print
    });

    return await this.orderRepository.save(order);
  }
}