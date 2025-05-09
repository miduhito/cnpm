/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(201)
  async createOrder(
    @Body() createOrderDto: {
      orderID: string;
      customerName: string;
      paymentMethod: 'CASH' | 'CARD' | 'MOMO' | 'ZALO_PAY';
      totalPrice: number;
      cartID: string;
      note?: string;
      print: boolean; // Thêm print
    },
  ) {
    return await this.orderService.createOrder(createOrderDto);
  }
}