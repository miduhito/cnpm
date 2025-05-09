/* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemService } from './cart-item.service';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
  ) {}

  // Tạo giỏ hàng mới
  @Post()
  async create(@Body() createCartDto: { cartID: string }): Promise<Cart> {
    return this.cartService.create(createCartDto);
  }

  // Lấy thông tin giỏ hàng
  @Get(':cartID')
  async findOne(@Param('cartID') cartID: string): Promise<Cart> {
    return this.cartService.findOne(cartID);
  }

  // Thêm sản phẩm vào giỏ hàng
  @Post(':cartID/add')
  async addProductToCart(
    @Param('cartID') cartID: string,
    @Body() body: { productID: string; quantity: number; optionIDs: string[] },
  ): Promise<CartItem> {
    const { productID, quantity, optionIDs } = body;
    return this.cartService.addProductToCart(cartID, productID, quantity, optionIDs);
  }

  // Cập nhật số lượng sản phẩm
  @Post('item/:cartItemID/update')
  async updateQuantity(
    @Param('cartItemID') cartItemID: number,
    @Body() updateCartItemDto: { quantity: number },
  ): Promise<CartItem> {
    return this.cartItemService.updateQuantity(cartItemID, updateCartItemDto);
  }

  // Xóa sản phẩm khỏi giỏ
  @Post('item/:cartItemID/remove')
  async remove(@Param('cartItemID') cartItemID: number): Promise<void> {
    return this.cartItemService.remove(cartItemID);
  }
}