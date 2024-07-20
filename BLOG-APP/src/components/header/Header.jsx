import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn"; // Assuming LogoutBtn is a separate component
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage mobile menu open/close

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleNavigation = (slug) => {
    navigate(slug);
    setMenuOpen(false); // Close the mobile menu after navigation
  };

  return (
    <header className="bg-gray-200 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo width="70px" />
              <span className="text-black text-2xl font-semibold ml-4">
                Blog-App
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              className="text-gray-800 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.slug)}
                  className={`px-3 py-2 rounded-md font-medium transition duration-200 ${
                    item.active
                      ? "text-blue-800 bg-gray-200"
                      : "text-black hover:bg-gray-200 hover:text-blue-800"
                  }`}
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && <LogoutBtn />}
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 py-2">
            <nav className="flex flex-col items-center space-y-2">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.slug)}
                    className={`px-3 py-2 rounded-md font-medium transition duration-200 ${
                      item.active
                        ? "text-blue-800 bg-gray-200"
                        : "text-black hover:bg-gray-200 hover:text-blue-800"
                    }`}
                  >
                    {item.name}
                  </button>
                ) : null
              )}
              {authStatus && <LogoutBtn />}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
