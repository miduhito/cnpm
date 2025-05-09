/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { CartItemOption } from './cart-item-sidedish.entity';
import { ProductModule } from 'src/products/product.module';
import { CartItemService } from './cart-item.service';
import { Product } from 'src/products/product.entity';
import { Option } from 'src/options/option.entity';
import { CartItemController } from './cart-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,CartItem,CartItemOption,Product,Option]),ProductModule],
  controllers: [CartController,CartItemController],
  providers: [CartService,CartItemService],
})
export class CartModule {}
