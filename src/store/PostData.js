import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    posts:[]
}

const postSlice = createSlice(
    {
        name:"posts",
        initialState,
        reducers:{
            addPosts:(state,action)=>{
                state.posts = action.payload
                return state
            },
            likePost: (state, action) => {
                const { postId, userId } = action.payload;
                const post = state.posts.find((post) => post._id === postId);
                if (post && !post.likes.includes(userId)) {
                  post.likes.push(userId);
                }
                return state
            },
            removeLike:(state,action)=>
            {
                const {userId,postId} = action.payload;
                const post = state.posts.find((post) => post._id === postId);
                if(post && post.likes.includes(userId))
                {
                    post.likes=post.likes.filter((id) => id !== userId);
                }
                return state 
            },
            addComment:(state,action)=>
            {
                const { postId, userId ,comment,_id} = action.payload;
                console.log(postId,userId,comment,_id);
                const post = state.posts.find((post) => post._id === postId);
                console.log(post);
                post.comments.push({postId,userId,comment,_id})
            },
            removeComment:(state,action)=>
            {
                const {commentId,postId} = action.payload;
                const post = state.posts.find((post) => post._id === postId);
                post.comments = post.comments.filter(c=>c._id !== commentId);
            },
            addOnePost:(state,action)=>
            {
                const {data} = action.payload;
                state.posts.push(data);
            },
            removeOnePost:(state,action)=>
            {
                const {postId} = action.payload;
                state.posts = state.posts.filter(post=>post._id !== postId);
            },
            clearAllPosts:(state)=>
            {
                state.posts=[];
            }
        }
    }
);

export const {addPosts,likePost,removeLike,addComment,removeComment,addOnePost,removeOnePost,clearAllPosts} = postSlice.actions;

export default postSlice.reducer;