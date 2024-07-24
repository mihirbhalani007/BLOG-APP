import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useSelector } from "react-redux";

function Profile({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();
  const userData = useSelector((state) => state.auth.userData);
  // console.log("user data", userData);

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        // setIsopen(false);
      }
    };

    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        className="hover:bg-sky-100 rounded cursor-pointer p-1"
        onClick={() => handleOptionClick(option)}
        key={option.value}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={divEl} className="relative w-48">
      <div
        className="flex items-center justify-between p-3 bg-gray-200 border rounded cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="font-semibold text-sm text-red-700">
            {userData?.name}
          </span>
        </div>
        {isOpen ? (
          <GoChevronUp className="text-lg text-gray-700" />
        ) : (
          <GoChevronDown className="text-lg text-gray-700" />
        )}
      </div>
      {isOpen && (
        <div className="absolute top-full mt-2 w-full border rounded shadow bg-white z-10">
          {renderedOptions}
        </div>
      )}
    </div>
  );
}

export default Profile;
