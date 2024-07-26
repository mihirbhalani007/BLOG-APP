import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../components/Modal";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showModal, setShowModal] = useState(true); // Initially show modal
  const navigate = useNavigate();
  const notify = () => toast.success("Password updated sucessfully !!");

  const handleClose = () => {
    console.log("Closing modal from UpdatePassword component");
    setShowModal(false);
  };

  const onCancel = () => {
    navigate("/all-posts");
  };

  const onSubmit = async (formData) => {
    try {
      const { password, oldPassword } = formData;

      if (password.length < 8 || password.length > 265) {
        throw new Error("Password must be between 8 and 265 characters long.");
      }

      console.log("Form Data:", formData);
      await authService.updatePassword(password, oldPassword);
      console.log("Password updated successfully");

      handleClose();
      notify();
      navigate("/all-posts");
    } catch (error) {
      console.error("Error in updating password", error);
    }
  };

  const actionBar = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <input
          type="password"
          placeholder="New Password"
          autoComplete="new-password"
          {...register("password", { required: true, minLength: 8 })}
          className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        />
        {errors.password && (
          <p>Password is required and must be at least 8 characters long</p>
        )}

        <input
          type="password"
          placeholder="Current Password"
          {...register("oldPassword")}
          className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        />

        <button
          type="submit"
          onClick={onSubmit}
          className="w-full bg-green-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-900 hover:text-gray-200 transition-colors duration-300"
        >
          Update Password
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-red-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-900 hover:text-gray-200 transition-colors duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div>
      {showModal && (
        <Modal onClose={handleClose} actionBar={actionBar}>
          <p>Enter new password</p>
        </Modal>
      )}
    </div>
  );
}
