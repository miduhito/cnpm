/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,CartItem])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
