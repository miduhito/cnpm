/* eslint-disable prettier/prettier */
// cart.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart } from './cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Tạo mới giỏ hàng
  @Post()
  create(@Body() createCartDto: { cartID: string }): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  // Lấy thông tin giỏ hàng theo cartID
  @Get(':cartID')
  findOne(@Param('cartID') cartID: string): Promise<Cart> {
    return this.cartService.findOne(cartID);
  }
}
