/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('invoice')
export class Invoice {
  @PrimaryColumn()
  ID: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  customerName: string;

  @Column({
    type: 'enum',
    enum: ['CASH', 'CARD', 'MOMO', 'ZALO_PAY'],
  })
  paymentMethod: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  orderID: string;
}
