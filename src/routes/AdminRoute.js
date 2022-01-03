import React from 'react';
import {Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({ children, user}) => {

    if(user.authenticated && user.role == "admin"){

        return children

    }else{
        
        return <Navigate to="" replace/>
    
    }

};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(AdminRoute);