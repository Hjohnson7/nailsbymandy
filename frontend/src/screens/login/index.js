import SignInSide from "../../components/authorization/sign-in/sign-in"
import { useEffect, useState } from 'react';
import { useNavigate, redirect } from "react-router-dom"
import { login } from "../../actions/auth"
import { connect } from 'react-redux'

const LoginPage = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const {email, password} = formData
    
    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    }

    useEffect(()=>{
        if (isAuthenticated) {
            navigate('/')
        } 
    }, [isAuthenticated])

    return (
        <>
        <section className="formSection"> 
            <div className="loginContainer">
                <SignInSide
                    onSubmit={onSubmit}
                    onChange={onChange}
                    email={email}
                    password={password}
                />
            </div>
        </section>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(LoginPage);
