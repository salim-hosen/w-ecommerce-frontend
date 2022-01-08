import { Link } from "react-router-dom";
import { connect } from 'react-redux';

function Navbar(props) {

  const {user,cart} = props;

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between py-4">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="flex">
              {
                user.authenticated ?
                  <Link to={`/${user.role}/dashboard`} className="ml-4 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">My Account</Link>
                :
                <div className="md:flex items-center justify-end md:flex-1 lg:w-0">
                  <Link to="/sign-in" className="ml-4 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Sign in</Link>
                  <Link to="/sign-up" className="ml-4 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">Create Account</Link>
                </div>
              }
            

            {/* Search */}
            <div className="lg:ml-2">
              <a href="#" className="p-2 text-gray-800 hover:text-gray-800">
                <span className="sr-only">Search</span>
                <i className="uil uil-search text-lg"></i>
              </a>
            </div>

            {/* Cart */}
            <div className="lg:ml-2">
              <Link to="/cart" className="group -m-2 p-2 flex items-center">
                <i className="uil uil-shopping-bag text-lg"></i>
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {cart.items.length}
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


const mapStateToProps = (state) => ({
  user: state.user,
  cart: state.cart
});


export default connect(mapStateToProps)(Navbar)
