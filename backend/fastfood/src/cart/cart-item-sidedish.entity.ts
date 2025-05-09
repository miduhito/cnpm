/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity('cart_item_option')
export class CartItemOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartItem, (item) => item.options)
  cartItem: CartItem;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  optionID: string;
}