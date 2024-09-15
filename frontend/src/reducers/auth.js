import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    CLOSE_ALERT
} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    popup: {
        severity: "error",
        message: "",
        open: false
    }
}

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            // localStorage.removeItem('access')
            // localStorage.removeItem('refresh')
            // localStorage.removeItem('username')
            return {
                    ...state,
                    isAuthenticated: false
                }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.setItem('refresh', payload.refresh)
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                popup: {
                    severity: "success",
                    message: "Successfully Logged In",
                    open: true
                }
            }
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated: false,
                popup: {
                    severity: "info",
                    message: "A verification email has been sent to your email address.",
                    open: true
                },
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                popup: {
                    severity: "error",
                    message: "Error Logging in, please try again.",
                    open: true
                }
            }
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                popup: {
                    severity: "info",
                    message: "Logout Successful",
                    open: true
                }
            }
        case SIGNUP_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                popup: {
                    severity: "error",
                    message: "Error with signup, please try again.",
                    open: true
                }
            }
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state,
            }
        case CLOSE_ALERT:
            return {
                ...state,
                popup: {
                    open: false
                }
            }
        default:
            return state
    }
}