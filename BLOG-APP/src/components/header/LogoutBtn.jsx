import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import { Modal } from "../index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast.error("Logout Sucessfull !!");

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCancelClick = () => {
    navigate("");
    handleClose();
  };

  const logoutHandler = () => {
    try {
      authService.logout().then(() => {
        dispatch(logout());
      });
      setShowModal(false);
    } finally {
      notify();
    }
  };

  const actionBar = (
    <div className="">
      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white hover:bg-red-700 transition duration-300 ease-in-out py-2 px-4 rounded shadow-lg m-2"
      >
        Logout
      </button>
      <button
        onClick={handleCancelClick}
        className="bg-yellow-500 text-black hover:bg-yellow-700 transition duration-300 ease-in-out py-2 px-4 rounded shadow-lg"
      >
        Cancel
      </button>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <p>Do you really wish to logout?</p>
    </Modal>
  );

  return (
    <div>
      <button
        className="inline-block px-6 py-2 duration-200 text-blue-800 font-medium hover:bg-red-500 hover:text-white rounded-full"
        onClick={handleClick}
      >
        Logout
      </button>
      {showModal && modal}
    </div>
  );
}

export default LogoutBtn;
