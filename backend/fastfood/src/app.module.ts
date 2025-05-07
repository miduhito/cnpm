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
import { MomoModule } from './momo/momo.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { CartItem } from './cart/cart-item.entity';
import { CartItemModule } from './cart/cart-item.module';

@Module({
  imports: [ProductModule,MomoModule,CartModule,CartItemModule,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'cnpm',
      entities: [Product,Category,Option,Cart,CartItem],
      synchronize: false,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource:DataSource){}
}
