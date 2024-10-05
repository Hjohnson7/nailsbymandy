import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { getCalendarEvents } from "./requests"
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

// loadedDates = {
//     2024: [1,2,3]
// }

const BookingsCalendar = (props) => {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true); // State for tracking loading status
    const [loadedDates, setLoadingDates] = useState({})

    useEffect(() => {
        const currentMonth= moment().month() + 1;
        const currentYear = moment().year();
        let firstDates = {}
        firstDates[currentYear] = [currentMonth]
        setLoadingDates(firstDates)
        const loadInitialEvents = async () => {
            let initialEvents = await getCalendarEvents(currentMonth, currentYear);
            setBookings(initialEvents);
        };
        loadInitialEvents();
    }, []);

    const handleEventClick = (event) => {
        // NEED TO ADD THIS HERE SO THAT CAN EDIT THE EVENT 
        alert(`You clicked on: ${event.id}`);
    };

    // Simulated API call to fetch events for the given date range
    const fetchEventsForRange = async (month, year) => {// Show spinner
        let newEvents = await getCalendarEvents(month, year);
        return newEvents;
    };

    const checkYearAndMonth = (month, year) => {
        console.log(loadedDates)
        // Check if the year exists in the object
        if (loadedDates.hasOwnProperty(year)) {
          // Check if the month exists in the array for that year
          if (loadedDates[year].includes(month)) {
            return true
          } else {
              let months = loadedDates[year]
              months.push(month)
              let dates = loadedDates
              dates[year] = months
              setLoadingDates(dates)
                return false;
          }
        } else {
          let dates = loadedDates;
          dates[year] = [month]
          setLoadingDates(dates)
          return false
        }
      }

    // Handle range changes when navigating calendar (e.g., next/prev buttons)
    const handleRangeChange = async (view) => {
        let first_date, end_date;
        setLoading(true); 
        if (Array.isArray(view)) {
            if(view.length == 1){
                // get month year 
                first_date = view[0]
            }else{
                first_date = view[0]
                end_date = view[6]
            }
        } else {
            first_date = view.start;
            end_date = view.end;
        }
        let firstMonth = first_date.getMonth() + 1
        let firstYear = first_date.getYear() + 1900
        let firstDateExists = checkYearAndMonth(firstMonth, firstYear)
        let endMonth = end_date.getMonth() /// THIS NEEDS REVIEWING.
        let endYear = end_date.getYear() + 1900
        let endDateExists = checkYearAndMonth(endMonth, endYear)
        let eventsToAdd = []
        if (!firstDateExists){
            let newEvents = await fetchEventsForRange(firstMonth, firstYear);
            eventsToAdd.push(...newEvents)
        }
        if (!endDateExists){
            let newEvents = await fetchEventsForRange(endMonth, endYear);
            eventsToAdd.push(...newEvents)
        }
        if (eventsToAdd.length > 0){
            let events = bookings
            events.push(...eventsToAdd)
            console.log(events)
            setBookings(events);
        }
        setLoading(false); // Hide spinner
    };

    return (
        <div className="myCustomHeight">
            <Calendar
            localizer={localizer}
            events={bookings}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
            onSelectEvent={handleEventClick} 
            onRangeChange={handleRangeChange} 
            defaultView="month"
            />
        </div>
    )
}

export default BookingsCalendar