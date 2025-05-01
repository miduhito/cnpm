/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}
        findAll():Promise<Product[]>{
            return this.productRepository.find();
        }
        getProducts(): string{
            return'GET LIST PRODUCTS';
        }
        createProduct(): string{
            return'POST PRODUCT';
        }
        detailProduct(): string{
            return 'DETAIL PRODUCT';
        }
        updateProduct(): string{
            return'UPDATE PRODUCT';
        }
        deleteProduct(): string{
            return 'DELETE PRODUCT';
        }
}