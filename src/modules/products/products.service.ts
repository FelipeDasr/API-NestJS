import { HttpException, Injectable, } from "@nestjs/common";

import {
    CompleteProductDTO,
    CreateProductDTO, DeletedProductDTO, GetProductsDTO,
} from "src/dtos/product.dto";
import { GetProductQueryDTO } from "src/dtos/query.dto";

import { PrismaService } from "../../database/prisma.service";
import { PhotosService } from "../photos/photos.service";

@Injectable()
export class ProductsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly photosService: PhotosService
    ) { }

    async create(product: CreateProductDTO, files: Express.Multer.File[]): Promise<CompleteProductDTO> {
        // Gets a product with the same name
        const productAlreadyExists = await this.prisma.product.findFirst({
            where: {
                name: product.name
            }
        });

        // Check if the product already exists
        if (productAlreadyExists) {
            throw new HttpException(`Product already exists`, 400);
        }

        const newProduct = await this.prisma.product.create({
            data: {
                ...product,
                photos: {
                    create: await this.photosService.uploadPhotos(files)
                }
            },
            include: {
                photos: true
            }
        });

        // Create the new product
        return newProduct
    }

    async getProductById(id: string): Promise<CompleteProductDTO | {}> {
        // Get and return the product
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                photos: true
            }
        });
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
                include: {
                    photos: true
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

        const deletedProduct: CompleteProductDTO = await this.prisma.product.delete({
            where: { id },
            include: {
                photos: true
            }
        });

        // Delete all product photos
        await this.photosService.deletePhotos(deletedProduct.photos);
        
        return { deletedProduct }
    }
}