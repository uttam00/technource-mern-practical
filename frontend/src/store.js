import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../src/features/auth/authSlice";
import postReducer from "../src/features/posts/postSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});