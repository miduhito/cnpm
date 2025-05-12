/* eslint-disable prettier/prettier *//* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemService } from './cart-item.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly cartItemService: CartItemService,
  ) {}

  @Post()
  create(@Body() createCartDto: { cartID: string }) {
    return this.cartService.create(createCartDto);
  }

  @Get(':cartID')
  findOne(@Param('cartID') cartID: string) {
    return this.cartService.findOne(cartID);
  }

  @Post(':cartID/add')
  addProductToCart(
    @Param('cartID') cartID: string,
    @Body() body: { productID: string; quantity: number; optionIDs: string[] },
  ) {
    return this.cartService.addProductToCart(cartID, body.productID, body.quantity, body.optionIDs);
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