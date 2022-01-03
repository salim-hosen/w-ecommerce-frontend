import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { validate } from "../../Utils/Validator";
import InputField from "../../Components/Form/InputField";
import FormButton from "../../Components/Form/FormButton";
import axios from "axios";
import { API_HOST } from "../../config/constant";
import SuccessAlert from "../../Components/Alerts/SuccessAlert";
import ErrorAlert from "../../Components/Alerts/ErrorAlert";

export default function VerifyEmail() {
  
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState("");
    
    const [searchParams, setSearchParams] = useSearchParams();
    const routeParams = useParams();

    function verify(){

        setSubmitting(true);
        axios.post(`${API_HOST}/verification/verify/${routeParams.user}?expires=${searchParams.get("expires")}&signature=${searchParams.get("signature")}`)
            .then(res => {
                setSubmitting(false);
                setResponse(res.data.message);
            }).catch(err => {
                if(err.response && err.response.status === 422){
                    setErrors(err.response.data.errors);
                }
                console.log(err);
                setSubmitting(false);
            });
    }

    useEffect(() => {
        verify();
    }, [])

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
              {/* Success Alert */}
              {response && <SuccessAlert message={response}/>}
              {errors.message && <ErrorAlert message={errors.message}/>}
              <div className="mt-6 text-center">
                  <Link to="/sign-in" className="underline">
                    Back to Sign in
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </Fragment>
  );
}

