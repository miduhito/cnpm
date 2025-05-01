/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn} from 'typeorm';
@Entity()
export class Product {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    productID: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    img: string;

    @Column({ type: 'varchar', length: 50 })
    categoryID: string;

    @Column({ type: 'int' })
    quantity: number;
}
