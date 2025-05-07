/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.entity';

@Controller('cart-items')
export class CartItemController {
    constructor(private readonly cartItemService: CartItemService) {}

  // Thêm sản phẩm vào giỏ
    @Post()
    create(@Body() createCartItemDto: { cartID: string, productID: string, quantity: number, unitPrice: number,sideDishes: any[] }): Promise<CartItem> {
        return this.cartItemService.create(createCartItemDto);
    }

    // Cập nhật số lượng sản phẩm trong giỏ
    @Patch(':cartItemID')
    updateQuantity(@Param('cartItemID') cartItemID: number, @Body() updateCartItemDto: { quantity: number }): Promise<CartItem> {
        return this.cartItemService.updateQuantity(cartItemID, updateCartItemDto);
    }

    // Xoá sản phẩm khỏi giỏ
    @Delete(':cartItemID')
    remove(@Param('cartItemID') cartItemID: number): Promise<void> {
        return this.cartItemService.remove(cartItemID);
    }
}
