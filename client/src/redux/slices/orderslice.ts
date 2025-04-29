import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the OrderItem type
interface OrderItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

// Define the state type for the order
interface OrderState {
    orderItems: OrderItem[];
    totalAmount: number;
    orderStatus: 'pending' | 'completed' | 'failed';
}

const initialState: OrderState = {
    orderItems: [],
    totalAmount: 0,
    orderStatus: 'pending',
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // Place the order and reset the cart
        placeOrder(state, action: PayloadAction<{ items: OrderItem[]; totalAmount: number }>) {
            const { items, totalAmount } = action.payload;

            // Set order details
            state.orderItems = items;
            state.totalAmount = totalAmount;
            state.orderStatus = 'completed'; // Mark the order as completed
        },


        // Reset order (for example, if user wants to cancel or after placing the order)
        resetOrder(state) {
            state.orderItems = [];
            state.totalAmount = 0;
            state.orderStatus = 'pending';
        },
    },
});

// Export actions to dispatch
export const { placeOrder, resetOrder } = orderSlice.actions;

// Export the reducer to be added in the store
export default orderSlice.reducer;
