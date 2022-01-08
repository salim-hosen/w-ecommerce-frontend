import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { validate } from "../../Utils/Validator";
import InputField from "../../Components/Form/InputField";
import FormButton from "../../Components/Form/FormButton";
import CheckBox from "../../Components/Form/CheckBox";
import axios from "axios";
import { API_HOST } from "../../config/constant";
import { connect } from 'react-redux';
import {makeAuthenticated} from '../../redux/actions/userActions'
import { useNavigate } from 'react-router-dom';

function Signin(props) {
  
    const {makeAuthenticated} = props;
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember_me: false
    });

    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState({});


    function handleSubmit(e){

        e.preventDefault();

        // Validate Form
        const {isValid, errors} = validate(form, {
            email: ['required', 'email'],
            password: ['required', {minLength: 5}],
        });

        setSubmitting(true);

        if(isValid){
            
            setErrors({});
            
            axios.post(API_HOST+"/login", form)
              .then(res => {
                setSubmitting(false);
                makeAuthenticated(res, navigate); // store to redux
              })
              .catch(err => {
                if(err.response && err.response.status === 422){
                  
                  setErrors(err.response.data.errors);

                }
                setSubmitting(false);
              });

        }else{
            setErrors(errors);
            setSubmitting(false);
        }
        
    }

  return (
    <Fragment>
      <Navbar></Navbar>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="w-full min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div className="w-full sm:max-w-md p-5 mx-auto">
              <h2 className="mb-12 text-center text-5xl font-extrabold">
                Welcome.
              </h2>
              <form onSubmit={handleSubmit}>

                <InputField
                    id="email"
                    label="Email-Address"
                    type="text"
                    name="email"
                    error={
                      errors.email && errors.need_verification ?
                      <Link to="/resend-verification" className="text-xs text-blue-500">{errors.email+". "}<strong> Verify Now</strong></Link>
                      :
                      errors.email ? errors.email : null
                    }
                    onInput={(value) => setForm({...form, email: value})}
                >
                 
                </InputField>
                

                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    error={errors.password}
                    onInput={(value) => setForm({...form, password: value})}
                />

                <div className="mt-6 flex items-center justify-between">
                  
                  <CheckBox
                    labelText="Remember Me"
                    id="remember_me"
                    checked={form.remember_me}
                    onInput={(value) => setForm({...form, remember_me: value})}
                  />

                  <Link to="/forgot-password" className="text-sm">
                    Forgot your password?
                  </Link>
                </div>
                <div className="mt-6">
                  <FormButton
                    fullWidth={true}
                    buttonText="Sign In"
                    loading={submitting}
                  />
                </div>
                <div className="mt-6 text-center">
                  <Link className="underline" to="/sign-up">Sign up for an account</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  makeAuthenticated,
}


export default connect(mapStateToProps, mapActionsToProps)(Signin)
