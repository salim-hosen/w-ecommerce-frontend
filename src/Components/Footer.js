
export default function(){
    return (
        <footer className="w-full bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 lg:grid-cols-5">
                <div className="col-span-2 mb-5">
                    <h1 className="text-3xl font-bold text-gray-700">WEcommerce<span className="text-indigo-700 text-4xl">.</span></h1>
                    <p className="my-5 pr-5">Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</p>
                    <h6 className="text-sm font-bold text-gray-700">Got Question? Call us 24/7</h6>
                    <h5 className="text-lg font-bold text-indigo-700">+0123 456 789</h5>
                </div>
                <div className="mb-5">
                    <h4 className="mb-5 text-lg font-bold text-gray-700">Information</h4>
                    <ul>
                        <li><a className="py-1 block" href="">About Us</a></li>
                        <li><a className="py-1 block" href="">Faq</a></li>
                        <li><a className="py-1 block" href="">Terms &amp; Conditions</a></li>
                        <li><a className="py-1 block" href="">Contact Us</a></li>
                        <li><a className="py-1 block" href="">Help</a></li>
                    </ul>
                </div>
                <div className="mb-5">
                    <h4 className="mb-5 text-lg font-bold text-gray-700">Customer Service</h4>
                    <ul>
                        <li><a className="py-1 block" href="">Payment Methods</a></li>
                        <li><a className="py-1 block" href="">Money-Back</a></li>
                        <li><a className="py-1 block" href="">Returns</a></li>
                        <li><a className="py-1 block" href="">Shipping</a></li>
                        <li><a className="py-1 block" href="">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="mb-5">
                    <h4 className="mb-5 text-lg font-bold text-gray-700">Get In Touch</h4>
                    <address>
                        NO. 342 - London Oxford Street.<br/>
                        012 United Kingdom.<br/>
                        info@eshop.com<br/>
                        +032 3456 7890<br/>
                    </address>
                    <div className="mt-3">
                        <a className="text-2xl text-gray-700 hover:text-gray-900" href=""><i className="uil uil-facebook-f"></i></a>
                        <a href="" className="ml-3 text-2xl text-gray-700 hover:text-gray-900"><i className="uil uil-twitter-alt"></i></a>
                        <a href="" className="ml-3 text-2xl text-gray-700 hover:text-gray-900"><i className="uil uil-instagram"></i></a>
                        <a href="" className="ml-3 text-2xl text-gray-700 hover:text-gray-900"><i className="uil uil-intercom"></i></a>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="copyright-section">
                <div className="max-w-6xl mx-auto px-4  py-4 flex justify-between">
                    <p>Copyright © 2020 Ecommerce - All Rights Reserved.</p>
                    <img src="images/payments.png" alt="Payment Methods"/>
                </div>
            </div>
        </footer>
    );
}