/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity'; // Sử dụng đúng tên trường

@Injectable()
export class CartItemService {
    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

  // Thêm sản phẩm vào giỏ
    async create(createCartItemDto: { cartID: string, productID: string, quantity: number, unitPrice: number,sideDishes: any[] }): Promise<CartItem> {
    const { cartID, productID, quantity, unitPrice, sideDishes } = createCartItemDto;

    // Tìm giỏ hàng
    const cart = await this.cartRepository.findOne({ where: { cartID } });
    if (!cart) {
        throw new Error('Cart not found');
    }

    // Tìm sản phẩm
    const product = await this.productRepository.findOne({ where: { productID: productID } });
    if (!product) {
        throw new Error('Product not found');
    }

    // Tạo đối tượng CartItem mới
    const cartItem = this.cartItemRepository.create({
        cart,
        product,
        quantity,
        unitPrice,
        options: sideDishes,
    });

    // Lưu vào database
    return this.cartItemRepository.save(cartItem);
    }

  // Cập nhật số lượng sản phẩm trong giỏ
    async updateQuantity(cartItemID: number, updateCartItemDto: { quantity: number }): Promise<CartItem> {
        const cartItem = await this.cartItemRepository.findOne({ where: { cartItemID } });
        if (!cartItem) {
            throw new Error('Cart item not found');
        }

    // Cập nhật số lượng
    cartItem.quantity = updateCartItemDto.quantity;
    return this.cartItemRepository.save(cartItem);
    }

  // Xoá sản phẩm khỏi giỏ
    async remove(cartItemID: number): Promise<void> {
        await this.cartItemRepository.delete(cartItemID);
    }
}
