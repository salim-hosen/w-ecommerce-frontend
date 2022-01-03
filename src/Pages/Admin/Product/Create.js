import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SuccessAlert from "../../../Components/Alerts/SuccessAlert";
import FormButton from "../../../Components/Form/FormButton";
import InputField from "../../../Components/Form/InputField";
import AdminSidebar from "../../../Components/Layouts/AdminSidebar";
import { API_HOST } from "../../../config/constant";
import { EditorState } from "draft-js";
import { validate } from "../../../Utils/Validator";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CKEditor } from 'ckeditor4-react';

export default function CreateProduct() {
  
  const [form, setForm] = useState({
    name: "",
    price: "",
    qty: "",
    image: '',
    description: ""
  });

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
 
  function handleImage(e){

    const file = e.target.files[0];
    setForm({...form, image: file});
    setImageURL(URL.createObjectURL(file));

  }

  function handleSubmit(e) {
    e.preventDefault();

    setForm({...form, description: description});
    // Validate Form
    const {isValid, errors} = validate(form, {
        name: ['required'],
        price: ['required'],
        qty: ['required'],
        image: ['required'],
        description: ['required']
    });

    setSubmitting(true);
    
    if(isValid){

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("qty", form.qty);
        formData.append("image", form.image);
        formData.append("description", form.description);

        axios.post(API_HOST+"/products", formData, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
                setErrors({});
                toast.success("Product Created Successfully!");
                setSubmitting(false);
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
      <div className="flex flex-row flex-wrap">
        <AdminSidebar></AdminSidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-gray-300 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Create Product
              </h2>
            </div>
            <hr />
            <div className="mt-5">
              <form onSubmit={handleSubmit}>
                
                <div className="grid md:grid-cols-2">

                    <div>
                    <InputField
                  id="name"
                  label="Product Name"
                  type="text"
                  name="name"
                  error={errors.name}
                  onInput={(value) => setForm({ ...form, name: value })}
                />

                <InputField
                  id="price"
                  label="Price"
                  type="text"
                  name="price"
                  error={errors.price}
                  onInput={(value) => setForm({ ...form, price: value })}
                />

                <InputField
                  id="qty"
                  label="Quantity"
                  type="number"
                  name="qty"
                  error={errors.qty}
                  onInput={(value) => setForm({ ...form, qty: value })}
                />
                    </div>

                    <div className="w-full h-full flex justify-center items-center">
                        
                        <div>
                        <label htmlFor="image">
                            {
                                imageURL ? 
                                <div className="relative">
                                    <img src={imageURL} alt="image" style={{height: 120, width: 120}}/>
                                    <i class="uil uil-image-upload absolute 4xl"></i>
                                </div>
                                :
                                <div className="text-center border border-dashed border-gray-400 rounded-md">
                                    <i class="uil uil-image-upload text-5xl text-gray-500 p-10 block"></i>
                                </div>
                            }
                            <input type="file" id="image" onChange={handleImage} name="image" hidden/>
                            
                        </label>
                        <div>
                        {
                            errors.image && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                {errors.image}
                            </span>
                        }
                        </div>
                        </div>
                        
                    </div>
                </div>

                <CKEditor
                    initData={form.description}
                    onChange={(e) => {
                        const data = e.editor.getData();
                        setDescription(data);
                    }}
                />
                {
                    errors.description && <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                        {errors.description}
                    </span>
                }

                <div className="mt-6 text-center">
                  <FormButton
                    fullWidth={false}
                    buttonText="Create Product"
                    loading={submitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </Fragment>
  );
}
