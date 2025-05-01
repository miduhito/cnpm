/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.serivce";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule{};