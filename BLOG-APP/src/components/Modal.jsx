// import { useEffect } from "react";
// import ReactDOM from "react-dom";

// function Modal({ onClose, children, actionBar }) {
//   useEffect(() => {
//     document.body.classList.add("overflow-hidden");

//     return () => {
//       document.body.classList.remove("overflow-hidden");
//     };
//   }, []);

//   const handleOverlayClick = (e) => {
//     console.log("Overlay clicked");
//     if (e.target === e.currentTarget) {
//       console.log("Closing modal");
//       onClose();
//     }
//   };

//   return ReactDOM.createPortal(
//     <div>
//       <div
//         onClick={handleOverlayClick}
//         className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
//       ></div>
//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <div
//           className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="flex flex-col justify-between h-full">
//             {children}
//             <div className="flex justify-end mt-4">{actionBar}</div>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.querySelector(".modal-container")
//   );
// }

// export default Modal;


import { useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose, children, actionBar }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleOverlayClick = (e) => {
    console.log("Overlay clicked:", e.target); // Debug line
    if (e.target === e.currentTarget) {
      console.log("Closing modal"); // Debug line
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={handleOverlayClick}
        className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
      ></div>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full"
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
        >
          <div className="flex flex-col justify-between h-full">
            {children}
            <div className="flex justify-end mt-4">{actionBar}</div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container") // Ensure this element exists
  );
}

export default Modal;
