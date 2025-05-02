/* eslint-disable prettier/prettier */
import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Product } from 'src/products/product.entity';

@Entity()
export class Option {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    optionID: string;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ManyToMany(() => Product, (product) => product.options)
    products: Product[];
}
