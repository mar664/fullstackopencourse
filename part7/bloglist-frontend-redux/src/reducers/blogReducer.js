import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    updateBlog: (state, action) => {
      return state.map((s) =>
        s.id === action.payload.id ? action.payload : s
      );
    },
    createBlog: (state, action) => {
      state.push(action.payload);
    },
    deleteBlog: (state, action) => {
      return state.filter((s) => s.id !== action.payload);
    },
  },
});

export const { setBlogs, updateBlog, createBlog, deleteBlog } =
  blogSlice.actions;

/* export const addNewBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create({
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl,
    });
    dispatch(createBlog(newBlog))
  }
}
 */
export default blogSlice.reducer;
