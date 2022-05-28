import {
    ParseUUIDPipe,
    Controller,
    Delete,
    Param,
    Body,
    Post,
    Get,
    Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDTO, ProductDTO } from 'src/dtos/product.dto';
import { GetProductQueryDTO } from 'src/dtos/query.dto';

@Controller()
export class ProductsController {

    constructor(private readonly productServices: ProductsService) { }

    @Post('create')
    async create(@Body() productData: CreateProductDTO): Promise<ProductDTO> {
        return await this.productServices.create(productData);
    }

    @Get('product/:id')
    async getProduct(@Param('id', ParseUUIDPipe) id: string) {
        return await this.productServices.getProductById(id);
    }

    @Get('products')
    async getProducts(@Query() query: GetProductQueryDTO) {
        return await this.productServices.getProducts(query);
    }


    @Delete('delete/:id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.productServices.delete(id);
    }
}