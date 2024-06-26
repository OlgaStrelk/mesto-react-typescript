import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, HEADERS_WITH_AUTH } from "../../utils/consts";
import { RootState } from "..";
import { IUserExtended, IUserResponse } from "../../utils/types";
export interface IUserState {
  user: IUserExtended | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthChecked: boolean;
}
const initialState: IUserState = {
  user: null,
  status: "idle",
  error: "",
  isAuthChecked: false,
};
export const getProfile: AsyncThunk<IUserResponse, void, { state: RootState }> =
  createAsyncThunk("/user/fetch", async () => {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: HEADERS_WITH_AUTH,
    });
    return (await response.json()) as IUserResponse;
  });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUserAuth: (state) => {
      state.isAuthChecked = true;
    },
    signOut: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...action.payload, email: "" };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const { checkUserAuth, signOut } = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user?._id;
// export const lastReturnedAction = await store.dispatch(getProfile())
