/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  ID: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @Column({ type: 'varchar', length: 100 })
  customerName: string;

  @Column({
    type: 'enum',
    enum: ['CASH', 'CARD', 'MOMO', 'ZALO_PAY'],
  })
  paymentMethod: 'CASH' | 'CARD' | 'MOMO' | 'ZALO_PAY';

  @Column({
    type: 'enum',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  })
  orderStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'varchar', length: 50 })
  cartID: string;

  @Column({ type: 'boolean', default: false })
  print: boolean;
}