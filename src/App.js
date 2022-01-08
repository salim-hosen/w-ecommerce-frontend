import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Index from "./Pages/Index";
import ProductDetails from "./Pages/ProductDetails";
import Signin from "./Pages/Auth/Signin";
import Signup from "./Pages/Auth/Signup";
import ScrollToTop from "./Utils/ScrollToTop";
import { getUser, logoutUser } from "./redux/actions/userActions";
import NotFound from "./Pages/NotFound";
import BuyerDashboard from "./Pages/Buyer/Dashboard";
import AdminDashboard from "./Pages/Admin/Dashboard";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import VerifyEmail from "./Pages/Auth/VerifyEmail";
import ResendVerificationEmail from "./Pages/Auth/ResendVerificationEmail";
import BuyerOrders from "./Pages/Buyer/Order/Index";
import BuyerSettings from "./Pages/Buyer/Settings";
import Products from "./Pages/Admin/Product/Index";
import AdminOrders from "./Pages/Admin/Orders";
import CreateProduct from "./Pages/Admin/Product/Create";
import EditProduct from "./Pages/Admin/Product/Edit";
import Cart from "./Pages/Cart";
import AllProduct from "./Pages/AllProduct";
import { loadCartItems } from "./redux/actions/cartActions";
import { OrderShow } from "./Pages/Buyer/Order/Show";


function App() {

  React.useEffect(() => {

      const token = localStorage.token;
  
      if (token) {

        // Checking local saved token expiry if expired logout and return
        const expires_at = localStorage.expires_at;
  
        if (expires_at * 1000 < Date.now()) {
          store.dispatch(logoutUser());
          return;
        }
        
        store.dispatch(getUser());
 
       
      } 
      store.dispatch(loadCartItems());

  }, [])

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
              <ScrollToTop></ScrollToTop>
              <Routes>
                <Route exact path="/" element={<Index />} />
                <Route exact path="/product/:slug" element={<ProductDetails />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/products" element={<AllProduct />} />
                
                <Route exact path="/sign-in" element={<Signin />} />
                <Route exact path="/sign-up" element={<Signup />} />
                <Route exact path="/admin" element={<Signin />} />
                <Route exact path="/forgot-password" element={<ForgotPassword />} />
                <Route exact path="/password/reset/:token" element={<ResetPassword />} />
                <Route exact path="/verification/verify/:user" element={<VerifyEmail />} />
                <Route exact path="/resend-verification" element={<ResendVerificationEmail />} />

                <Route exact path="/buyer/dashboard" element={<BuyerDashboard />} />
                <Route exact path="/buyer/orders" element={<BuyerOrders />} />
                <Route exact path="/buyer/orders/:id" element={<OrderShow />} />
                <Route exact path="/buyer/orders/edit/:id" element={<BuyerOrders />} />
                <Route exact path="/buyer/settings" element={<BuyerSettings />} />


                <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
                <Route exact path="/admin/products" element={<Products />} />
                <Route exact path="/admin/products/create" element={<CreateProduct />} />
                <Route exact path="/admin/products/edit/:slug" element={<EditProduct />} />
                <Route exact path="/admin/orders" element={<AdminOrders />} />
                
                <Route path="*" element={<NotFound/>} />
              </Routes>
          </Router>
      </Provider>
    </div>
  );
}

export default App;
