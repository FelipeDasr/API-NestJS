import { IsUUID, IsString, IsUrl } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class PhotoDTO {
    @IsUUID()
    id: string;

    @IsUUID()
    productId: string;

    @IsUrl()
    url: string;

    @IsString()
    key: string;
}

export class CreatePhotoDTO extends OmitType(PhotoDTO, ['id', 'productId']) { }