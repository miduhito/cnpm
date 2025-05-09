/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from './products/product.entity';
import { Category } from './category/category.entity';
import { Option } from './options/option.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart/cart-item.entity';
import { CartItemOption } from './cart/cart-item-sidedish.entity';
import { CartItemModule } from './cart/cart-item.module';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/invoice.entity';

@Module({
  imports: [ProductModule,CartModule,CartItemModule,OrderModule,InvoiceModule,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cnpm',
      entities: [Product,Category,Option,Cart,CartItem,CartItemOption,Order,Invoice],
      synchronize: false,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource:DataSource){}
}
