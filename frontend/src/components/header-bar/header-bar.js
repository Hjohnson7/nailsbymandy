import React from "react"
import "./header-bar.css"
import {useNavigate} from "react-router-dom"

const HeaderBar = () => {
    const navigate = useNavigate()

    const returnHome = () => {
        navigate("/")
    }

    return (
        <h1 className="header-title" onClick={returnHome}>
            NailsByMandy
        </h1>
    )
}

export default HeaderBar