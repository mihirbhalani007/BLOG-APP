// import { Container, Logo, LogoutBtn } from "../index";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Header() {
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();

//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",
//       active: true,
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },
//   ];

//   return (
//     <header className="py-1 bg-gray-200  shadow-lg">
//       <Container>
//         <nav className="flex items-center justify-between">
//           <div className="mr-4">
//             <Link to="/" className="flex items-center">
//               <Logo width="70px" />
//               <span className="text-black text-2xl font-semibold ml-4">
//                 Blog-App
//               </span>
//             </Link>
//           </div>
//           <ul className="flex items-center space-x-4">
//             {navItems.map((item) =>
//               item.active ? (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     className="inline-block px-4 py-2 rounded-full text-black font-medium hover:bg-gray-200 hover:text-blue-800 transition duration-200"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// }

// export default Header;

import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [activeSlug, setActiveSlug] = useState("/"); // Initialize with the default active route

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
    setActiveSlug(slug); // Set the active button's slug
    navigate(slug);
  };

  return (
    <header className="py-1 bg-gray-200 shadow-lg">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <Link to="/" className="flex items-center">
              <Logo width="70px" />
              <span className="text-black text-2xl font-semibold ml-4">
                Blog-App
              </span>
            </Link>
          </div>
          <ul className="flex items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.slug)}
                    className={`inline-block px-4 py-2 rounded-full font-medium transition duration-200 ${
                      activeSlug === item.slug
                        ? "text-blue-800 bg-gray-200 underline"
                        : "text-black hover:bg-gray-200 hover:text-blue-800"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
