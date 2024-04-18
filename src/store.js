import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./feature/post/postSlice";
import selectedPostReducer from "./feature/post/selectedPostSlice";


export const store = configureStore({
    reducer: {
        post: postReducer,
        selectedPost: selectedPostReducer,
    },
}); 