import React, { useState } from 'react';
import {DateRangePicker} from 'rsuite';
import {endOfDay, startOfDay} from "date-fns";

const DateRangePickerComponent = ({ onChange }) => {
    const [selectedRange, setSelectedRange] = useState([]);

    const handleSelect = (ranges) => {
        if (ranges && ranges.length > 0) {
            setSelectedRange([startOfDay(ranges[0]),endOfDay(ranges[1])]);
            onChange([startOfDay(ranges[0]),endOfDay(ranges[1])]); // Call the callback with the selected range
        } else {
            setSelectedRange(null);
            onChange(null); // Call the callback with the selected range
        }
    };

    return (
        <div>
            <DateRangePicker
                placeholder="Select Date Range"
                editable={false}
                ranges={selectedRange}
                format='yyyy-MM-dd'
                onChange={handleSelect}
            />
        </div>
    );
};

export default DateRangePickerComponent;
