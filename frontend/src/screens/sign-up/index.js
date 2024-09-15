import SignUpSide from "../../components/authorization/sign-up/sign-up"
import { useEffect, useState } from 'react';
import { useNavigate, redirect } from "react-router-dom"
import { signup } from "../../actions/auth"
import { connect } from 'react-redux'

const SignUpPage = ({signup, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    const {email, fname, lname, password, re_password} = formData
    
    const onSubmit = async(e) => {
        e.preventDefault();
        const resp = await signup(email, fname, lname, password, re_password);
        console.log("THIS IS THE RESPONSE")
        console.log(resp)
        if(resp.redirect){
            navigate('/login')
        }
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
                <SignUpSide
                    onSubmit={onSubmit}
                    onChange={onChange}
                    email={email}
                    password={password}
                    re_password={re_password}
                    fname={fname}
                    lname={lname}
                />
            </div>
        </section>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(SignUpPage);
