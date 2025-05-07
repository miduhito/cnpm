/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn,ManyToOne,JoinColumn,ManyToMany,JoinTable,OneToMany} from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Option } from 'src/options/option.entity';
import { CartItem } from 'src/cart/cart-item.entity';
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

    @ManyToOne(() => Category, { eager: true }) // eager: true sẽ tự join khi lấy product
    @JoinColumn({ name: 'categoryID' }) // nối với cột categoryID
    category: Category;

    @Column({ type: 'int' })
    quantity: number;
    @ManyToMany(() => Option, (option) => option.products, { eager: true }) // eager để tự load
    @JoinTable({
    name: 'product_option', // tên bảng trung gian
    joinColumn: {
        name: 'productID',
        referencedColumnName: 'productID',
    },
    inverseJoinColumn: {
        name: 'optionID',
        referencedColumnName: 'optionID',
    },
    })
    options: Option[];
    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];
}
