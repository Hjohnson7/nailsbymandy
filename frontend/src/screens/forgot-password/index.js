import ForgotPasswordSide from "../../components/authorization/forgot-password/forgot-password"
import { useEffect, useState } from 'react';
import { useNavigate, redirect } from "react-router-dom"
import { reset_password } from "../../actions/auth"
import { connect } from 'react-redux'
import HeaderBar from "../../components/header-bar/header-bar"

const ForgotPasswordPage = ({reset_password, isAuthenticated}) => {

    const [requestSent, setRequestSent] = useState(false);
    
    const [formData, setFormData] = useState({
        email: ''
    })
    const navigate = useNavigate();

    const {email} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
        setRequestSent(true)
    }

    useEffect(()=>{
        if (requestSent) {
            navigate('/')
        } 
    }, [requestSent])

    return (
        <>
            <HeaderBar 
            text="Nikki Taylor"
            brackets="(Reset Password)"
            />
        <section className="formSection">
            <div className="loginContainer">
            <ForgotPasswordSide
                onSubmit={onSubmit}
                onChange={onChange}
                email={email}
            />
            </div>
        </section>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { reset_password })(ForgotPasswordPage);
