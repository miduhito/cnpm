import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn
  } from 'typeorm';
  import { Cart } from './cart.entity';
//   import { Receipt } from '...'; // Update to correct path
//   import { Order } from '...'; // Update to correct path
  
  @Entity()
  export class CartItem {
    @PrimaryGeneratedColumn()
    cartItemID: number;
  
    @Column()
    cartID: string;
  
    @ManyToOne(() => Cart, cart => cart.items)
    @JoinColumn({ name: 'cartID' })
    cart: Cart;
  
    @Column()
    quantity: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    unitPrice: number;
  
    @Column({ nullable: true })
    receiptID: string;
  
    @Column({ nullable: true })
    orderID: string;
  }
  