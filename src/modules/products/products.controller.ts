import { 
    ParseUUIDPipe, 
    Controller, 
    Delete, 
    Param, 
    Body, 
    Post,
    Get, 
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDTO, ProductDTO } from 'src/dtos/product.dto';

@Controller()
export class ProductsController {

    constructor(private readonly productServices: ProductsService){}

    @Post('create')
    async create(@Body() productData: CreateProductDTO): Promise<ProductDTO>{
        return await this.productServices.create(productData);
    }

    @Get('product/:id')
    async getProduct(@Param('id', ParseUUIDPipe) id: string){
        return await this.productServices.getProductById(id);
    }

    @Delete('delete/:id')
    async delete(@Param('id', ParseUUIDPipe) id: string){
        return await this.productServices.delete(id);
    }
}