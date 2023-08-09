import type { DraggableProvided } from 'react-beautiful-dnd';

export interface Order {
    OrderID: number;
    CustomerID: number;
    ProductID: number;
    OrderStatus: string;
    CustomerFirstName: string;
    ProductName: string;
    ProductPhotoURL: string;
    CustomerLastName: string;
}

export interface OrderData {
    Queued: Order[];
    InProgress: Order[];
    QA: Order[];
    Complete: Order[];
    Cancelled: Order[];
}

export interface DraggableItemProps extends Order {
    draggableProvided: DraggableProvided;
    listTitle: string;
    removeOrder: (order: Order) => void;
}

export interface DraggableListProps {
    ID: string;
    listTitle: string;
    removeOrder: (order: Order) => void;
    items: Order[];
}

export interface HeaderLink {
    label: string;
    url: string;
}

export interface HeaderProps {
    links: HeaderLink[];
}
