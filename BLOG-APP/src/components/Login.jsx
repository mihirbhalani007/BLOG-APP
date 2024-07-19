import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { Loader } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.log("login full error ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[480px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full py-10 bg-gray-50">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg border border-gray-200 p-8 my-10">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-24">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-semibold mb-2 text-gray-800">
          Sign in to your account
        </h2>
        <p className="text-center text-base text-gray-600 mb-6">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mb-6 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-900 hover:text-gray-200 transition-colors duration-300"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
