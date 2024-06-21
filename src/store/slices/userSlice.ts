import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AUTH_URL, HEADERS_WITH_AUTH } from "../../utils/consts";
import { RootState } from "..";
import { IUserExtended } from "../../utils/types";
export interface IUserState {
  user: IUserExtended;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: IUserState = {
  user: { name: "", about: "", avatar: "", _id: "", cohort: "" },
  status: "idle",
  error: "",
};

export const getProfile = createAsyncThunk("/users/me", async () => {
  const response = await fetch(`${AUTH_URL}/users/me`, {
    headers: HEADERS_WITH_AUTH,
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
  return response;
});
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser() {},
    updateUser() {},
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user._id;
