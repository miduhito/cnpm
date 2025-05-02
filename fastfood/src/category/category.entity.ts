/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn,OneToMany} from 'typeorm';
import { Product } from 'src/products/product.entity';
@Entity()
export class Category {
    @PrimaryColumn({ type: 'varchar', length: 50 })
    CategoryID : string;

    @Column({ type: 'varchar', length: 100 })
    name: string;
    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

}
