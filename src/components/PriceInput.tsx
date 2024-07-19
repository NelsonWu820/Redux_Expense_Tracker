import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { TextField, Button, InputAdornment } from '@mui/material'
import { useAppDispatch } from '../app/hooks';
import  { updateDay } from '../app/reducers/daySlice';
import { updateMonth, updateMonthExpense } from '../app/reducers/monthSlice';
import { updateYear } from '../app/reducers/yearSlice';

const PriceInput = () => {

    //imports date from global state date
    const date = useSelector((state: RootState) => state.date);
    const day = useSelector((state: RootState) => state.daySlice);
    const month = useSelector((state: RootState) => state.monthSlice);
    const dispatch = useAppDispatch();

    //holder states for each field
    const [food, setFood] = useState(0.00);
    const [rentMortgage, setRentMortgage] = useState(0.00);
    const [transport, setTransport] = useState(0.00);
    const [medical, setMedical] = useState(0.00);
    const [misc, setMisc] = useState(0.00);

    interface Expense {
        food: number;
        rentMortgage: number;
        transport: number;
        medical: number;
        misc: number;
      }
      
    let oldDay: Expense = {
        food: 0.00,
        rentMortgage: 0.00,
        transport: 0.00,
        medical: 0.00,
        misc: 0.00,
    };

    //changes the val held inside the text field when about date is changed
    useEffect(() => {
        const currDate = date.value;
        //checks if it's not the inital '' when first loaded & if the date is inside the state
        if(currDate && day[currDate]){
            const dayExpense = day[currDate];
            setFood(dayExpense.food || 0.00)
            setRentMortgage(dayExpense.rentMortgage || 0.00)
            setTransport(dayExpense.transport || 0.00)
            setMedical(dayExpense.medical || 0.00)
            setMisc(dayExpense.misc || 0.00)
        } else {
            setFood(0.00)
            setRentMortgage(0.00)
            setTransport(0.00)
            setMedical(0.00)
            setMisc(0.00)
        }
    }, [date]);


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
        //also cuts off anything beyond 2 decimal points then turns it back into float because toFixed turns it into a string 
        let newTotal = parseFloat((food + rentMortgage + transport + medical + misc).toFixed(2));
        //turns a float that can have more then 2 decimal points, into just 2 decimal points
        //always rounds down basuce it just gets rid of everything past the 2nd decimal point
        //gets current days past expenses 
        oldDay = day[currDate];

        //gets just month and year cuase DD/MM/YYYY will get after DD/
        const currMonth = currDate.substring(3)

        const oldMonthHolder = month[currMonth];
        let oldMonthTotal = 0;
        //for inital start up when there is no previous month
        if(oldMonthHolder !== undefined){
            //gets oldMonths expenses from month global state
            oldMonthTotal = oldMonthHolder["total"];
        }

        //gets old specific day expenses
        let oldFood = 0.00;
        let oldRentMortgage = 0.00;
        let oldTransport = 0.00;
        let oldMedical = 0.00;
        let oldMisc = 0.00;

        //will give an error on first render as oldDay will be set to undefined so just skip it
        if(oldDay !== undefined){
            //gets old day total val by looping through all the values in the oldDay object 
            Object.keys(oldDay).forEach((key) => {
                const expenseKey = key as keyof Expense
                oldTotal += oldDay[expenseKey];
                //will only input the value of
                switch(key){
                    case "food":
                        oldFood = oldDay[expenseKey];
                        break;
                        case "rentMortgage":
                        oldRentMortgage = oldDay[expenseKey];
                        break;
                    case "transport":
                        oldTransport = oldDay[expenseKey];
                        break;
                    case "medical":
                        oldMedical = oldDay[expenseKey];
                        break;
                    case "misc":
                        oldMisc = oldDay[expenseKey];
                        break;
                    default:
                        break;
                }
            });
        }
        
        //get new month total by doing the same logic I put into the month action
        //just old month total - old day total + new day total, since trying to get the new updated
        //month state after updateMonth action will just get old month total instead because 
        //the reducer work async and won't be updated in time
        //also cut off abything beyond 2 decimal points and then turn back into number
        const newMonthTotal = parseFloat((oldMonthTotal - oldTotal + newTotal).toFixed(2));
        

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
        //updates the specific monthly expense totals

        const specificMonthAction = {
            month: currDate.substring(3),
            oldFood: oldFood,
            newFood: food,
            oldRentMortgage: oldRentMortgage,
            newRentMortgage: rentMortgage,
            oldTransport: oldTransport,
            newTransport: transport,
            oldMedical: oldMedical,
            newMedical: medical,
            oldMisc: oldMisc,
            newMisc: misc,
        }

        dispatch(updateMonthExpense(specificMonthAction))



        //
        //updates year slice
        const yearAction = {
            //gets YYYY
            year: currDate.substring(6),
            oldMonthTotal: oldMonthTotal,
            newMonthTotal: newMonthTotal,
        }

        dispatch(updateYear(yearAction))


    }

    //the rege for if there is only 2 decimal points
    const regex = /^\d+(\.\d{0,2})?$/;    
    const decimalChecker = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        //check if the value is empty or matches the regex
        if (value === '' || regex.test(value)) {
            //convert value to a float and turn into two decimal places
            const formattedValue = parseFloat(value);
            //checks if NaN which can happen if user backspaces on an empty input field
            //and if number is to big since it will cause overflows in my code and create a lot of bugs
            if (!isNaN(formattedValue) && formattedValue.toString().length <= 15) {
                setter(parseFloat(formattedValue.toFixed(2)));
            }
        }
    };

    return (
        <div>
            <div>
                Food:
                <TextField id="food" label="Food" variant="outlined"
                    margin="dense"
                    type='number'
                    value={food || ""}
                    //gives to decimalChecker with the setMethod for this input field
                    onChange={decimalChecker(setFood)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    inputProps={{ step: 0.01 }}
                />
            </div>

            <div>
                Rent/Mortgage:
                <TextField id="outlined-basic rentMortgage" label="rentMortgage" variant="outlined" 
                margin="dense"
                type='number'
                value={rentMortgage || ""}
                //gives to decimalChecker with the setMethod for this input field
                onChange={decimalChecker(setRentMortgage)}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        $
                      </InputAdornment>
                    ),
                  }}
                inputProps={{
                    step: 0.01,
                }}
                />
            </div>

            <div>
                Transport:
                <TextField id="outlined-basic rentMortgage" label="Transport" variant="outlined"
                margin="dense"
                type='number'
                inputProps={{
                    maxLength: 13,
                    step: "0.01"
                }}
                value={transport || ""}
                //gives to decimalChecker with the setMethod for this input field
                onChange={decimalChecker(setTransport)}
                InputProps={{
                    startAdornment:
                    <div>$</div>
                    }}
                />
            </div>

            <div>
                Medical:
                <TextField id="outlined-basic rentMortgage" label="Medical" variant="outlined"
                margin="dense"
                type='number'
                value={medical || ""}
                //gives to decimalChecker with the setMethod for this input field
                onChange={decimalChecker(setMedical)}
                InputProps={{
                    startAdornment:
                    <div>$</div>
                    }}
                />
            </div>

            <div>
                Misc:
                <TextField id="outlined-basic rentMortgage" label="Misc" variant="outlined"
                margin="dense"
                type='number'
                value={misc || ""}
                //gives to decimalChecker with the setMethod for this input field
                onChange={decimalChecker(setMisc)}
                InputProps={{
                    startAdornment:
                    <div>$</div>
                    }}
                />
            </div>

            <div>
                <Button variant="contained" onClick={submitNewValues}>Submit All</Button>
            </div>
        </div>
    )
}

export default PriceInput
