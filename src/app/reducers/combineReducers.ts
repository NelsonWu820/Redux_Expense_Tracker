import { combineReducers } from "@reduxjs/toolkit";
import yearSlice from "./yearSlice";
import monthSlice from "./monthSlice";
import daySlice from "./daySlice";

const rootReducer = combineReducers({
    yearSlice,
    monthSlice,
    daySlice
})

export default rootReducer;