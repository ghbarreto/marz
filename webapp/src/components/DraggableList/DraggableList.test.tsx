import React from 'react';
import { render, screen } from '@testing-library/react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableList from './DraggableList';
import { Order } from '../interfaces';

describe('DraggableList', () => {
    it('rendersDraggableList', async () => {
        const ID = '1234';
        const props = {
            ID,
            listTitle: 'Test List',
            removeOrder: (order: Order) => {},
            items: [
                {
                    OrderID: 1234,
                    CustomerID: 1234,
                    ProductID: 123456,
                    OrderStatus: 'InProgress',
                    CustomerFirstName: 'Test3',
                    CustomerLastName: 'McTest3',
                    ProductName: 'Shoes',
                    ProductPhotoURL:
                        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
                },
                {
                    OrderID: 1235,
                    CustomerID: 1235,
                    ProductID: 123456,
                    OrderStatus: 'InProgress',
                    CustomerFirstName: 'Test3',
                    CustomerLastName: 'McTest3',
                    ProductName: 'Shoes',
                    ProductPhotoURL:
                        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
                },
                {
                    OrderID: 1236,
                    CustomerID: 1236,
                    ProductID: 123456,
                    OrderStatus: 'InProgress',
                    CustomerFirstName: 'Test3',
                    CustomerLastName: 'McTest3',
                    ProductName: 'Shoes',
                    ProductPhotoURL:
                        'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
                },
            ],
        };
        render(
            <DragDropContext onDragEnd={() => {}}>
                <DraggableList {...props} />
            </DragDropContext>
        );
        expect(screen.getByTestId(`droppable-container-${ID}`)).toBeInTheDocument();
        expect(screen.getByTestId(`droppable-title-${ID}`)).toBeInTheDocument();
        expect(screen.getByText(`1234`)).toBeInTheDocument();
        expect(screen.getByText(`1235`)).toBeInTheDocument();
        expect(screen.getByText(`1236`)).toBeInTheDocument();
    });
});
