import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';

const createData = (
  name: string,
  food: number,
  rentMortgage: number,
  transport: number,
  medical: number,
  misc: number,
) => {
  return { name, food, rentMortgage, transport, medical, misc};
}

//turns MM-YYYY string into the actual month
const toMonth = (fullData: string) => {
  //split str into month year
  const [month, year] = fullData.split('-');

  //create a Date object using the month and year sub 1 from month since it's 0-indexed
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);

  //format the date to return the month name
  const monthName = date.toLocaleString('en-us', { month: 'long' });
  
  return monthName;
}

//ordered list of months to order the months later
const monthOrder = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

let total = 0
const Total = () => {
  const [foodTotal, setFoodTotal] = useState(0);
  const [rentMortgageTotal, setRentMortgageTotal] = useState(0);
  const [transportTotal, setTransportTotal] = useState(0);
  const [medicalTotal, setMedicalTotal] = useState(0);
  const [miscTotal, setMiscTotal] = useState(0);

  
  const date = useSelector((state: RootState) => state.date)
  const currYear = date.value.substring(6)
  const month = useSelector((state: RootState) => state.monthSlice)
  
  const rows = Object.keys(month).map((key) => {
    //get year and checks if year matchs
    if(key.substring(3) === currYear){
      const { food, rentMortgage, transport, medical, misc } = month[key]
      //creates a row in the table
      return createData(toMonth(key), food, rentMortgage, transport, medical, misc)
      
    }
    //if not part of current year
    return null;
    //gets rid of any null rows so they don't add space to table when it's not their year
  }).filter(row => row !== null);
  
  
  //orders month based on monthOrder arr which is the months in correct order
  rows.sort((a, b) => {
    return monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name);
  });
  
  useEffect(() => {
    //creates an object totals which is the holder & calculated taking the total
    //of all categoray rows 
    const totals = rows.reduce((holder, row) => {
      holder.food += row.food;
      holder.rentMortgage += row.rentMortgage;
      holder.transport += row.transport;
      holder.medical += row.medical;
      holder.misc += row.misc;
      return holder;
    }, { food: 0, rentMortgage: 0, transport: 0, medical: 0, misc: 0 });

    setFoodTotal(totals.food);
    setRentMortgageTotal(totals.rentMortgage);
    setTransportTotal(totals.transport);
    setMedicalTotal(totals.medical);
    setMiscTotal(totals.misc);
  }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{currYear || "Year"}</TableCell>
            <TableCell align="right">Food</TableCell>
            <TableCell align="right">Rent/Mortgage</TableCell>
            <TableCell align="right">Transport</TableCell>
            <TableCell align="right">Medical</TableCell>
            <TableCell align="right">Misc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">${row.food}</TableCell>
              <TableCell align="right">${row.rentMortgage}</TableCell>
              <TableCell align="right">${row.transport}</TableCell>
              <TableCell align="right">${row.medical}</TableCell>
              <TableCell align="right">${row.misc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
              <TableCell component="th" scope="row">
                Total:
              </TableCell>
              <TableCell align="right">${foodTotal}</TableCell>
              <TableCell align="right">${rentMortgageTotal}</TableCell>
              <TableCell align="right">${transportTotal}</TableCell>
              <TableCell align="right">${medicalTotal}</TableCell>
              <TableCell align="right">${miscTotal}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default Total
