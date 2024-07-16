import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface DayState {
    value: number;
}


const initialDayState: DayState = {
    value: 0,
};
  
  const daySlice = createSlice({
    name: 'day',
    initialState: initialDayState,
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
  
  export const { add, sub } = daySlice.actions;
  export default daySlice.reducer;