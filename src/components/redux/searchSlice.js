import {createSlice} from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState:{searchQuery: {}},
    reducers: {
        searchAction:(state,action) => {
            state.searchQuery = action.payload;
        }
    }
})
export const {searchAction} = searchSlice.actions;
export default searchSlice.reducer;