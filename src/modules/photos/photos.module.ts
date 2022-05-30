import { Module } from "@nestjs/common";

import { PrismaService } from "src/database/prisma.service";
import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";

@Module({
    providers: [PhotosService, PrismaService],
    controllers: [PhotosController]
})
export class PhotosModule { }