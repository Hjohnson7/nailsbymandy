import Grid from '@mui/material/Grid2';
import ClockInputForm from "./time-selector"
import Box from '@mui/material/Box';
import DatePickerForm from "./date-picker"
import Stack from '@mui/material/Stack';

const BookingForm = () => {
    return (
        <div className="booking-form-container">
        <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={2}>
            <Grid size={12}>
            <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                    <DatePickerForm />
                    <ClockInputForm />
            </Stack>
            </Grid>
            <Grid size={4}>
                BLANK
            </Grid>
            <Grid size={4}>
             size=4
            </Grid>
            <Grid size={8}>
              size=8
            </Grid>
          </Grid>
        </Box>
        </div>
      );
}

export default BookingForm