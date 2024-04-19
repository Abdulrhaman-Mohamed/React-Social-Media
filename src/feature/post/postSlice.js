import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useInfinityPost from "../../hooks/useInfinityPost";
import { getPostsPage } from "../../api/axios";
import { update } from "firebase/database";

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
        addPost: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        },
        deletePostReducer: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        loadingPosts: (state, action) => {
            state.loading = action.payload;
        },
        updatePostReducer:(state , action)=>{
            state.posts= state.posts.filter((post)=>{
                
                if(post._id === action.payload._id){
                    return action.payload
                }
            })
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPostsPaginagtions.fulfilled, (state, action)=>{
            state.posts.push(...action.payload.posts.filter((post)=>!state.posts.includes(post))) 
            state.pages.push(action.payload.pageNum)
            state.loading = action.payload.loading
            state.error = action.payload.error
            state.hasMore = action.payload.hasMore
        })
    }
});


export const { addPost, deletePostReducer , loadingPosts , updatePostReducer  } = postSlice.actions;
export default postSlice.reducer;

