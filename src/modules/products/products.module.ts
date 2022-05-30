import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PhotosService } from '../photos/photos.service';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
    controllers: [ProductsController],
    providers: [
        ProductsService,
        PhotosService,
        PrismaService,
    ],
})
export class ProductsModule { }