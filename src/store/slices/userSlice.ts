import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/consts";
import { AppDispatch, RootState, store } from "..";
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
export const getProfile: AsyncThunk<IUserExtended, void, { state: RootState }> =
  createAsyncThunk("/user/fetch", async () => {
    const response = await fetch(
      "https://mesto.nomoreparties.co/v1/cohort-39/users/me",
      {
        method: "GET",
        headers: {
          Authorization: `78099c83-b4f6-4327-beb7-a0fa8f52d200`,
        },
      }
    );
    console.log(response)
    return (await response.json()) as IUserExtended;
  });

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
        if (action.error.message) state.error = action.error.message;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user._id;
// export const lastReturnedAction = await store.dispatch(getProfile())
