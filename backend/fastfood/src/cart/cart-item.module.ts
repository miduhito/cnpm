/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity'; // Nếu bạn có entity Product
import { CartItemOption } from './cart-item-sidedish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Cart, Product,CartItemOption])],
  controllers: [CartItemController],
  providers: [CartItemService], 
})
export class CartItemModule {}
