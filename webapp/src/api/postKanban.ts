import axios, { AxiosResponse } from 'axios';

export type Order = {
    OrderID: number;
    OrderStatus: string;
    sourceIndex: number;
    sourceKey: string;
    destIndex: number;
};

export const postUpdateCards = async (body: Order): Promise<AxiosResponse<{ data: Order }>> => {
    return await axios.post('http://localhost:5001/api/orders/update_cards', body);
};
