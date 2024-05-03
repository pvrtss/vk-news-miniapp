import { configureStore } from "@reduxjs/toolkit";
import newsListReducer from "./features/itemsList/ItemsListSlice";
import drawableIdsReducer from "./features/drawableIds/drawableIdsSlice";

export const store = configureStore({
  reducer: {
    newsList: newsListReducer,
    drawableIds: drawableIdsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
