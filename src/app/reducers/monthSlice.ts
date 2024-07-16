import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*  
    ##/####
    only days that have totals
    month/year: {
        day1: totalNum,
        day5: totalNum, 
    }
*/
interface MonthState {
    value: number;
}


const initialMonthState: MonthState = {
    value: 0,
};
  
  const monthSlice = createSlice({
    name: 'month',
    initialState: initialMonthState,
    reducers: {
      add: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      },
      //sub from total year by the amount changed 
      sub: (state, action: PayloadAction<number>) => {
        state.value -= action.payload;
      }
    },
  });
  
  export const { add, sub } = monthSlice.actions;
  export default monthSlice.reducer;