/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemService } from './cart-item.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
  ) {}

  @Post()
  async create(@Body() createCartDto: { cartID: string }) {
    try {
      return await this.cartService.create(createCartDto);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create cart',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @Get(':cartID')
  // findOne(@Param('cartID') cartID: string) {
  //   return this.cartService.findOne(cartID);
  // }

  @Get('cart-item/:cartItemID')
getCartItem(@Param('cartItemID') cartItemID: string) {
  return this.cartItemService.findOne(cartItemID);
}

  @Post(':cartID/add')
  async addProductToCart(
    @Param('cartID') cartID: string,
    @Body() body: { productID: string; quantity: number; optionIDs: string[] },
  ) {
    try {
      return await this.cartService.addProductToCart(cartID, body.productID, body.quantity, body.optionIDs);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to add product to cart',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('cart-item/:cartItemID')
  async updateQuantity(@Param('cartItemID') cartItemID: string, @Body() body: { quantity: number }) {
    try {
      return await this.cartItemService.updateQuantity(+cartItemID, body);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete('cart-item/:cartItemID')
  async remove(@Param('cartItemID') cartItemID: string) {
    try {
      await this.cartItemService.remove(+cartItemID);
      return { message: `Cart item ${cartItemID} deleted successfully` };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}