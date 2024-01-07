import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    // notes: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addToCart:(state, action) => {            
            const item = state.products.find(item => item.id === action.payload.id)

            if(item){
                item.quantity += action.payload.quantity;
            }else{
                state.products.push(action.payload);
            }
        },
        removeItem: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        },
        increment: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id)            
            if (item)
                item.quantity += (item.quantity <= 100 ? 1 : 0)
        },
        decrement: (state, action) => {
            const item = state.products.find(item => item.id === action.payload.id)
            if (item)
                item.quantity -= (item.quantity > 1 ? 1 : 0)
        },
        // addNote: (state, action) => {
        //     state.notes.push(action.payload);
        // },
        emptyCart: (state) => {
            state.products = []
        },
    },
});

export const { addToCart, removeItem, emptyCart, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;