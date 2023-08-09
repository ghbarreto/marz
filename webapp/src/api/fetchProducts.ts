import axios, { AxiosResponse } from 'axios';

export type Product = {
    ProductID: Number;
    ProductName: string;
    ProductPhotoURL: string;
    ProductStatus: string;
};

export const fetchProducts = async (): Promise<AxiosResponse<Product[]>> => {
    return await axios.get<Product[]>('http://localhost:5002/api/products');
};
