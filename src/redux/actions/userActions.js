import axios from 'axios';
import { API_HOST } from '../../config/constant';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

export const makeAuthenticated = (response, navigate) => (dispatch) => {
    
    const token = `Bearer ${response.data.token}`;
    localStorage.setItem('token', token);
    localStorage.setItem('expires_at', response.data.expires_in);
    axios.defaults.headers.common['Authorization'] = token;

    const user = response.data.user;
    dispatch({type: SET_AUTHENTICATED, payload: user});

    if(user.role == "buyer"){
        navigate("/buyer/dashboard");
    }else if(user.role == "admin"){
        navigate("/admin/dashboard");
    }else{
        navigate("");
    }

} 


export const logoutUser = () => (dispatch) => {

    alert("HERE");
    const token = localStorage.token;

    localStorage.removeItem("token");
    localStorage.removeItem('expires_at');
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED});

    if(token){
        // logout from server
        axios.post(API_HOST+"/logout", null, {
            headers: {
                Authorization: "Bearer "+ token
            }
        });
    }

}

export const getUser = () => (dispatch) => {
    
    const token = localStorage.token;

    axios.get(API_HOST+"/me", { headers: {"Authorization" : `${token}`} })
    .then(res => {
        console.log(res);
        dispatch({type: SET_AUTHENTICATED, payload: res.data.data});

    })
    .catch( err => {
        // dispatch(logoutUser());
        console.log(err);
    });

}


