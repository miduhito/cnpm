import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryColumn()
  cartID: string;

  @OneToMany(() => CartItem, item => item.cart)
  items: CartItem[];
}
