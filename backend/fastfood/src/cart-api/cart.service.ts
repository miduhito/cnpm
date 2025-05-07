import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
  ) {}

  async getCartById(cartID: string) {
    return this.cartRepo.findOne({
      where: { cartID },
      relations: ['items'],
    });
  }

  async createCart(cartID: string) {
    const cart = this.cartRepo.create({ cartID });
    return this.cartRepo.save(cart);
  }
}
