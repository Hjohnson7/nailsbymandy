import React, {useState, useEffect} from "react"
import { connect } from 'react-redux'
import BookingsCalendar from "../../components/calendar/calendar"
import { useNavigate } from "react-router-dom";
import {getPermissions} from "./requests"


const CalendarScreen = ({isAuthenticated}) => {

    const [isSuperUser, setIsSuperUser] = useState("pending")
    const [loadingUser, setLoadingUser] = useState(true)
    
    const navigate = useNavigate();

    useEffect(() => {
        const checkSuperUser = async() => {
            const resp = await getPermissions()
            setIsSuperUser(resp.is_superuser)
            setLoadingUser(false)
        }
        checkSuperUser()

    }, [])

    if (!isAuthenticated) {
        console.log(isAuthenticated)
        console.log("ABOVE IS THE AUTHENTICATION")
        // navigate('/') // Redirect to login if not authenticated
    }

    useEffect(()=>{
        if(!loadingUser){
            console.log("BELOW IS SUPERUSER")
            console.log(isSuperUser)
            if(!isSuperUser){
                navigate('/')
            }
        }
    }, [loadingUser])

    const displayScreen = () => {
        return (
            <BookingsCalendar />
        )
    }

    const dataLoading = () => {
        return <></>
    }

    return (
        loadingUser ? dataLoading() : displayScreen()
    )
    
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(CalendarScreen);