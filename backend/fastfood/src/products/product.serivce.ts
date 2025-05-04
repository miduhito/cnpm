/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";
@Injectable()
export class ProductService{
    private productCache: Product[]=[];
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ){}
        findAll():Promise<Product[]>{
            return this.productRepository.find({ relations: ['options'] });
        }
        async findOne(id: string): Promise<Product | null> {
            return this.productRepository.findOne({
                where: { productID: id },
                relations: ['options'],
            });
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