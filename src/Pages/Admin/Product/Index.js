import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../../Components/Layouts/AdminSidebar";
import { API_HOST } from "../../../config/constant";

export default function Index() {

    const [products, setProducts] = useState([])

    async function loadProducts(){
        axios.get(API_HOST+"/products")
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    async function handleSearch(e)
    {
      axios.get(`${API_HOST}/products?q=${e.target.value}`)
            .then(res => {
                setProducts(res.data.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        loadProducts();
    }, [])

  function deleteProduct(id){

    if(!window.confirm("Are you Sure to Delete?")) return;

    axios.post(`${API_HOST}/products/${id}`, {_method: "DELETE"}, { headers: {"Authorization" : `${localStorage.getItem('token')}`} })
      .then(res => {
          loadProducts();
      })
      .catch(err => {
          console.log(err);
      });

  }
    
  return (
    <Fragment>
      <div className="flex flex-row flex-wrap">
        <AdminSidebar></AdminSidebar>

        <main role="main" className="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
          <div className="w-full h-full rounded border-gray-300 p-5">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-600 pb-2">
                Product List
                </h2>
                <div className="flex justify-between items-center mb-3">
                <div class="relative mx-auto text-gray-600">
                  <input onChange={handleSearch} class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search" name="search" placeholder="Search"/>
                  <button type="submit" class="absolute right-0 top-0 mr-4 flex items-center justify-center" style={{ top: 8 }}>
                  <i class="uil uil-search"></i>
                  </button>
                </div>
                  <Link to="/admin/products/create" className="ml-5 inline-flex items-center justify-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 transition">Create Product</Link>
                </div>
            </div>
            <hr />
            <div className="flex flex-col mt-5">
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
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Qty
                          </th>
                       
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Action</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        { products.length > 0 ? 
                        products.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={product.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {product.price}
                              </div>
                            </td>
                         
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {product.qty}
                              </div>
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/admin/products/edit/${product.slug}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </Link>
                              <Link
                                to="#"
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900 ml-5"
                              >
                                Delete
                              </Link>
                            </td>
                          </tr>
                        )) 
                        :
                        <tr>
                          <td colSpan={4}>
                            <div className="p-5">No Product Found</div>
                          </td>
                        </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}
