import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

const PriceInput = () => {
    //holder states for each field
    const [food, setFood] = useState(0);


    //the function to update all global states
    const submitNewValues = () => {
        
    }

    return (
        <div>
            Food:
            <TextField id="outlined-basic" label="Food" variant="outlined" value={food} 
            onChange={(e) => setFood(parseFloat(e.target.value))}/>
            <Button variant="contained">Contained</Button>
        </div>
    )
}

export default PriceInput
