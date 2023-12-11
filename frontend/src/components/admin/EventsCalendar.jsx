import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function EventsCalendar() {
    const [date, changeDate] = useState(new Date());

    let changeValue = (val) => {
        changeDate(val)
    }
    return (
        <div>EventsCalendar
            <Calendar
            onChange = {changeValue}
            value = {date}
            minDate = {new Date(2022, 8, 21)} // To set minimum date
            maxDate = {new Date(2025, 12, 22)} // To set maximum date
            showWeekNumbers = {true} // TO show week numbers
            showNeighboringMonth = {true} 
            calendarType = "US" // Changing the calender type
            tileDisabled = {({ date }) => date.getDay() === 0} // Disabaling the sunday
         />
        </div>
    )
}

export default EventsCalendar