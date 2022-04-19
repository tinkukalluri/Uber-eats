import { createSlice } from "@reduxjs/toolkit";

export const cartReducer = createSlice({
    name: "cartReducer",
    initialState: {
        items_data: {
            selectedItems: { items: [], restaurantName: "" },
        }
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            console.log('action.payload.restaurantName !== state.items_data.selectedItems.restaurantName', action.payload.restaurantName !== state.items_data.selectedItems.restaurantName)
            if (action.payload.restaurantName !== state.items_data.selectedItems.restaurantName) {
                let newState1 = {}
                newState1.selectedItems = {
                    items: [action.payload.items],
                    restaurantName: action.payload.restaurantName,
                }
                state.items_data = newState1
            } else {
                let newState = { ...state.items_data };
                newState.selectedItems = {
                    items: [...newState.selectedItems.items, action.payload.items],
                    restaurantName: action.payload.restaurantName,
                };
                state.items_data = newState
            }
            console.log("ADD TO CART", state.items_data);
        },
        REMOVE_FROM_CART: (state, action) => {
            console.log("REMOVE FROM CART");
            let newState = { ...state.items_data };
            newState.selectedItems = {
                items: [
                    ...newState.selectedItems.items.filter(
                        (item) => item.title !== action.payload.items.title
                    ),
                ],
                restaurantName: action.payload.restaurantName,
            };
            state.items_data = newState
            console.log("REMOVE FROM CART", newState);
        }
    }
});

export const { ADD_TO_CART, REMOVE_FROM_CART } = cartReducer.actions;

export default cartReducer.reducer;
