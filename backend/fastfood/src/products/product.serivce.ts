/* eslint-disable prettier/prettier */
import { Injectable, Logger, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  private productCache: Product[] = [];

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.productRepository.find({ relations: ['category', 'options'] });
      this.productCache = products;
      return products;
    } catch (error) {
      this.logger.error(`Failed to fetch products: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { productID: id },
        relations: ['category', 'options'],
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return product;
    } catch (error) {
      this.logger.error(`Failed to fetch product with ID ${id}: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch product');
    }
  }

  getProducts(): string {
    return 'GET LIST PRODUCTS';
  }

  createProduct(): string {
    return 'POST PRODUCT';
  }

  detailProduct(): string {
    return 'DETAIL PRODUCT';
  }

  updateProduct(): string {
    return 'UPDATE PRODUCT';
  }

  deleteProduct(): string {
    return 'DELETE PRODUCT';
  }
}