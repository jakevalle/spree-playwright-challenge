export interface ProductOrder {
    id: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    displayPrice: string;
    regularPrice: string;
    salePrice?: string;
    cost: string;
}