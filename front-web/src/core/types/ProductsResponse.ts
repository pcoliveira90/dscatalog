import { Product } from "./Product";

export type ProductsResponse={
    content: Product[];
    totalPages:number;
    size:number;
    totalElements:number;
}