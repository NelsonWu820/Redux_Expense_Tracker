import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { TextField, Button } from '@mui/material'
import { useAppDispatch } from '../app/hooks';
import { updateDay } from '../app/reducers/daySlice';
import { updateMonth } from '../app/reducers/monthSlice';

const PriceInput = () => {

    //imports date from global state date
    const date = useSelector((state: RootState) => state.date);
    const day = useSelector((state: RootState) => state.daySlice);
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
        let newTotal = 0;
        //gets current days past expenses 
        const oldDay = day[currDate];

        //will give an error on first render as oldDay will be set to undefined so just skip it
        if(oldDay !== undefined){
            //gets old day total val by looping through all the values in the oldDay object 
            Object.values(oldDay).forEach(val => {
                oldTotal += val
            });
        }

        //calculates new total with the local state, since will add it to day anyways
        const newDay = food + rentMortgage + transport + medical + misc

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
            month: currDate,
            oldTotal: oldTotal,
            newTotal: newTotal,
        }
        console.log(oldTotal, newTotal)
        //should subtracte the days amount from month
        dispatch(updateMonth(monthAction))
        //adds the days


        //updates year slice


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
