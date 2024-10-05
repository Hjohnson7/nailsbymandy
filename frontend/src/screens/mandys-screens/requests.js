import axios from 'axios'
import {get_config, ROUTE } from "../../components/utils/requests-config/requests-config"

export const getPermissions = async() => {
    const endpoint = "accounts/get-permissions"
    try {
        const resp = await axios.get(`${ROUTE}/${endpoint}`, get_config())
        let data = resp.data;
        return data;
    }
    catch (error){
        console.log("Error Retrieving data")
        console.log(error)
    }
}