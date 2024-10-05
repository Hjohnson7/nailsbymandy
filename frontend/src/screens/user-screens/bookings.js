import React, {useState, useEffect} from "react"
import AgTable from "../../components/ag-table/ag-table"
import { connect } from 'react-redux'
import {getUserBookings, getUserPastBookings, getUserUpcomingBookings} from "./request"
import {updateButton} from "./helper-components/modify-button"

[
    {
        "id": 1,
        "date": "2024-09-19",
        "time": "12.00",
        "booking_timestamp": "2024-09-15T00:00:00Z",
        "message": "My first booking.",
        "client": {
            "id": 1,
            "fname": "Harry",
            "lname": "Johnson",
            "email": "arryjohnson@hotmail.co.uk",
            "mobile": null
        },
        "service": {
            "id": 1,
            "service_name": "Mock Service",
            "time_length": "1.50",
            "price": "20.00"
        }
    }
]

const BookingsUserView = (props) => {
    const [pastData, setPastData] = useState([])
    const [upcomingData, setUpcomingData] = useState([])
    const [dataPastLoading, setDataPastLoading] = useState(true)
    const [dataUpcomingLoading, setDataUpcomingLoading] = useState(true)

    let colDefs = [
        {field: "id"},
        {field: "date"},
        {field: "time"},
        {field: "Treatment", valueGetter: (params) => {
            return params.data.service.service_name
        }},
        {field: "Duration", valueGetter: (params)=>{
            return params.data.service.time_length
        }},
        {field: "booking_timestamp"},
        {field: "message"},
        {field: "price", valueGetter: (params) => {
            return params.data.service.price;
          } },
    ]

    const loadUpcomingBooking = async () => {
        let bookings = await getUserUpcomingBookings();
        setUpcomingData(bookings);
        setDataUpcomingLoading(false)
    };

    const loadPastBookings = async () => {
        let bookings = await getUserPastBookings();
        setPastData(bookings);
        setDataPastLoading(false)
    }

    useEffect(()=>{
        loadPastBookings()
        loadUpcomingBooking()
    }, [])

    const displayPastGrid = () => {
        console.log("CALLING PAST GRID WITH", pastData)
        return (
            <AgTable
                data={pastData}
                cols={colDefs}
            />
        )
    }

    const displayUpcomingGrid = () => {
        console.log("CALLING UPCOMING WIHT", upcomingData)
        return (
            <AgTable
                data={upcomingData}
                cols={colDefs}
            />
        )
    }

    const displayLoading = () => {
        return (<></>)
    }

    return (
        <>
        {dataUpcomingLoading ? displayLoading : displayUpcomingGrid()}
        {dataPastLoading ? displayLoading() : displayPastGrid()}
        </>
    )

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(BookingsUserView);
