import axios from 'axios';
import { Order, OrderData } from '../components/interfaces';

const INPIPELINE_URL = 'http://localhost:5001/api/orders/inpipeline';

const getInPipelineData = async () => {
    const orderData: OrderData = {
        Queued: [],
        InProgress: [],
        QA: [],
    };
    let errorOccured = false;
    try {
        const response = await axios.get(INPIPELINE_URL);
        if (response?.status === 200) {
            const { data } = response.data;
            data.forEach((order: Order) => {
                orderData[order.OrderStatus as keyof OrderData].push(order);
            });
        } else {
            const { message } = response.data;
            throw message;
        }
    } catch (err) {
        console.error(err);
        errorOccured = true;
    }
    return { orderData, errorOccured };
};

const UPDATE_STATUS_URL = 'http://localhost:5001/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
    let orderStatusUpdated = false;
    try {
        const response = await axios.post(UPDATE_STATUS_URL, {
            OrderStatus: newOrderStatus,
            OrderID: order.OrderID,
            CustomerID: order.CustomerID,
            ProductID: order.ProductID,
        });
        if (response?.status === 200) orderStatusUpdated = true;
        else {
            const { message } = response.data;
            throw message;
        }
    } catch (err) {
        console.error(err);
    }
    return orderStatusUpdated;
};

export { getInPipelineData, INPIPELINE_URL, updateOrderStatus, UPDATE_STATUS_URL };
