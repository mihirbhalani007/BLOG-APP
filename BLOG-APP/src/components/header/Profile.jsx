import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Panel } from "../index";

function Profile({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target)) {
        setIsopen(false);
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
        className="flex items-center justify-between p-3 bg-white border rounded shadow cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{value?.label || "Select..."}</span>
        </div>
        <GoChevronDown className="text-lg" />
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
