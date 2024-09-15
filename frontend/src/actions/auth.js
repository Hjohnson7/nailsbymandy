import axios from 'axios'
import {ROUTE} from "../components/utils/requests-config/requests-config"
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
    CLOSE_ALERT,
} from './types'

const URL = 'http://127.0.0.1:8000'

export const checkAuthenticated = () => async dispatch => {
    console.log("CALLING CHECK AUTH")
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    }
    if (localStorage.getItem('access')){
        const body = JSON.stringify({token: localStorage.getItem('access')})
        try {
            const res = await axios.post(`${ROUTE}/auth/jwt/verify/`, body, config)
            if (res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else if(localStorage.getItem('refresh')) {
                const body = JSON.stringify({refresh: localStorage.getItem('refresh')})
                const res = await axios.post(`${ROUTE}/auth/jwt/refresh/`, body, config)
                if (res.data.code !== 'token_not_valid'){
                    localStorage.setItem(res.data.access)
                    dispatch({
                        type: AUTHENTICATED_SUCCESS
                    })
                } else{
                   dispatch({
                    type: AUTHENTICATED_FAIL
                }) 
                }
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                }) 
            }
        } catch (err){
            try{
                if(localStorage.getItem('refresh')) {
                    delete config.headers['Authorization'] 
                    const body = JSON.stringify({refresh: localStorage.getItem('refresh')})
                    const res = await axios.post(`${ROUTE}/auth/jwt/refresh/`, body, config)
                    if (res.data.code !== 'token_not_valid'){
                        localStorage.setItem(res.data.access)
                        dispatch({
                            type: AUTHENTICATED_SUCCESS
                        })
                    } else{
                       dispatch({
                        type: AUTHENTICATED_FAIL
                    }) 
                    }
                }
            } catch(err){
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        }
    } else if(localStorage.getItem('refresh')) {
        delete config.headers['Authorization'] 
        const body = JSON.stringify({refresh: localStorage.getItem('refresh')})
        const res = await axios.post(`${ROUTE}/auth/jwt/refresh/`, body, config)
        if (res.data.code !== 'token_not_valid'){
            localStorage.setItem(res.data.access)
            dispatch({
                type: AUTHENTICATED_SUCCESS
            })
        } else{
           dispatch({
            type: AUTHENTICATED_FAIL
        }) 
        }
    }  
    else{
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const body = JSON.stringify({email, password})
    try {
        const res = await axios.post(`${ROUTE}/auth/jwt/create/`, body, config)
        localStorage.setItem("username", email)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const signup = (email, fname, lname, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
            
        }
    }
    const body = JSON.stringify({ email, fname, lname, password, re_password})

    try {
        const res = await axios.post(`${ROUTE}/auth/users/`, body, config)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        return {"redirect": true}
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        return {"redirect": false}
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try {
        const res = await axios.post(`${ROUTE}/auth/users/activation/`, body, config)
        dispatch({
            type: ACTIVATION_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email})
    try{
        await axios.post(`${ROUTE}/auth/users/reset_password/`, body, config)
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        })
    }catch{
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({uid, token, new_password, re_new_password})
    try{
        await axios.post(`${ROUTE}/auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        })
    }catch{
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        try {
            const res = await axios.get(`${ROUTE}/auth/users/me/`, config)
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};

export const close_alert = () => async dispatch => {
    dispatch({
        type: CLOSE_ALERT
    })
}

export const get_user =  async()  => {
    let res;
    let config;
    if (localStorage.getItem('access')){
        config = {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        try {
            res = await axios.get(`${ROUTE}/auth/users/me/`, config)
        } catch(error){
            if (error.response.status === 401) {
                try{
                    const body = JSON.stringify({refresh: localStorage.getItem('refresh')})
                    let refresh = await axios.post(`${ROUTE}/auth/jwt/refresh/`, body, config)
                    if (refresh.data.code !== 'token_not_valid'){
                        localStorage.setItem('access', refresh.data.access)
                        config['headers']['Authorization'] = `Bearer ${refresh.data.access}`
                        res = await axios.get(`${ROUTE}/auth/users/me/`, config)
                    }
                }catch(error){
                    console.log(error)
                    console.log("Failed to refresh User.")
                }
            }
        }
    if(res){
        if(res.data){
            return res.data
        }
        return null
    }
    }
    return null
}