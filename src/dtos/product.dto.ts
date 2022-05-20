export interface ProductDTO {
    id: string;
    name: string;
    description: string | null;
    available: number;
    price: number;
}

export interface CreateProductDTO extends Omit<ProductDTO, 'id'> { }
