import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*  
    ####
    year: {
        total: number,
    }
*/
interface YearState {
    [year: string]: {
      total: number
    }
}


const initialYearState: YearState = {};
  
  const yearSlice = createSlice({
    name: 'year',
    initialState: initialYearState,
    reducers: {
      updateYear: (state, action: PayloadAction<{year: string; oldMonthTotal: number; newMonthTotal: number}>) => {
        const{year, oldMonthTotal, newMonthTotal} = action.payload;
        //if the state dosen't exits add it
        if (!state[year]) {
          state[year] = {
              total: newMonthTotal
          };
        } else {
          //update otherwise, sub old total then add new total
          state[year].total -= oldMonthTotal;
          state[year].total += newMonthTotal;
        }
      },
    },
  });
  
  export const { updateYear } = yearSlice.actions;
  export default yearSlice.reducer;