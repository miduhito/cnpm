/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  // Cập nhật số lượng sản phẩm trong giỏ
  async updateQuantity(cartItemID: number, updateCartItemDto: { quantity: number }): Promise<CartItem> {
    const cartItem = await this.cartItemRepository.findOne({ where: { cartItemID } });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    // Cập nhật số lượng
    cartItem.quantity = updateCartItemDto.quantity;
    return this.cartItemRepository.save(cartItem);
  }

  // Xóa sản phẩm khỏi giỏ
  async remove(cartItemID: number): Promise<void> {
    const result = await this.cartItemRepository.delete(cartItemID);
    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }
}