import React from "react"
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux"
import { close_alert } from "../../actions/auth"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors";

const theme = createTheme({
  components: {
    // Name of the component
    Alert: {
      styleOverrides: {
        // Name of the slot
        "MuiAlert-root": {
          // Some CSS
          fontSize: '1rem',
          color: red,
        },
      },
    },
  },
});

const AlertNotification = ({settings, close_alert }) => {
    return(
      <div style={{ position: "absolute", top: "5%", left: 0, right: 0, zIndex: 999, width: "50%", margin: "auto"}}>
        <Collapse in={settings.open}>
        <Alert
            severity={settings.severity}
            action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                close_alert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {settings.message}
        </Alert>
      </Collapse>
      </div>
    )
}

const mapStateToProps = state => ({
    settings: state.auth.popup
})

export default connect(mapStateToProps, {close_alert})(AlertNotification)