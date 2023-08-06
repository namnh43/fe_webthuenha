import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React, {useState} from "react";
import Swal from "sweetalert2";
import {formatDate} from "../../utils/api";

export default function TestDatePicker({startDate, endDate,listBooking, setStartDate, setEndDate, calculateDiff}) {

    let start = localStorage.getItem("startDate");
    let end = localStorage.getItem("endDate");

    const [selectedDate, setSelectedDate] = useState((start !== null && end !== null) ? [start, end] : []);

    const handleDateChange = (event, inst) => {
        console.log(inst.value);
        let start= inst.value[0];
        let end = inst.value[1];

        if(start === end) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please select different date',
            })
            inst.setVal([]);
            return
        }
        setStartDate(start);
        setEndDate(end);
        setSelectedDate(inst.value);
        localStorage.setItem("startDate",formatDate(start));
        localStorage.setItem("endDate",formatDate(end));

        calculateDiff(start, end);
    };

    return (
        <>
            <div className="d-inline-block mb-2" style={{border: '1px solid grey', borderRadius: '5px', width: 'fit-content', padding: '5px 4px 3px 4px'}}>
                <Datepicker
                    value={selectedDate}
                    controls={['calendar']}
                    select="range"
                    theme="ios"
                    themeVariant="light"
                    returnFormat="iso8601"
                    dateFormat="DD/MM/YYYY"
                    inputComponent="input"
                    inputProps={ {placeholder: 'Choose booking date'} }
                    min={window.Date.now()}
                    invalid={listBooking}
                    onChange={handleDateChange}
                />
                <CalendarMonthIcon sx={{color: 'grey', marginBottom: '5px', marginLeft: '4px'}}/>
            </div>

        </>
    )
}
