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
        let newTotal = food + rentMortgage + transport + medical + misc
        //turns a float that can have more then 2 decimal points, into just 2 decimal points
        //always rounds down basuce it just gets rid of everything past the 2nd decimal point
        newTotal = parseFloat(newTotal.toFixed(2));
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
        const newMonthTotal = oldMonthTotal - oldTotal + newTotal
        

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

    const handleChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
            if (regex.test(value) || value === '') {
              // Convert value to a float and update state
              setMedical(parseFloat(value) || 0.00);
            }

        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            console.log(value.toFixed(2))
            
        }
    };

    return (
        <div>
            <div>
                Food:
                <TextField id="food" label="Food" variant="outlined"
                    margin="dense"
                    type='number'
                    value={food}
                    onChange={handleChange(setFood)}
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
                
                //check if over 2 digits && if the last value is not 0 for when $#.#0 because then it will get locked
                //into the toFixed #.## getting really hard to edit
                value={rentMortgage}
                //turns str input into number then str again cause of .toFloat needs number then back into num for set
                onChange={(e) => setRentMortgage(parseFloat((e.target.value)))}
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
                //check if over 2 digits && if the last value is not 0 for when $#.#0 because then it will get locked
                //into the toFixed #.## getting really hard to edit
                value={transport
                }
                //turns str input into number then str again cause of .toFloat needs number then back into num for set
                onChange={(e) => {
                    setTransport(parseFloat(e.target.value))
                }}
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
                //check if over 2 digits && if the last value is not 0 for when $#.#0 because then it will get locked
                //into the toFixed #.## getting really hard to edit
                value={0 !== (medical * 100) % 10 && medical.toFixed(2)[medical.toFixed(2).length - 1] === "0"? medical.toFixed(2)
                    : medical > 0 ? medical
                    : ""}
                //turns str input into number then str again cause of .toFloat needs number then back into num for set
                onChange={(e) => setMedical(parseFloat(parseFloat((e.target.value)).toFixed(2)) || 0.00)}
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
                //check if over 2 digits && if the last value is not 0 for when $#.#0 because then it will get locked
                //into the toFixed #.## getting really hard to edit
                value={0 !== (misc * 100) % 10 && misc.toFixed(2)[misc.toFixed(2).length - 1] === "0"? misc.toFixed(2)
                    : misc > 0 ? misc
                    : ""}
                //turns str input into number then str again cause of .toFloat needs number then back into num for set
                onChange={(e) => setMisc(parseFloat(parseFloat((e.target.value)).toFixed(2)) || 0.00)}
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
