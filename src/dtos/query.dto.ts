import {
    IsIn, IsInt, IsOptional, IsPositive, IsString
} from 'class-validator';

export class GetProductQueryDTO {
    @IsInt()
    @IsPositive()
    @IsOptional()
    page: 1;

    @IsInt()
    @IsPositive()
    @IsOptional()
    limit: 50

    @IsString()
    @IsOptional()
    name: string;

    @IsOptional()
    @IsIn(['desc', 'asc'])
    priceOrderBy: 'desc';
}