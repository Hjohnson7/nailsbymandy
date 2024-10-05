import ResetPasswordSide from "../../components/authorization/reset-password/reset-password"
import { useEffect, useState } from 'react';
import { useNavigate, useParams, redirect } from "react-router-dom"
import { reset_password_confirm } from "../../actions/auth"
import { connect } from 'react-redux'

const ResetPasswordPage = ({reset_password_confirm, isAuthenticated}) => {

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    })

    const navigate = useNavigate();

    const {new_password, re_new_password} = formData

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    
    const {uid, token} = useParams()

    const onSubmit = e => {
        if (new_password === re_new_password){
            e.preventDefault();
            reset_password_confirm(uid, token, new_password, re_new_password);
            setRequestSent(true)
        }
    }
    
    useEffect(()=>{
        if (requestSent) {
            navigate('/')
        } 
    }, [requestSent])


    return (
        <>
        <section className="formSection">
            <div className="loginContainer">
                <ResetPasswordSide
                    onSubmit={onSubmit}
                    onChange={onChange}
                    password={new_password}
                    re_password={re_new_password}
                />
            </div>
        </section>
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { reset_password_confirm })(ResetPasswordPage);

