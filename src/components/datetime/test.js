import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import React from "react";
import Swal from "sweetalert2";
import "./datePickerCss.css";

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
            <div className="d-inline-block mb-2" style={{border: '1px solid grey', borderRadius: '5px', width: 'fit-content', padding: '5px 4px 1px 4px'}}>
                <Datepicker
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
