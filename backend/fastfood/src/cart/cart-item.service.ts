/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { CartItemOption } from './cart-item-sidedish.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    @InjectRepository(CartItemOption)
    private readonly cartItemOptionRepository: Repository<CartItemOption>,
  ) {}

  async updateQuantity(cartItemID: number, updateCartItemDto: { quantity: number }): Promise<CartItem> {
    console.log(`Updating quantity for cartItemID: ${cartItemID}, new quantity: ${updateCartItemDto.quantity}`);
    const cartItem = await this.cartItemRepository.findOne({ where: { cartItemID } });
    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemID} not found`);
    }

    cartItem.quantity = updateCartItemDto.quantity;
    return this.cartItemRepository.save(cartItem);
  }

  async remove(cartItemID: number): Promise<void> {
    console.log(`Removing cartItemID: ${cartItemID}`);
    // Xóa các CartItemOption liên quan
    const deleteOptionsResult = await this.cartItemOptionRepository.delete({ cartItem: { cartItemID } });
    console.log(`Deleted ${deleteOptionsResult.affected || 0} CartItemOptions for cartItemID: ${cartItemID}`);

    // Xóa CartItem
    const result = await this.cartItemRepository.delete(cartItemID);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart item with ID ${cartItemID} not found`);
    }
  }

  async findOne(cartItemID: string | number): Promise<CartItem> {
  const cartItem = await this.cartItemRepository.findOne({
    where: { cartItemID: Number(cartItemID) },
    relations: ['cart', 'product'], // nếu cần lấy thêm quan hệ
  });
  if (!cartItem) {
    throw new NotFoundException(`Cart item with ID ${cartItemID} not found`);
  }
  return cartItem;
}
}