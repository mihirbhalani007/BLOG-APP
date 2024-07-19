import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="py-12 bg-gray-200  text-center shadow-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap justify-center md:justify-between">
          {/* Column 1 */}
          <div className="w-full md:w-1/2 lg:w-4/12 p-6">
            <div className="flex flex-col items-center mb-6">
              <Link to="/" className="flex items-center">
                <Logo width="80px" /> {/* Adjust logo size */}
              </Link>
              <p className="text-sm text-gray-600 mt-4">
                &copy; 2024 Blog-App. All Rights Reserved.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <h3 className="text-sm font-semibold uppercase text-gray-700 mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <h3 className="text-sm font-semibold uppercase text-gray-700 mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="w-full md:w-1/2 lg:w-3/12 p-6">
            <h3 className="text-sm font-semibold uppercase text-gray-700 mb-4">
              Legals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-blue-600 transition duration-300"
                >
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
