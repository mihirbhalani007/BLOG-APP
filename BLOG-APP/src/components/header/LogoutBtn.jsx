import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import { Modal } from "../index";

function LogoutBtn() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
    setShowModal(false);
  };

  const actionBar = (
    <div>
      <button
        onClick={logoutHandler}
        className="bg-red-500 text-white hover:bg-red-700 transition duration-300 ease-in-out py-2 px-4 rounded shadow-lg"
      >
        Logout
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
        className="inline-block px-6 py-2 duration-200 text-black font-medium hover:bg-red-500 hover:text-white rounded-full"
        onClick={handleClick}
      >
        Logout
      </button>
      {showModal && modal}
    </div>
  );
}

export default LogoutBtn;
