import { Controller, Get } from '@nestjs/common';

@Controller()
export class ProductsController {

    @Get()
    index(){
        return 'hello world';
    }
}