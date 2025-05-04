/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.serivce";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Category } from "src/category/category.entity";
import { Option } from "src/options/option.entity";
@Module({
    imports: [TypeOrmModule.forFeature([Product,Category,Option])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule{};