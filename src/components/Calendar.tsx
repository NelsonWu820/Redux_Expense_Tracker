import React from 'react'
import { useAppDispatch } from '../app/hooks';
import { DatePicker } from '@mui/x-date-pickers';
import { setDate } from '../app/reducers/date';
import dayjs from 'dayjs';

const Calendar = () => {
  const dispatch = useAppDispatch();

  //date is assinged the dayjs object 
  const newDate = (date: dayjs.Dayjs | null) => {
    if (date) {
      dispatch(setDate(date.format('DD-MM-YYYY'))); // Convert Dayjs object to string
    }
  }

  return (
    <div>
      <DatePicker onChange={newDate}/>
    </div>
  )
}

export default Calendar
