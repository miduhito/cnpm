/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller,Get,Param} from "@nestjs/common";
import { ProductService } from "./product.serivce";
import { Product } from "./product.entity";

@Controller('products')
export class ProductController{
    constructor(private readonly productService: ProductService){}
    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
        }
    // @Post()
    // createProduct(): ResponseData<string>{
    //     try {
    //         return new ResponseData<string>(this.productService.createProduct(),HttpStatus.statusCode,HttpMessage.SUCCESS);
    //     } catch (error) {
    //         return new ResponseData<string>(null,HttpStatus.ERROR,HttpMessage.ERROR);
    //     }
    // }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Product|null> {
        return this.productService.findOne(id);
}

    // @Put('/:id')
    // updateProduct(): ResponseData<string>{
    //     try {
    //         return new ResponseData<string>(this.productService.updateProduct(),HttpStatus.statusCode,HttpMessage.SUCCESS);
    //     } catch (error) {
    //         return new ResponseData<string>(null,HttpStatus.ERROR,HttpMessage.ERROR);
    //     }
    // }
    // @Delete('/:id')
    // deleteProduct(): ResponseData<string>{
    //     try {
    //         return new ResponseData<string>(this.productService.deleteProduct(),HttpStatus.statusCode,HttpMessage.SUCCESS);
    //     } catch (error) {
    //         return new ResponseData<string>(null,HttpStatus.ERROR,HttpMessage.ERROR);
    //     }
    // }

}