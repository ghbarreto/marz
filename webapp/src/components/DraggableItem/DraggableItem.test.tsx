import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { create, ReactTestRenderer } from 'react-test-renderer';
import DraggableItem from './DraggableItem';

describe('DraggableItem', () => {
    let tree: ReactTestRenderer;
    const ID = '1234';
    beforeEach(() => {
        const draggableProvided: DraggableProvided = {
            innerRef: () => {},
            draggableProps: {
                'data-rbd-draggable-context-id': '1',
                'data-rbd-draggable-id': '1',
            },
            dragHandleProps: null,
        };
        const props = {
            CustomerFirstName: 'Test3',
            CustomerID: 2345,
            CustomerLastName: 'McTest3',
            OrderID: 1234,
            OrderStatus: 'QA',
            ProductID: 3456,
            ProductName: 'Shoes',
            ProductPhotoURL:
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
            draggableProvided,
            removeOrder: () => {},
        };
        tree = create(<DraggableItem {...props} />);
    });
    afterEach(() => {
        tree.unmount();
    });
    it('rendersDraggableItem', async () => {
        const testInstance = tree.root;
        await testInstance.findByProps({ 'data-testid': `draggable-container-${ID}` });
        await testInstance.findByProps({ 'data-testid': `draggable-customerID-${ID}` });
        await testInstance.findByProps({ 'data-testid': `draggable-productID-${ID}` });
        await testInstance.findByProps({ 'data-testid': `draggable-btn-${ID}` });
    });
});
