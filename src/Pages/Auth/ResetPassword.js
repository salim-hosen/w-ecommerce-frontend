import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { validate } from "../../Utils/Validator";
import InputField from "../../Components/Form/InputField";
import FormButton from "../../Components/Form/FormButton";
import axios from "axios";
import { API_HOST } from "../../config/constant";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword(props) {
  
    const {makeAuthenticated} = props;
    const navigate = useNavigate();
    const routeParams = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [response, setResponse] = useState("");

    const [form, setForm] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        token: routeParams.token
    });

    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        console.log(searchParams.get("email"));
        setForm({...form, email: searchParams.get("email")});
    }, [])


    function handleSubmit(e){

        e.preventDefault();

        // Validate Form
        const {isValid, errors} = validate(form, {
            email: ['required', 'email'],
            password: ['required', {minLength: 8}],
            password_confirmation: [{match: form.password}]
        });

        setSubmitting(true);

        if(isValid){
            
            setErrors({});
            
            axios.post(API_HOST+"/password/reset", form)
              .then(res => {
                setSubmitting(false);
                setResponse(res.data.message);
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
                    error={errors.email}
                    onInput={(value) => setForm({...form, email: value})}
                    readOnly={true}
                    initialValue={form.email}
                />

                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    error={errors.password}
                    onInput={(value) => setForm({...form, password: value})}
                />


                <InputField
                    id="password_confirmation"
                    label="Confirm Password"
                    type="password"
                    name="password_confirmation"
                    error={errors.password_confirmation}
                    onInput={(value) => setForm({...form, password_confirmation: value})}
                />

                <div className="mt-6">
                  <FormButton
                    buttonText="Reset Password"
                    loading={submitting}
                  />
                </div>
                <div className="mt-6 text-center">
                  <Link className="underline" to="/sign-in">Back to Sign in</Link>
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
