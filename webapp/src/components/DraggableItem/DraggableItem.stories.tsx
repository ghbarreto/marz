import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import type { DraggableProvided } from 'react-beautiful-dnd';
import { Order } from '../interfaces';
import DraggableItem from './DraggableItem';

export default {
    title: 'Draggable Item',
    component: DraggableItem,
} as ComponentMeta<typeof DraggableItem>;

const Template: ComponentStory<typeof DraggableItem> = args => <DraggableItem {...args} />;

const draggableProvided: DraggableProvided = {
    innerRef: () => {},
    draggableProps: {
        'data-rbd-draggable-context-id': '1',
        'data-rbd-draggable-id': '1',
    },
    dragHandleProps: null,
};

const getArgs = (OrderStatus: string) => ({
    CustomerFirstName: 'Test3',
    CustomerID: 3,
    CustomerLastName: 'McTest3',
    OrderID: 5,
    ProductID: 2,
    ProductName: 'Shoes',
    ProductPhotoURL:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',

    OrderStatus,
    draggableProvided,
    removeOrder: (order: Order) => {},
});

export const NotInQA = Template.bind({});
NotInQA.args = getArgs('InProgress');

export const InQA = Template.bind({});
InQA.args = getArgs('QA');
