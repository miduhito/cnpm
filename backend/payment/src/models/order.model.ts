import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderStatus } from '../interfaces/order.interface';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column('jsonb')
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }[];

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column()
  paymentMethod: string;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}