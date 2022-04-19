
import { configureStore } from '@reduxjs/toolkit'

import cartReducer from "./reducers/cartReducer";



export default configureStore({
    reducer: {
        cartUpdate: cartReducer,
    }
})

