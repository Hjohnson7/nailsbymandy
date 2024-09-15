import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams, redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';

const Activate = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const {uid, token} = useParams()

    const verify_account = e => {
        verify(uid, token);
        setVerified(true);
    };

    const navigate = useNavigate()

    useEffect(()=>{
        if (verified) {
            navigate('/')
        }
    }, [verified])

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
