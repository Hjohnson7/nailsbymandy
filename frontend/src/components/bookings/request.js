import get_config from "../utils/requests-config/requests-config"
import { get_user } from "../../../actions/auth"

export const updateBooking = async (id, data) => {
    const endpoint = '/update-booking'
    const data = JSON.stringify({data: bookingDatal})
    try {
        const res = await axios.post(`${ROUTE}/${endpoint}`, data, get_config())
        console.log('Booking updated:', response.data);
    }
    catch (error){
        console.error('Error updating booking:', error.response.data);
    }
}


const bookingData = {
    first_name: "John",  // For guest users
    last_name: "Doe",    // For guest users
    email: "johndoe@example.com",  // For guest users
    service_id: 2,       // ID of the service to book
    date: "2024-10-01",  // Booking date
    time: "14:00",       // Booking time
    message: "Looking forward to the session",  // Optional message
};

export const createBooking = async (data) => {
    const endpoint = '/create-booking'
    const data = JSON.stringify({data: data})
    try {
        const res = await axios.post(`${ROUTE}/${endpoint}`, data, get_config())
        console.log('Booking created:', response.data);
    }
    catch (error){
        console.error('Error creating booking:', error.response.data);
    }
}