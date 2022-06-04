import {
    IsUUID,
    IsString,
    IsOptional,
    IsInt,
    IsNumber,
    Min
} from 'class-validator';

import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { PhotoDTO } from './photo.dto';

export class ProductDTO {

    @IsUUID()
    id: string;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string | null;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    available: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    price: number;
}

export class CreateProductDTO extends OmitType(ProductDTO, ['id']) { }

export class DeletedProductDTO {
    deletedProduct: ProductDTO;
}

export class GetProductsDTO {
    products: ProductDTO[];
    resultsFound: number;
}

export class CompleteProductDTO extends ProductDTO {
    photos: PhotoDTO[]
}