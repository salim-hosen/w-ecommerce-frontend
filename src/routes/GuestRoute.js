import React from 'react';
import {Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ children, user}) => {

    if(user.authenticated){

        switch (user.role) {
            case 'buyer':
                return <Navigate to="/buyer/dashboard" replace />
            case 'admin':
                return <Navigate to="/admin/dashboard" replace /> 
            default:
                return <Navigate to="/"/>
        }

    }else{
        
        return children
    
    }

};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(GuestRoute);