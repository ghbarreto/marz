import React, { useEffect } from 'react';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableList from '../../components/DraggableList/DraggableList';
import Spinner from '../../components/Spinner/Spinner';
import { Order, OrderData } from '../../components/interfaces';
import { getInPipelineData, updateOrderStatus } from '../ApiHelper';
import PageWrapper from '../PageWrapper';
import { useAsync } from 'react-async';
import { postUpdateCards } from '../../api/postKanban';

const DATA_STATES = {
    waiting: 'WAITING',
    loaded: 'LOADED',
    error: 'ERROR',
};

interface IdList {
    '0': string;
    '1': string;
    '2': string;
    '3': string;
    '4': string;
}

const ID_LIST_MAP: IdList = {
    '0': 'Queued',
    '1': 'InProgress',
    '2': 'QA',
    '3': 'Cancelled',
    '4': 'Complete',
};

const HomePage = () => {
    const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
    const [data, setData] = useState({ Queued: [], InProgress: [], QA: [], Cancelled: [], Complete: [] } as
        | OrderData
        | any);
    const [err, setErr] = useState(false);
    const [successfullyUpdated, setSuccessfullyUpdated] = useState(false);

    const { run, isPending } = useAsync({
        deferFn: ([body]) => postUpdateCards(body),
        onResolve: d => {
            const { sourceKey, sourceIndex, OrderStatus, destIndex } = d.data.data;

            const sourceClone = Array.from(data[sourceKey]);
            const destClone: any = Array.from(data[OrderStatus]);

            const [removed] = sourceClone.splice(sourceIndex, 1);
            destClone.splice(destIndex, 0, removed);
            destClone[destIndex].OrderStatus = OrderStatus;
            setData({
                ...data,
                [sourceKey]: sourceClone,
                [OrderStatus]: destClone,
            });
            setErr(false);
            setSuccessfullyUpdated(true);
        },
        onReject: d => {
            setSuccessfullyUpdated(false);
            setErr(true);
        },
    });

    const getOrders = async () => {
        setLoadingState(DATA_STATES.waiting);
        const { orderData, errorOccured } = await getInPipelineData();
        setData(orderData);
        setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
    };

    const updateOrder = async (order: Order) => {
        setLoadingState(DATA_STATES.waiting);

        let newOrderStatus: keyof OrderData;

        switch (order.OrderStatus) {
            case 'QA':
                newOrderStatus = 'Complete';
                break;
            case 'Cancelled':
                newOrderStatus = 'QA';
                break;
            default:
                newOrderStatus = 'Cancelled';
                break;
        }

        const orderStatusUpdated = await updateOrderStatus(order, newOrderStatus);
        if (orderStatusUpdated) {
            const columnKey = order.OrderStatus as keyof OrderData;
            order.OrderStatus = newOrderStatus;
            setData((d: OrderData) => ({
                ...d,
                [columnKey]: data[columnKey].filter((otherOrder: Order) => otherOrder.OrderID !== order.OrderID),
                [newOrderStatus]: [...d[newOrderStatus], order],
            }));
        }
        setLoadingState(DATA_STATES.loaded);
    };

    const handleDragEnd = (result: any) => {
        const { source, destination } = result;
        if (!destination) return;
        const sourceKey = ID_LIST_MAP[source.droppableId as keyof IdList] as keyof OrderData;
        const sourceIndex = source.index;

        const destKey = ID_LIST_MAP[destination.droppableId as keyof IdList] as keyof OrderData;
        const destIndex = destination.index;

        if (sourceKey === destKey) {
            const sourceClone = Array.from(data[sourceKey]);
            const [removed] = sourceClone.splice(sourceIndex, 1);
            sourceClone.splice(destIndex, 0, removed);
            setData({ ...data, [sourceKey]: sourceClone });
        } else {
            return run({
                OrderID: result.draggableId,
                OrderStatus: destKey,
                sourceKey,
                destIndex,
                sourceIndex,
            });
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    let content;
    if (loadingState === DATA_STATES.waiting || isPending)
        content = (
            <div className="flex flex-row justify-center w-full pt-4" data-testid="loading-spinner-container">
                <Spinner />
            </div>
        );
    else if (loadingState === DATA_STATES.loaded)
        content = (
            <>
                {err && <div className="flex justify-center text-red-400">Error occured reordeing orders</div>}
                {successfullyUpdated && (
                    <div className="flex justify-center text-green-400">Successfully reordered orders</div>
                )}
                <div className="flex flex-row justify-center w-full pt-4" data-testid="pipeline-container">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <DraggableList
                            ID="0"
                            listTitle="Queued"
                            removeOrder={(order: Order) => updateOrder(order)}
                            items={data.Queued}
                        />
                        <DraggableList
                            ID="1"
                            listTitle="In Progress"
                            removeOrder={(order: Order) => updateOrder(order)}
                            items={data.InProgress}
                        />
                        <DraggableList
                            ID="2"
                            listTitle="QA"
                            removeOrder={(order: Order) => updateOrder(order)}
                            items={data.QA}
                        />
                        <DraggableList
                            ID="3"
                            listTitle="Cancelled"
                            removeOrder={(order: Order) => updateOrder(order)}
                            items={data.Cancelled}
                        />
                        <DraggableList
                            ID="4"
                            listTitle="Complete"
                            removeOrder={(order: Order) => updateOrder(order)}
                            items={data.Complete}
                        />
                    </DragDropContext>
                </div>
            </>
        );
    else
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
                data-testid="error-container"
            >
                An error occured fetching the data!
            </div>
        );

    return <PageWrapper>{content}</PageWrapper>;
};

export default HomePage;
