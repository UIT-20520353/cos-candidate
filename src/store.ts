import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/login/user.reducer";
import contestsReducer from "./pages/contests/contests.reducer";

export const store = configureStore({
  reducer: { user: userReducer, contests: contestsReducer }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
