/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../products/product.entity';

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
  @Column('json', { nullable: true })
  options: any[];  // Lưu thông tin về các lựa chọn trong giỏ hàng
}
