import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { validate } from "../../Utils/Validator";
import InputField from "../../Components/Form/InputField";
import FormButton from "../../Components/Form/FormButton";
import axios from "axios";
import { API_HOST } from "../../config/constant";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";

export default function ForgotPassword(props) {
  

    const [form, setForm] = useState({
        email: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const [response, setResponse] = useState("");

    const [errors, setErrors] = useState({});


    function handleSubmit(e){

        e.preventDefault();

        // Validate Form
        const {isValid, errors} = validate(form, {
            email: ['required', 'email'],
        });

        setSubmitting(true);

        if(isValid){
            
            setErrors({});
            
            axios.post(API_HOST+"/password/email", form)
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
                />

                {/* Success Alert */}
                {response && <SuccessAlert message={response}/>}

                <div className="mt-6">
                  <FormButton
                    buttonText="Send Reset Mail"
                    loading={submitting}
                  />
                </div>
                <div className="mt-6 text-center">
                    <Link to="/sign-in" className="underline">
                    Back to Sign in
                  </Link>
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

