import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/post/postSlice";
import tabsSlice from "./features/tab/tabsSlice";
import usersSlice from "./features/user/usersSlice";

export default configureStore({
  reducer: {
    tabs: tabsSlice,
    posts: postsSlice,
    users: usersSlice,
  },
});
