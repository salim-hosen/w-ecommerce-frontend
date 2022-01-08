import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import {connect} from 'react-redux'
import { removeFromCart,increaseCartQty, decreaseCartQty, clearCartItems } from "../redux/actions/cartActions";
import axios from "axios";
import { API_HOST } from "../config/constant";
import { toast, ToastContainer } from "react-toastify";
import FormButton from "../Components/Form/FormButton";


function Cart(props) {

    const {user,cart, removeFromCart, increaseCartQty, decreaseCartQty, clearCartItems} = props;
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    function cartTotal(){

        let sum = 0;
        for(let i = 0; i < cart.items.length; i++){
            sum += parseInt(cart.items[i].qty) * parseFloat(cart.items[i].price);
        }
        return sum.toFixed(2);
    }

    function placeOrder(e)
    {
        e.preventDefault();

        if(!user.authenticated){
            toast.info("Please Login First");
        }

        setSubmitting(true);

        axios.post(API_HOST+"/orders", cart.items, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
                toast.success(res.data.message);
                setSubmitting(false);
                clearCartItems();
                navigate(`/${user.role}/dashboard`);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            });
    }

  return (
    <React.Fragment>
        <Navbar></Navbar>
        <div class="container mx-auto mt-10">
      <div class="flex shadow-md my-10">
        <div class="w-3/4 bg-white px-10 py-10">
          <div class="flex justify-between border-b pb-8">
            <h1 class="font-semibold text-2xl">Shopping Cart</h1>
            <h2 class="font-semibold text-2xl">{cart.items.length} Items</h2>
          </div>

          <div class="flex mt-10 mb-5">
            <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Price
            </h3>
            <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>

        {
            cart.items.map(item => (
                <div key={item.id} class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            
             <div class="flex w-2/5">
               <div class="w-20">
                 <img
                   class="h-24"
                   src={item.image}
                   alt=""
                 />
               </div>
               <div class="flex flex-col justify-between ml-4 flex-grow">
                 <span class="font-bold text-sm">{item.name}</span>
                 {/* <span class="text-red-500 text-xs">Apple</span> */}
                 <Link
                   to="#"
                   class="font-semibold hover:text-red-500 text-gray-500 text-xs"
                   onClick={() => removeFromCart(item.id)}
                 >
                   Remove
                 </Link>
               </div>
             </div>
 
             <div class="flex justify-center w-1/5">
             <i onClick={() => decreaseCartQty(item.id)} class="uil uil-minus cursor-pointer"></i>
                
 
               <span
                 class="mx-2 border text-center w-8"
                 type="text"
                 
               >{item.qty}</span>
 
                <i onClick={() => increaseCartQty(item.id)} class="uil uil-plus cursor-pointer"></i>
             </div>
             <span class="text-center w-1/5 font-semibold text-sm">${item.price}</span>
             <span class="text-center w-1/5 font-semibold text-sm">${parseInt(item.price) * parseInt(item.qty)}</span>
           </div>  
            ))
        }
         


          <Link to="/" class="flex font-semibold text-indigo-600 text-sm mt-10">
          <i class="uil uil-arrow-left"></i>
            Continue Shopping
          </Link>
        </div>

        <div id="summary" class="w-1/4 px-8 py-10">
          <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div class="flex justify-between mt-10 mb-5">
            <span class="font-semibold text-sm uppercase">Items 3</span>
            <span class="font-semibold text-sm">${cartTotal()}</span>
          </div>
          {/* <div>
            <label class="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select class="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div> */}

            <div className="flex justify-between items-center">
                <label class="font-medium inline-block text-sm uppercase">
                Shipping
                </label>
                <span>Free</span>
            </div>

          <div class="border-t mt-8">
            <div class="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${cartTotal()}</span>
            </div>
            {/* <button onClick={placeOrder} class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Checkout
            </button> */}
            <form onSubmit={placeOrder}>
                <FormButton
                    className="w-full"
                    buttonText="Place Order"
                    loading={submitting}
                />
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <ToastContainer></ToastContainer>
    </React.Fragment>
  );
}


const mapStateToProps = (state) => ({
    user: state.user,
    cart: state.cart
  });
  
  const mapActionsToProps = {
    removeFromCart,
    increaseCartQty,
    decreaseCartQty,
    clearCartItems
  }
  
  
  
  export default connect(mapStateToProps,mapActionsToProps)(Cart)
  