import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { TextField, Button } from '@mui/material'
import { useAppDispatch } from '../app/hooks';
import { updateDay } from '../app/reducers/daySlice';
import { updateMonth } from '../app/reducers/monthSlice';
import { updateYear } from '../app/reducers/yearSlice';

const PriceInput = () => {

    //imports date from global state date
    const date = useSelector((state: RootState) => state.date);
    const day = useSelector((state: RootState) => state.daySlice);
    const month = useSelector((state: RootState) => state.monthSlice);
    const dispatch = useAppDispatch();

    //holder states for each field
    const [food, setFood] = useState(0);
    const [rentMortgage, setRentMortgage] = useState(0);
    const [transport, setTransport] = useState(0);
    const [medical, setMedical] = useState(0);
    const [misc, setMisc] = useState(0);


    //the function to update all global states
    const submitNewValues = () => {
        const currDate = date.value;
        //when first loading in it can add a empty str otherwise
        if(currDate === ''){
            return 0;
        }

        //old days & new total expense 
        let oldTotal = 0;
        //calculates new total with the local state, since will add it to day anyways            
        let newTotal = food + rentMortgage + transport + medical + misc;
        //gets current days past expenses 
        const oldDay = day[currDate];

        //gets just month and year cuase DD/MM/YYYY will get after DD/
        const currMonth = currDate.substring(3)
        //gets oldMonths expenses from month global state
        const oldMonthHolder = month[currMonth];
        const oldMonthTotal = oldMonthHolder.total;
        console.log(oldMonthTotal)

        //will give an error on first render as oldDay will be set to undefined so just skip it
        if(oldDay !== undefined){
            //gets old day total val by looping through all the values in the oldDay object 
            Object.values(oldDay).forEach(val => {
                oldTotal += val
            });
        }

        const action = {
            date: currDate,
            food: food,
            rentMortgage: rentMortgage,
            transport: transport,
            medical: medical,
            misc: misc,
        }
        //updates day slice, no need for sub because it replaces that day in global state
        dispatch(updateDay(action))

        //updates month slice
        //subtracts old amount the day addded then adds new amount
        const monthAction = {
            //get MM/YYYY
            month: currDate.substring(3),
            oldTotal: oldTotal,
            newTotal: newTotal,
        }

        //updates mothly expense
        dispatch(updateMonth(monthAction))

        //gets new month after the update
        const newMonthTotal = month[currMonth]
        //updates year slice
        const yearAction = {
            //gets YYYY
            year: currDate.substring(6),
            oldMonthTotal: oldMonthTotal,
            newMonthTotal: newMonthTotal,
        }

        dispatch(updateYear(yearAction))


    }

    return (
        <div>
            Food:
            <TextField id="outlined-basic Food" label="Food" variant="outlined"
            onChange={(e) => setFood(parseFloat(e.target.value))}/>

            Rent/Mortgage:
            <TextField id="outlined-basic rentMortgage" label="rentMortgage" variant="outlined"
            onChange={(e) => setRentMortgage(parseFloat(e.target.value))}/>

            <Button variant="contained" onClick={submitNewValues}>Submit All</Button>
        </div>
    )
}

export default PriceInput
