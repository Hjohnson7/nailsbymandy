import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';
import AlertNotification from "../components/alerts"
// import Footer from '../components/footer/footer'

const Layout = ({ checkAuthenticated, load_user, children, isAuthenticated }) => {
    
    useEffect(() => { 
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <>
        <div id="wrapper">
                <AlertNotification 
                />
                {children}
                
        </div>
        {/* <Footer /> */}
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { checkAuthenticated, load_user })(Layout);
