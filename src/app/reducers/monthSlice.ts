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
    total: number;
    food: number;
    rentMortgage: number;
    transport: number;
    medical: number;
    misc: number;
  }
}


const initialMonthState: MonthState = {};
  
  const monthSlice = createSlice({
    name: 'month',
    initialState: initialMonthState,
    reducers: {
      updateMonth: (state, action: PayloadAction<{month: string, oldTotal: number, newTotal: number }>) => {
        const { month, oldTotal, newTotal} = action.payload;
        //if the state dosen't exits add it
        if (!state[month]) {
            state[month] = {
                total: newTotal,
                food: 0,
                rentMortgage: 0,
                transport: 0,
                medical: 0,
                misc: 0,
            };
        } else {
          //update otherwise, sub old total then add new total
          state[month].total -= oldTotal;
          state[month].total += newTotal;
        }

      },

      updateMonthExpense: (state, action: PayloadAction<{month: string, oldFood: number, newFood: number, 
        oldRentMortgage: number, newRentMortgage: number, 
        oldTransport: number, newTransport: number, 
        oldMedical: number, newMedical: number, 
        oldMisc: number, newMisc: number, 
      }>) => {
        const {month, oldFood, newFood, oldRentMortgage, newRentMortgage, oldTransport, newTransport, oldMedical, 
        newMedical, oldMisc, newMisc, } = action.payload
        //dosen't need to check if a state already exits as it goes right after updateMonth which already does that
        //sub old values
        state[month].food -= oldFood;
        state[month].rentMortgage -= oldRentMortgage;
        state[month].transport -= oldTransport;
        state[month].medical -= oldMedical;
        state[month].misc -= oldMisc;

        //add new values
        state[month].food += newFood;
        state[month].rentMortgage += newRentMortgage;
        state[month].transport += newTransport;
        state[month].medical += newMedical;
        state[month].misc += newMisc;
      }
    },
  });
  
  export const { updateMonth, updateMonthExpense } = monthSlice.actions;
  export default monthSlice.reducer;