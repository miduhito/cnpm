/* eslint-disable prettier/prettier */
import { Controller, Patch, Param, Delete, Body } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.entity';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  // Cập nhật số lượng sản phẩm trong giỏ
  @Patch(':cartItemID')
  updateQuantity(
    @Param('cartItemID') cartItemID: number,
    @Body() updateCartItemDto: { quantity: number },
  ): Promise<CartItem> {
    return this.cartItemService.updateQuantity(cartItemID, updateCartItemDto);
  }

  // Xóa sản phẩm khỏi giỏ
  @Delete(':cartItemID')
  remove(@Param('cartItemID') cartItemID: number): Promise<void> {
    return this.cartItemService.remove(cartItemID);
  }
}