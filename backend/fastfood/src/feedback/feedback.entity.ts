/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryColumn()
  ID: string;

  @Column()
  orderID: string;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
