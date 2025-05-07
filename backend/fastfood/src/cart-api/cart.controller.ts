import { Controller, Get, Post, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':id')
  getCart(@Param('id') id: string) {
    return this.cartService.getCartById(id);
  }

  @Post(':id')
  createCart(@Param('id') id: string) {
    return this.cartService.createCart(id);
  }
}
