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




@Module({
  imports: [ProductModule,MomoModule,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567890',
      database: 'cnpm',
      entities: [Product,Category,Option],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource:DataSource){
    this.dataSource.initialize()
      .then(() => console.log('✅ Kết nối CSDL thành công!'))
      .catch((err) => console.error('❌ Kết nối CSDL thất bại:', err));
  }
}

