import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemProps } from "../../typings";

type ItemsList = Record<string, ItemProps>;

export interface ItemsListState {
  list: ItemsList;
}

const initialState: ItemsListState = {
  list: {},
};

export const itemsListSlice = createSlice({
  name: "itemsList",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ItemProps>) => {
      state.list = { ...state.list, [action.payload.id]: action.payload };
    },
  },
});

export const { add } = itemsListSlice.actions;

export default itemsListSlice.reducer;
