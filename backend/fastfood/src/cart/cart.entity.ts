/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cartID: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
