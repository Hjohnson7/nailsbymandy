export let CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
}

export const get_config = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
    }
}

// export const ROUTE = `${process.env.REACT_APP_API_URL}`

export const ROUTE = 'http://127.0.0.1:8000'
// export const ROUTE = "http://192.168.0.36:8000"



