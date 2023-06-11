import * as React from 'react';
import { useState, useEffect } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function SmallCardWithChooseDateComponent(props) {
  const [interest, setInterest] = useState(0);

  function handleDatePickerChange(date) {
    setInterest(props.onChangeDatePicker(date));
  }

  //TODO - 0 WHEN COMPONENT IS MOUNTED
  useEffect(() => {
    handleDatePickerChange(dayjs('2022-01-01'));
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label={props.text}>
            <DatePicker onChange={(date) => handleDatePickerChange(date)} defaultValue={dayjs('2022-01-01')} />
          </DemoItem>
        </LocalizationProvider>

        <Typography variant="h5" component="div">
          {props.amount} 
          {interest} zł
        </Typography>

      </CardContent>
    </Card>
  );
}