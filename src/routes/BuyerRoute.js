import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';

const BuyerRoute = ({ children, user}) => {

    if(!user.authenticated){

        return <Navigate to="/sign-in" replace/>;

    }

    return <Outlet/>

};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(BuyerRoute);