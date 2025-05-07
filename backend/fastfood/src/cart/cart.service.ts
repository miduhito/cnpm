/* eslint-disable prettier/prettier */
// cart.service.ts

// cart.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  // Tạo mới giỏ hàng
  async create(createCartDto: { cartID: string }): Promise<Cart> {
    const { cartID } = createCartDto;

    // Tạo một giỏ hàng mới
    const cart = this.cartRepository.create({
      cartID,
    });

    // Lưu giỏ hàng vào database
    return this.cartRepository.save(cart);
  }

  // Lấy thông tin giỏ hàng theo cartID
  async findOne(cartID: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { cartID } });
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }
}

