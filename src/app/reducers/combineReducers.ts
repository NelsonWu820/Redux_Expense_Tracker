import { combineReducers } from "@reduxjs/toolkit";
import yearSlice from "./yearSlice";
import monthSlice from "./monthSlice";
import daySlice from "./daySlice";
import date from "./date";

const rootReducer = combineReducers({
    yearSlice,
    monthSlice,
    daySlice,
    date
})

export default rootReducer;