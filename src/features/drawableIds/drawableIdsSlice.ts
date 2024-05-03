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
    addNewIfAny: (state, action: PayloadAction<number[]>) => {
      const stateLatest = state.list[0];
      const stateLatestNewPos = action.payload.indexOf(stateLatest);
      if (stateLatestNewPos > 0) {
        state.list = [
          ...action.payload.slice(0, stateLatestNewPos),
          ...state.list,
        ];
      }
    },
  },
});

export const { change, inc, addNewIfAny } = drawableIdsSlice.actions;

export default drawableIdsSlice.reducer;
