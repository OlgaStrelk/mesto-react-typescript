import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState
//   dispatch: AppDispatch
// }>()