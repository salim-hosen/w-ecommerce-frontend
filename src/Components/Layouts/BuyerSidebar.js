import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

function BuyerSidebar(props) {

    const navigate = useNavigate();

    return (
        <aside className="w-full sm:w-1/3 md:w-1/4 px-2">
            <div className="sticky top-0 w-full">
              <ul className="flex flex-col overflow-hidden">
                <div className="px-8 bg-gray-100 rounded-md">
                  <div className="h-16 w-full flex items-center">
                    <h3 className="text-xl font-bold text-gray-800">
                      Buyer Dashboard
                    </h3>
                  </div>
                  <ul className="py-5">

                    <li className="flex w-full justify-between text-gray-700 hover:text-gray-800 cursor-pointer items-center">
                      <Link
                        to="/buyer/dashboard"
                        className="block w-full py-2"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-create-dashboard"></i>
                          <span className="text-sm ml-2">Dashboard</span>
                        </div>
                      </Link>
                    </li>

                    <li className="flex w-full justify-between text-gray-700 hover:text-gray-800 cursor-pointer items-center">
                      <Link
                        to="/buyer/orders"
                        className="block w-full py-2"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-shopping-basket"></i>
                          <span className="text-sm ml-2">Orders</span>
                        </div>
                      </Link>
                    </li>

                    <li className="flex w-full justify-between text-gray-700 hover:text-gray-800 cursor-pointer items-center">
                      <Link
                        to="/buyer/settings"
                        className="block w-full py-2"
                      >
                        <div className="flex items-center">
                          <i className="uil uil-cog"></i>
                          <span className="text-sm ml-2">Settings</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex w-full justify-between text-gray-700 hover:text-gray-800 cursor-pointer items-center">
                      <Link
                        to="#"
                        onClick={() => props.logoutUser(navigate)}
                        className="block w-full py-2"
                      >
                        <div className="flex items-center">
                        <i className="uil uil-signout"></i>
                          <span className="text-sm ml-2">Sign Out</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </aside>
    )
}



const mapStateToProps = (state) => ({
    user: state.user,
});
  
const mapActionsToProps = {
    logoutUser,
}
  
  
  export default connect(mapStateToProps, mapActionsToProps)(BuyerSidebar)
  