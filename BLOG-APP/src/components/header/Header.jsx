import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { useState } from "react";
import { setSearchTerm } from "../../store/searchSlice";
import { Profile } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

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

  const options = [
    { label: "Update Password", value: "update-password" },
    { label: "settings", value: "settings" },
    { label: "bookmarks", value: "bookmarks" },
  ];

  const handleNavigation = (slug) => {
    navigate(slug);
    setMenuOpen(false);
  };

  const handleSelect = (option) => {
    navigate(`/${option.value}`);
    // setSelection(option);
  };

  return (
    <header className="bg-gray-200 shadow-md h-16">
      {/* Fixed height for consistent header size */}
      <div className="container mx-auto px-4 h-full flex items-center relative">
        {/* Logo */}
        <div className="absolute left-8 flex items-center">
          <Link to="/" className="flex items-center">
            <Logo width="175px" />
            <span className="text-black text-2xl font-semibold ml-4"></span>
          </Link>
        </div>

        {/* Center Container for Nav Items and Search Bar */}
        <div className="flex flex-grow justify-center items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.slug)}
                    className={`px-3 py-2 rounded-md font-medium transition duration-200 ${
                      location.pathname === item.slug
                        ? "text-blue-800 bg-gray-200"
                        : "text-black hover:bg-gray-200 hover:text-blue-800"
                    }`}
                  >
                    {item.name}
                  </button>
                )
            )}
          </nav>
          {/* Search Bar */}
          {location.pathname === "/all-posts" && (
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="absolute right-0 p-2 top-full mt-2 w-1/4 border rounded-md shadow-lg bg-gray-50 border-gray-300 focus:border-gray-300 focus:outline-none transition-colors duration-200"
            />
          )}
        </div>

        {/* Profile Dropdown and Logout Button */}
        <div className="absolute right-8 flex items-center space-x-4">
          {authStatus && (
            <>
              <Profile
                options={options}
                value={selection}
                onChange={handleSelect}
              />
              <LogoutBtn /> {/* Added Logout Button */}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden ml-auto">
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
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden py-2 w-full">
          <nav className="flex flex-col items-center space-y-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.slug)}
                    className={`px-3 py-2 rounded-md font-medium transition duration-200 ${
                      location.pathname === item.slug
                        ? "text-white bg-blue-500 hover:bg-blue-300"
                        : "text-black bg-gray-200 hover:bg-gray-300 hover:text-blue-800"
                    }`}
                  >
                    {item.name}
                  </button>
                )
            )}
            {authStatus && <LogoutBtn />}
            {location.pathname === "/all-posts" && (
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="px-4 py-2 rounded-md border border-gray-300"
              />
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
