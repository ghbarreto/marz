import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableList from './DraggableList';
import { Order } from '../interfaces';

export default {
    title: 'Draggable List',
    component: DraggableList,
} as ComponentMeta<typeof DraggableList>;

const Template: ComponentStory<typeof DraggableList> = args => (
    <DragDropContext onDragEnd={() => {}}>
        <DraggableList {...args} />
    </DragDropContext>
);

const getArgs = (OrderStatus: string) => ({
    ID: '12345',
    listTitle: 'Test List',
    removeOrder: (order: Order) => {},
    items: [
        {
            OrderID: 1234,
            CustomerID: 1234,
            ProductID: 1234,
            OrderStatus,
            CustomerFirstName: 'Test3',
            CustomerLastName: 'McTest3',
            ProductName: 'Shoes',
            ProductPhotoURL:
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
        },
        {
            OrderID: 1235,
            CustomerID: 1235,
            ProductID: 1235,
            OrderStatus,
            CustomerFirstName: 'Test3',
            CustomerLastName: 'McTest3',
            ProductName: 'Shoes',
            ProductPhotoURL:
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
        },
        {
            OrderID: 1236,
            CustomerID: 1236,
            ProductID: 1236,
            OrderStatus,
            CustomerFirstName: 'Test3',
            CustomerLastName: 'McTest3',
            ProductName: 'Shoes',
            ProductPhotoURL:
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
        },
    ],
});

export const NotInQA = Template.bind({});
NotInQA.args = getArgs('InProgress');

export const InQA = Template.bind({});
InQA.args = getArgs('QA');
