import React, { Fragment,useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import InputField from "../../Components/Form/InputField";
import axios from "axios";
import { API_HOST } from "../../config/constant";
import FormButton from "../../Components/Form/FormButton";
import { validate } from "../../Utils/Validator";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: false
});

const [submitting, setSubmitting] = useState(false);

const [response, setResponse] = useState("");

const [errors, setErrors] = useState({});


function handleSubmit(e){

    e.preventDefault();
    // Validate Form
    const {isValid, errors} = validate(form, {
        name: ["required"],
        email: ['required', 'email'],
        password: ['required', {minLength: 8}],
        password_confirmation: [{match: form.password}]
    });

    setSubmitting(true);

    if(isValid){
        
        setErrors({});
        
        axios.post(API_HOST+"/register", form)
          .then(res => {
            setSubmitting(false);
            setResponse("Account Created Successfully. Please Check your Email for Verification.");
          })
          .catch(err => {
            if(err.response && err.response.status === 422){
              setErrors(err.response.data.errors);
            }else{
              toast.error("Something wen't Wrong!")
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
                    id="name"
                    label="Full Name"
                    type="text"
                    name="name"
                    error={errors.name}
                    onInput={(value) => setForm({...form, name: value})}
                />

                <InputField
                    id="email"
                    label="Email-Address"
                    type="text"
                    name="email"
                    error={errors.email}
                    onInput={(value) => setForm({...form, email: value})}
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
                
                {/* Success Alert */}
                {response && <SuccessAlert message={response}/>}

                <div className="mt-6">
                  <FormButton
                  fullWidth={true}
                      buttonText="Create Account"
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
      {/* Toast */}
      <ToastContainer />
    </Fragment>
  );
}
