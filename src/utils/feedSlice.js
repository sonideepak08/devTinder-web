import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    feedUser: (state, action) => action.payload,
    removefeed: (state, action) => null,
  },
});

export const { feedUser } = feedSlice.actions;

export default feedSlice.reducer;
