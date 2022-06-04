import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

import { generateFilename } from "src/utils";
import { S3 } from "aws-sdk";
import { CreatePhotoDTO } from "src/dtos/photo.dto";

@Injectable({})
export class PhotosService {

    private s3: S3;

    constructor(private readonly prisma: PrismaService) {
        this.s3 = new S3();
    }

    async uploadPhoto(photo: Express.Multer.File) {
        // Upload parameters
        const parameters = {
            Bucket: process.env.BUCKET_NAME,
            Body: photo.buffer,
            Key: generateFilename(photo.originalname),
            ContentType: photo.mimetype,
            ACL: 'public-read'
        }

        // Upload file
        const res = await this.s3.upload(parameters).promise();

        // Return photo data
        return { key: res.Key, url: res.Location }
    }
}