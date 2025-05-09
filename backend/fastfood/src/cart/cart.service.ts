/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { CartItemOption } from './cart-item-sidedish.entity';
import { Product } from '../products/product.entity';
import { Option } from '../options/option.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(CartItemOption)
    private readonly cartItemOptionRepo: Repository<CartItemOption>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Option)
    private readonly optionRepo: Repository<Option>,
  ) {}

  async create(createCartDto: { cartID: string }): Promise<Cart> {
    const { cartID } = createCartDto;
    const cart = this.cartRepository.create({ cartID });
    return this.cartRepository.save(cart);
  }

  async findOne(cartID: string): Promise<any> {
    const cart = await this.cartRepository.findOne({
      where: { cartID },
      relations: ['cartItems', 'cartItems.product', 'cartItems.options'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return {
      cartID: cart.cartID,
      cartItems: cart.cartItems.map((item) => ({
        cartItemID: item.cartItemID,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        product: {
          productID: item.product.productID,
          name: item.product.name,
          price: item.product.price,
          description: item.product.description,
          img: item.product.img,
          quantity: item.product.quantity,
        },
        options: item.options.map((opt) => ({
          id: opt.id,
          name: opt.name,
          price: opt.price,
          optionID: opt.optionID,
        })),
      })),
    };
  }

  async addProductToCart(cartID: string, productID: string, quantity: number, optionIDs: string[] = []): Promise<any> {
    const cart = await this.cartRepository.findOne({ where: { cartID } });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = await this.productRepo.findOne({
      where: { productID },
      relations: ['options'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let unitPrice = parseFloat(product.price.toString());
    let selectedOptions: Option[] = [];
    if (optionIDs.length > 0) {
      selectedOptions = await this.optionRepo.findByIds(optionIDs);
      if (selectedOptions.length !== optionIDs.length) {
        throw new NotFoundException('One or more options not found');
      }

      const validOptionIDs = product.options.map((opt) => opt.optionID);
      const invalidOptions = optionIDs.filter((id) => !validOptionIDs.includes(id));
      if (invalidOptions.length > 0) {
        throw new NotFoundException(`Options ${invalidOptions.join(', ')} are not available for this product`);
      }

      const optionPrice = selectedOptions.reduce((sum, opt) => sum + parseFloat(opt.price.toString()), 0);
      unitPrice += optionPrice;
    }

    const cartItem = this.cartItemRepo.create({
      cart,
      product,
      quantity,
      unitPrice: parseFloat(unitPrice.toFixed(2)),
    });
    await this.cartItemRepo.save(cartItem);

    if (selectedOptions.length > 0) {
      const cartItemOptions = selectedOptions.map((option) => ({
        cartItem,
        optionID: option.optionID,
        name: option.name,
        price: parseFloat(option.price.toString()),
      }));
      const createdOptions = await this.cartItemOptionRepo.save(cartItemOptions);
      cartItem.options = createdOptions;
    }

    return {
      cartItemID: cartItem.cartItemID,
      quantity: cartItem.quantity,
      unitPrice: cartItem.unitPrice,
      cart: { cartID: cartItem.cart.cartID },
      product: {
        productID: cartItem.product.productID,
        name: cartItem.product.name,
        price: cartItem.product.price,
        description: cartItem.product.description,
        img: cartItem.product.img,
        quantity: cartItem.product.quantity,
      },
      options: cartItem.options.map((opt) => ({
        id: opt.id,
        name: opt.name,
        price: opt.price,
        optionID: opt.optionID,
      })),
    };
  }
}