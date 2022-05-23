import {
    IsUUID,
    IsString,
    IsOptional,
    IsInt,
    IsNumber
} from 'class-validator';

import { OmitType } from '@nestjs/mapped-types';

export class ProductDTO {

    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string | null;

    @IsInt()
    available: number;

    @IsNumber()
    price: number;
}

export class CreateProductDTO extends OmitType(ProductDTO, ['id']) { }

export class DeletedProductDTO {
    deletedProduct: ProductDTO;
}