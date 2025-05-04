export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface OrderRequest {
    customerId: number;
    items: OrderItem[];
    address: string;
    phoneNumber: string;
    paymentMethod: 'CASH' | 'CREDIT_CARD' | 'BANK_TRANSFER';
    notes?: string;
  }
  
  export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    DELIVERING = 'DELIVERING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  