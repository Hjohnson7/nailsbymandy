import React, {useState} from "react"
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const ClockInputForm = (disabledTimes=disabledTimesList) => {

    const [toDisable, setToDisable] = useState(disabledTimes)

    const disabledTimesList = {
        9: [0, 30],
        11: [0],
        13: [30]
    }

    const shouldDisableTime = (value, view) => {
        const hour = value.hour();
        const minute = value.minute();
        if(disabledTimesList.hasOwnProperty(hour)){
            if(disabledTimesList[hour].includes(minute)){
                return true
            }
            return false
        }
            return false
    }

    const displayTime = (view) => {
        console.log(view.hour())
        console.log(view.minute())
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock 
                minTime={dayjs('2022-04-17T09:00')}
                timeStep={30}
                maxTime={dayjs('2022-04-17T18:00')}
                shouldDisableTime={shouldDisableTime}
                onChange={displayTime}
            />
        </LocalizationProvider>
    )
}

export default ClockInputForm