import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../database/prisma.service";
import { Product, Prisma } from "@prisma/client";

@Injectable()
export class ProductsService {
    constructor(private readonly productService: PrismaService) {}
}