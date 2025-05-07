/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity'; // Nếu bạn có entity Product

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Cart, Product])],
  controllers: [CartItemController],
  providers: [CartItemService], 
})
export class CartItemModule {}
