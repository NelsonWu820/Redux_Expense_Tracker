import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*  
    ##/##/####
    month/day/year: {
        food: num,
        rent/mortgage: num,
        transport: num,
        medical: num,
        misc: num,
    }
*/
interface DayState {
    [date: string]: {
      food: number;
      rentMortgage: number;
      transport: number;
      medical: number;
      misc: number;
    };
}

//will add objects whem user inputs 
const initialState: DayState = {};
  
  const daySlice = createSlice({
    name: 'day',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<{ date: string; category: string; amount: number }>) => {
        const { date, category, amount } = action.payload;
            //if the state dosen't exits add it
            if (!state[date]) {
                state[date] = {
                    food: 0,
                    rentMortgage: 0,
                    transport: 0,
                    medical: 0,
                    misc: 0,
                };
            }
            
            //
            switch (category) {
            case 'food':
                //needs to be set back to 0 so it dosen't add ontop of old val
                state[date].food = 0;
                state[date].food += amount;
                break;
            case 'rentMortgage':
                state[date].rentMortgage = 0;
                state[date].rentMortgage += amount;
                break;
            case 'transport':
                state[date].transport = 0;
                state[date].transport += amount;
                break;
            case 'medical':
                state[date].medical = 0;
                state[date].medical += amount;
                break;
            case 'misc':
                state[date].misc = 0;
                state[date].misc += amount;
                break;
            default:
                break;
            }
        },
      //sub from total year by the amount changed 
      /*sub: (state, action) => {
        state.value -= action.payload;
      }*/
    },
  });
  
  export const { add } = daySlice.actions;
  export default daySlice.reducer;