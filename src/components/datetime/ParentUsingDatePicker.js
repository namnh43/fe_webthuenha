import {useEffect, useState} from "react";
import DateRangePickerComponent from "./DateRangePickerComponent";

export function ParentUsingDatePicker() {
    const [selectedRange, setSelectedRange] = useState([]);

    const handleDateRangeChange = (ranges) => {
        if (ranges && ranges.length == 2)
            setSelectedRange([ranges[0].getTime(),ranges[1].getTime()]);
    };
    useEffect(() => {
        selectedRange.map((item) => {
            console.log(item) //for testting
        })
    },[selectedRange])

    return (
        <div>
            <h1>Date Range Picker Example</h1>
            <DateRangePickerComponent
                onChange={handleDateRangeChange} />
        </div>
    );
}