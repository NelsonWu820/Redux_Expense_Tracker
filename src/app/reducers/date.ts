import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//holds just the date
interface DateState {
    value: string;
}

const initialDateState: DateState = {
    value: '',
};
  
const dateSlice = createSlice({
    name: 'date',
    initialState: initialDateState,
    reducers: {
        setDate: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    }
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;