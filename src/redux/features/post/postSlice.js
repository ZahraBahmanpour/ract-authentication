import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPostRequest,
  fetchAllPostsRequest,
  updatePostRequest,
} from "../../../api/posts";

const initialState = {
  posts: [],
  loading: false,
  error: "",
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  fetchAllPostsRequest
);

export const updatePost = createAsyncThunk("posts/updatePost", (post) =>
  updatePostRequest(post)
);

export const createPost = createAsyncThunk("posts/createPost", (post) =>
  createPostRequest(post)
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    // fetch posts
    builder.addCase(fetchPosts.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return { ...state, loading: false, posts: action.payload };
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      return { posts: [], loading: false, error: action.payload };
    });
    // update post
    builder.addCase(updatePost.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      return { posts: [], loading: false, error: action.payload };
    });
    // create post
    builder.addCase(createPost.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(createPost.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    });
  },
});

export default postsSlice.reducer;
