import React from 'react';
import { DraggableProvided, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableItem from '../DraggableItem/DraggableItem';
import { DraggableListProps } from '../interfaces';

const DraggableList = (props: DraggableListProps) => {
    const bgColors = {
        Queued: 'bg-stone-500',
        'In Progress': 'bg-orange-500',
        QA: 'bg-cyan-500',
        Cancelled: 'bg-rose-500',
        Complete: 'bg-green-500',
    }[props.listTitle];

    return (
        <Droppable droppableId={props.ID}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    className={`${bgColors} p-4 w-full`}
                    data-testid={`droppable-container-${props.ID}`}
                >
                    <h5 className="font-bold text-white" data-testid={`droppable-title-${props.ID}`}>
                        {props.listTitle}
                    </h5>
                    {props.items.length > 0 &&
                        props.items.map((item, index) => (
                            <Draggable key={item.OrderID} draggableId={`${item.OrderID}`} index={index}>
                                {(provided: DraggableProvided) => (
                                    <DraggableItem
                                        {...item}
                                        OrderID={item.OrderID}
                                        CustomerID={item.CustomerID}
                                        ProductID={item.ProductID}
                                        OrderStatus={item.OrderStatus}
                                        draggableProvided={provided}
                                        removeOrder={props.removeOrder}
                                        listTitle={props.listTitle}
                                    />
                                )}
                            </Draggable>
                        ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DraggableList;
