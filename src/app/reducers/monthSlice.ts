import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*  
    ##/####
    only days that have totals
    month/year: {
        total: totalNum
    }
*/
interface MonthState {
  [month: string]: {
    total: number,
  }
}


const initialMonthState: MonthState = {};
  
  const monthSlice = createSlice({
    name: 'month',
    initialState: initialMonthState,
    reducers: {
      updateMonth: (state, action: PayloadAction<{month: string, oldTotal: number, newTotal: number}>) => {
        const { month, oldTotal, newTotal} = action.payload;
        //if the state dosen't exits add it
        if (!state[month]) {
            state[month] = {
                total: newTotal
            };
        } else {
          //update otherwise, sub old total then add new total
          state[month].total -= oldTotal;
          state[month].total += newTotal;
        }

      },
    },
  });
  
  export const { updateMonth } = monthSlice.actions;
  export default monthSlice.reducer;