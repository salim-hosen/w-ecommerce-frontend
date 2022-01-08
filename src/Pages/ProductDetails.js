import axios from "axios";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { API_HOST } from "../config/constant";
import React, {useState, useEffect} from 'react'
import parse from 'html-react-parser';
import { addToCart } from "../redux/actions/cartActions";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function ProductDetails(props) {

  const routeParams = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  function loadProduct(){
    axios.get(API_HOST+`/products/${routeParams.slug}`)
        .then(res => {
            const product = res.data.data;
            setProduct(product);
        })
        .catch(err => {
            console.log(err);
        });
}

useEffect(() => {
  loadProduct();
}, [])

function getTruncatedText(txt)
{
  let newtext = "";
  for(let i = 0; i < txt.length; i++){
    if(i > 300 && (txt[i] === "." || txt[i] === "," || txt[i] === " ")){
      return newtext;
    }
    newtext += txt[i];
  }
  
  return newtext;
}

  return (
    <Fragment>
      <Navbar></Navbar>
      <section className="text-gray-700 body-font overflow-hidden bg-white my-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2">
            <img
              alt="ecommerce"
              className="w-full object-cover object-center rounded border border-gray-200 p-20"
              src={product.image}
            />
            <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                { product.name }
              </h1>
              <div className="flex mb-4">{/* Social Icon */}</div>
              <p className="leading-relaxed">
                {
                product.description && 
                  product.description.length > 200 ? parse(getTruncatedText(product.description)+"...") : parse(product.description+"...")
                }
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">In Stock:</span>
                  <span>50</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">
                  $58.00
                </span>
                <div className="flex">
                  <button onClick={() => {
                    props.addToCart(product);
                    toast.success("Added to Cart");
                  }} className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    Add to Cart
                  </button>
                  <button onClick={() => {
                    props.addToCart(product);
                    navigate("/cart");
                  }} className="ml-2 flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>

            <div className="mt-5">
              <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Product Details
              </h2>
              <hr/>
              <div className="mt-5">
                { product.description && parse(product.description) }
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


const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapActionsToProps = {
  addToCart,
}


export default connect(mapStateToProps, mapActionsToProps)(ProductDetails)
