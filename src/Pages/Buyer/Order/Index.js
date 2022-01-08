import axios from "axios";
import React, { Fragment,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../Components/Footer";
import BuyerSidebar from "../../../Components/Layouts/BuyerSidebar";
import Navbar from "../../../Components/Navbar";
import { API_HOST } from "../../../config/constant";

export default function Index() {

    const [orders, setOrders] = useState([])

    async function loadOrders(){
        axios.get(API_HOST+"/orders", { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
                setOrders(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function deleteOrder(){

    }

    async function handleSearch(e)
    {
      axios.get(`${API_HOST}/orders?q=${e.target.value}`, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
            .then(res => {
                setOrders(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
      useEffect(() => {
          loadOrders();
      }, [])

  return (
    <Fragment>
      <Navbar></Navbar>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-row flex-wrap py-10">
          
          <BuyerSidebar></BuyerSidebar>

          <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <div className="w-full h-full rounded border-gray-300">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Order List
                </h2>
                <div className="flex justify-between items-center mb-3">
                <div class="relative mx-auto text-gray-600">
                  <input onChange={handleSearch} class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search"/>
                  <button type="submit" class="absolute right-0 top-0 mr-4 flex items-center justify-center" style={{ top: 8 }}>
                  <i class="uil uil-search"></i>
                  </button>
                </div>
                  {/* <Link to="/admin/products/create" className="ml-5 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 transition">Create Product</Link> */}
                </div>
            </div>
            <hr />
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Order ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Buyer
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total
                          </th>
                       
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        { orders.length > 0 ? 
                        orders.map((order) => (
                          <tr key={order.id}>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                #{order.order_uid}
                              </div>
                            </td>
                         
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {order.buyer}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                ${order.total}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                                to={`/buyer/orders/${order.id}`}
                                className="text-teal-600 hover:text-teal-900"
                              >
                                View
                              </Link>
                              {
                                order.status == "pending" && 
                                <Fragment>
                                  <Link
                                    to={`/buyer/orders/edit/${order.id}`}
                                    className="ml-5 text-indigo-600 hover:text-indigo-900"
                                  >
                                    Edit
                                  </Link>
                                  <Link
                                    to="#"
                                    onClick={() => deleteOrder(order.id)}
                                    className="text-red-600 hover:text-red-900 ml-5"
                                  >
                                    Delete
                                  </Link>
                                </Fragment>
                              }
                            </td>
                          </tr>
                        )) 
                        :
                        <tr>
                          <td colSpan={4}>
                            <div className="p-5">No Order Found</div>
                          </td>
                        </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
        </div>
      </div>

      <Footer></Footer>
    </Fragment>
  );
}
