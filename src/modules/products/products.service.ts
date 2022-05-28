import { HttpException, Injectable, } from "@nestjs/common";

import {
    CreateProductDTO, DeletedProductDTO, GetProductsDTO, ProductDTO
} from "src/dtos/product.dto";
import { GetProductQueryDTO } from "src/dtos/query.dto";

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

    async getProductById(id: string): Promise<ProductDTO | {}> {
        // Get and return the product
        const product = await this.prisma.product.findUnique({ where: { id } });
        return product ? product : {}
    }

    async getProducts(query: GetProductQueryDTO): Promise<GetProductsDTO> {
        // Get and count products
        const result = await this.prisma.$transaction([
            // Find
            this.prisma.product.findMany({
                where: {
                    name: { contains: query.name }
                },
                orderBy: { price: query.priceOrderBy },
                take: query.limit,
                skip: query.limit * (query.page - 1),
            }),
            // Count
            this.prisma.product.count({
                where: { name: { contains: query.name } }
            })
        ]);

        return {
            products: result[0],
            resultsFound: result[1]
        };
    }

    async delete(id: string): Promise<DeletedProductDTO> {

        const product = await this.prisma.product.findFirst({
            where: {
                id
            }
        });

        // Check if the product exists
        if (!product) {
            throw new HttpException(`Product does not exist`, 400);
        }

        const deletedProduct: ProductDTO = await this.prisma.product.delete({ where: { id } });
        return { deletedProduct }
    }
}