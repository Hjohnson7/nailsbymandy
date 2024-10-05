import axios from 'axios'
import {get_config, ROUTE } from "../../components/utils/requests-config/requests-config"


export const getUserBookings = async() => {
    const endpoint = 'bookings/user-bookings'
    // const data = JSON.stringify({month: month, year:year})
    try {
        const resp = await axios.get(`${ROUTE}/${endpoint}`, get_config())
        return resp.data;
    }
    catch (error){
        console.log("Error Retrieving data")
        console.log(error)
    }
}

export const getUserPastBookings = async() => {
    const endpoint = 'bookings/user-past-bookings'
    // const data = JSON.stringify({month: month, year:year})
    try {
        const resp = await axios.get(`${ROUTE}/${endpoint}`, get_config())
        return resp.data;
    }
    catch (error){
        console.log("Error Retrieving data")
        console.log(error)
    }
}

export const getUserUpcomingBookings = async() => {
    const endpoint = 'bookings/user-upcoming-bookings'
    // const data = JSON.stringify({month: month, year:year})
    try {
        const resp = await axios.get(`${ROUTE}/${endpoint}`, get_config())
        return resp.data;
    }
    catch (error){
        console.log("Error Retrieving data")
        console.log(error)
    }
}
    