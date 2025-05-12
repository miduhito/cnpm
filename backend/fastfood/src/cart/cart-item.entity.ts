/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column,OneToMany } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';
import {CartItemOption} from './cart-item-sidedish.entity';

@Entity('cart_item')
export class CartItem {
  @PrimaryGeneratedColumn()
  cartItemID: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  product: Product;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;
  @OneToMany(() => CartItemOption, (option) => option.cartItem, { cascade: true })
options: CartItemOption[];


}
