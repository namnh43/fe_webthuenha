import React, {useEffect, useState} from 'react';
import {DateRangePicker} from 'rsuite';
import {endOfDay, startOfDay} from "date-fns";

const { beforeToday } = DateRangePicker;
function createDateFromString(dateString) {
    const dateParts = dateString.split("-");

    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    let dateObj = new Date(year, month, day);
    return dateObj;
}
const DateRangePickerComponent = ({ onChange,inputRange }) => {
    const [selectedRange, setSelectedRange] = useState([new Date(), new Date()]);


    const handleSelect = (ranges) => {
        if (ranges && ranges.length > 0) {
            console.log('selected range', ranges)
            setSelectedRange([startOfDay(ranges[0]),endOfDay(ranges[1])]);
            onChange([startOfDay(ranges[0]),endOfDay(ranges[1])]); // Call the callback with the selected range
        } else {
            setSelectedRange(null);
            onChange(null); // Call the callback with the selected range
        }
    };
    useEffect(()=> {
        console.log('on did mount', inputRange)
    },[])
    useEffect(()=> {
        if (inputRange && inputRange.length > 0 && inputRange[0] != '') {
            const startDate = createDateFromString(inputRange[0]);
            const endDate = createDateFromString(inputRange[1]);
            console.log('range selected',[startDate,endDate])
            setSelectedRange([startDate,endDate])
        } else {
            setSelectedRange(null)
        }

    },[inputRange])

    return (
        <div>
            <DateRangePicker
                placeholder="Select Date Range"
                value={selectedRange}
                size='lg'
                editable={false}
                format='yyyy-MM-dd'
                onChange={handleSelect}
                disabledDate={beforeToday()}
            />
        </div>
    );
};
export default DateRangePickerComponent;
