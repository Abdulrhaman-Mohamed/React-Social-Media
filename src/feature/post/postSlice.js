import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useInfinityPost from "../../hooks/useInfinityPost";
import { getPostsPage } from "../../api/axios";

    const initState = {
        posts:[],
        loading:true,
        error:null,
        hasMore:true,
        pages:[]
    }

    export const fetchPostsPaginagtions = createAsyncThunk(
        "post/fetchPostsPaginagtions",
        async(pageNum=1 , thunkAPI)=>{
            try {
                const posts = await getPostsPage(pageNum);
                return {posts,loading:false,error:null,hasMore: posts.length > 0 , pageNum}
            } catch (error) {
                return {posts:[],loading:false,error,hasMore: false}
            }
            
        }
    )

const postSlice = createSlice({
    name: "post",
    initialState: initState,
    reducers: {
        add_update_Post: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        loadingPosts: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPostsPaginagtions.fulfilled, (state, action)=>{
            state.posts.push(...action.payload.posts) 
            state.pages.push(action.payload.pageNum)
            state.loading = action.payload.loading
            state.error = action.payload.error
            state.hasMore = action.payload.hasMore
        })
    }
});


export const { add_update_Post, deletePost , loadingPosts  } = postSlice.actions;
export default postSlice.reducer;

