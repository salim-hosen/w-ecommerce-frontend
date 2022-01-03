import React from 'react';
import {Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const BuyerRoute = ({ children, user}) => {

    if(user.authenticated && user.role == "buyer"){

        return children

    }else{
        
        return <Navigate to="" replace/>
    
    }

};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(BuyerRoute);