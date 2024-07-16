import { configureStore } from "@reduxjs/toolkit";
import yearSlice from "./reducers/yearSlice";

const store = configureStore({
  reducer: yearSlice
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;