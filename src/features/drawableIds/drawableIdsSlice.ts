import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DrawableIdsState {
  list: number[];
}

const initialState: DrawableIdsState = {
  list: [],
};

export const drawableIdsSlice = createSlice({
  name: "drawableIds",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<number[]>) => {
      state.list = action.payload;
    },
    inc: (state, action: PayloadAction<number[]>) => {
      state.list = [
        ...state.list,
        ...action.payload.slice(state.list.length, state.list.length + 10),
      ];
    },
  },
});

export const { change, inc } = drawableIdsSlice.actions;

export default drawableIdsSlice.reducer;
