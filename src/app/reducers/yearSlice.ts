import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface YearState {
    value: number;
}


const initialYearState: YearState = {
    value: 0,
};
  
  const yearSlice = createSlice({
    name: 'year',
    initialState: initialYearState,
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
  
  export const { add, sub } = yearSlice.actions;
  export default yearSlice.reducer;