import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the CartItem type
interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

// Define the state type for the cart
interface CartState {
    items: CartItem[];
    totalAmount: number;
}

function getInitialCartState(): CartState {
    const persistedCart = localStorage.getItem("cart");


    if (persistedCart) {
        try {
            const parsed = JSON.parse(persistedCart);
            // Validate that parsed is an object with the proper keys.
            if (
                parsed &&
                typeof parsed === "object" &&
                Array.isArray(parsed.items) &&
                typeof parsed.totalAmount === "number"
            ) {
                return parsed;
            }
        } catch (error) {
            console.error("Error parsing persisted cart:", error);
        }
    }
    // Fallback if no valid persisted state is found.
    return { items: [], totalAmount: 0 };
}

const initialState: CartState = getInitialCartState();


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add an item to the cart
        addToCart(state, action: PayloadAction<CartItem>) {
            const newItem = action.payload;

            const existingItem = state?.items?.find(item => item.id === newItem.id);

            if (existingItem) {
                // If item exists, increase the quantity
                existingItem.quantity += newItem.quantity;
            } else {
                // Otherwise, add the item with quantity 1
                state?.items?.push({
                    ...newItem,
                    quantity: newItem.quantity,
                });
            }


            // Recalculate total amount
            state.totalAmount = state?.items?.reduce(
                (total, item) => Math.ceil(total + item.price * item.quantity),
                0
            );


            


        },

        // Remove an item from the cart
        removeFromCart(state, action: PayloadAction<string>) {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.id !== itemId);

            // Recalculate total amount
            state.totalAmount = state.items.reduce(
                (total, item) => Math.ceil(total + item.price * item.quantity),
                0
            );
        },

        updateQuantity(state, action: PayloadAction<{ id: string, quantity: number }>) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity = quantity;  // Update quantity based on action payload
            }

            // Recalculate total amount after quantity change
            state.totalAmount = state.items.reduce(
                (total, item) => Math.ceil(total + item.price * item.quantity),
                0
            );
        },

        // Clear the cart
        clearCart(state) {
            state.items = [];
            state.totalAmount = 0;
        },
    },
});


// Export actions to dispatch
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

// Export the reducer to be added in the store
export default cartSlice.reducer;
