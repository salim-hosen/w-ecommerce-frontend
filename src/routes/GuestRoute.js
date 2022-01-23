import React from 'react';
import {Route, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ children, user}) => {

    if(user.authenticated){

        return <Navigate to="/buyer/dashboard" replace />

    }

    return <Outlet/>;
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(GuestRoute);