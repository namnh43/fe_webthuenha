import {configureStore} from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
// import searchReducer from ''
export const store = configureStore({
    reducer: {
        search:searchReducer,
    }
})