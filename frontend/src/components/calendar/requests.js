import axios from 'axios'
import {get_config, ROUTE } from "../utils/requests-config/requests-config"

const getHourMinutes = (time) => {
    const decimalPart = time % 1;
    let minutes = decimalPart == 0.5 ? 30 : 0;
    let hour = decimalPart == 0.5 ? time - 0.5: time;
    return [hour, minutes]
}

const updateStartField = (time, date, time_length) => {
    let date_parts = date.split("-");
    let [start_hour, start_minutes] = getHourMinutes(parseFloat(time))
    return new Date(parseInt(date_parts[0]), parseInt(date_parts[1]) - 1, parseInt(date_parts[2]), start_hour, start_minutes, 0)
}

const updateEndField = (time, date, time_length) => {
    let date_parts = date.split("-");
    let [end_hour, end_minutes] = getHourMinutes(parseFloat(time) + parseFloat(time_length))
    return new Date(parseInt(date_parts[0]), parseInt(date_parts[1]) - 1, parseInt(date_parts[2]), end_hour, end_minutes, 0)
}

export const getCalendarEvents = async(month, year) => {
    const endpoint = 'bookings/calendar-bookings'
    const data = JSON.stringify({month: month, year:year})
    try {
        const resp = await axios.get(`${ROUTE}/${endpoint}?month=${month}&year=${year}`, get_config())
        let data = resp.data
        console.log(data)
        if (data){
            if(Array.isArray(data)){
                const updatedData = data.map(booking => ({
                    ...booking,                      // Spread existing fields
                    "start": updateStartField(booking.time, booking.date, booking.service['time_length']),
                    "end": updateEndField(booking.time, booking.date, booking.service['time_length']),
                    'title': `${booking['client']['fname']} ${booking['client']['lname']}`
                }));
                return updatedData
            } else if(typeof data === 'object'){
                console.log("IN OBJECT")
                return [{
                    ...data,                      // Spread existing fields
                    "start": updateStartField(data.time, data.date, data.service['time_length']),
                    "end": updateEndField(data.time, data.date, data.service['time_length']),
                    'title': `${data['client']['fname']} ${data['client']['lname']}`
                }]
            }
        }else{
            console.log("IN THE EMPTY RESPONSE")
            return []
        }
    }
    catch (error){
        console.log("Error Retrieving data")
        console.log(error)
    }
}

