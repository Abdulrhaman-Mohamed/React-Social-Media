import { createSlice } from "@reduxjs/toolkit";


const initSate={};

const selectedPostSlice = createSlice({
    name: "selectedPost",
    initialState: initSate,
    reducers: {
        setSelectedPost: (state, action) => {
            return action.payload;
        },
    },
});

export const { setSelectedPost } = selectedPostSlice.actions;
export default selectedPostSlice.reducer;