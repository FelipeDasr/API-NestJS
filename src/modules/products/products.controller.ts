import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

import { CreateProductDTO, ProductDTO } from 'src/dtos/product.dto';

@Controller()
export class ProductsController {

    constructor(private readonly productServices: ProductsService){}

    @Post('create')
    async create(@Body() productData: CreateProductDTO): Promise<ProductDTO>{
        return await this.productServices.create(productData);
    }
}