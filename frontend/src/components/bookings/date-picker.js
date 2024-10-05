import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const DatePickerForm = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
             <DatePicker defaultValue={dayjs('2022-04-17')} />
        </LocalizationProvider>
    )
}

export default DatePickerForm