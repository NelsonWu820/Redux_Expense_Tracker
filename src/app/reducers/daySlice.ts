import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*  
    ##/##/####
    day/month/year: {
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
        updateDay: (state, 
            action: PayloadAction<{ date: string; food: number; rentMortgage: number; 
            transport: number; medical: number; misc: number}>) => {
            const { date, food, rentMortgage, transport, medical, misc } = action.payload;
            //if the state dosen't exits add it
            if (!state[date]) {
                state[date] = {
                    food: food,
                    rentMortgage: rentMortgage,
                    transport: transport,
                    medical: medical,
                    misc: misc,
                };
            }
            
            //sets it back to 0 then adds new amount
            state[date].food = 0;
            state[date].food += food;
            

            state[date].rentMortgage = 0;
            state[date].rentMortgage += rentMortgage;
            

            state[date].transport = 0;
            state[date].transport += transport;
            

            state[date].medical = 0;
            state[date].medical += medical;
            

            state[date].misc = 0;
            state[date].misc += misc;   
        },
    },
  });
  
  export const { updateDay } = daySlice.actions;
  export default daySlice.reducer;