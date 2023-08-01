import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from "react";
import Swal from "sweetalert2";

export default function TestDatePicker({listBooking, setStartDate, setEndDate, calculateDiff}) {

    const handleDateChange = (event, inst) => {
        console.log(inst.value);
        let startDate = inst.value[0];
        let endDate = inst.value[1];

        if(startDate === endDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select different date',
            })
            inst.setVal([]);
            return
        }
        setStartDate(startDate);
        setEndDate(endDate);
        calculateDiff(startDate, endDate);
    };

    return (
        <>
            <p>Select Date Range</p>
            <Datepicker
                controls={['calendar']}
                select="range"
                theme="ios"
                themeVariant="light"
                returnFormat="iso8601"
                dateFormat="DD/MM/YYYY"
                inputComponent="input"
                inputProps={ {placeholder: 'Choose here ...'} }
                min={window.Date.now()}
                invalid={listBooking}
                onChange={handleDateChange}
            />
            <CalendarMonthIcon sx={{color: 'grey', marginBottom: '3px'}}/>

        </>
    )
}
