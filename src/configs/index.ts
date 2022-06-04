import {
    MulterOptions
} from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

import { HttpException, ValidationPipeOptions } from "@nestjs/common";
import { isImageFile, generateFilename } from '../utils';
import { diskStorage } from 'multer';

export const validationPipeOptions: ValidationPipeOptions = {
    whitelist: true,
    transform: true,
    forbidUnknownValues: true
}

export const uploadConfig: MulterOptions = {
    limits: {
        fileSize: 1048576, // 1MB
        files: 5,
    },
    fileFilter: (req, file, cb) => {
        if (isImageFile(file.originalname)) {
            return cb(null, true);
        }
        return cb(
            new HttpException('Only image files are allowed!', 400),
            false
        );
    },
}