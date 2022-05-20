import { HttpException, Injectable, } from "@nestjs/common";

import { CreateProductDTO, ProductDTO } from "src/dtos/product.dto";

import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateProductDTO): Promise<ProductDTO> {
        // Gets a product with the same name
        const productAlreadyExists = await this.prisma.product.findFirst({
            where: {
                name: data.name
            }
        });

        // Check if the product already exists
        if (productAlreadyExists) {
            throw new HttpException(`Product already exists`, 400);
        }

        // Create the new product
        return await this.prisma.product.create({ data });
    }

    
}