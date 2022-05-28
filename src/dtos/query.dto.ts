import { Type } from 'class-transformer';
import {
    IsOptional,
    IsPositive,
    IsString,
    IsInt,
    IsIn,
    Max,
    Min
} from 'class-validator';

export class GetProductQueryDTO {
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @IsOptional()
    @Min(1)
    page = 1;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @IsOptional()
    @Min(1)
    @Max(100)
    limit = 50

    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsIn(['desc', 'asc'])
    priceOrderBy: 'asc' | 'desc';
}