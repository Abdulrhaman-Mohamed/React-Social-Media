import React, { useState } from "react";

import { Link, Navigate } from "react-router-dom";

//Toastfy
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Material Tailwind
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Radio,
} from "@material-tailwind/react";

// React Hook Form
import { useForm } from "react-hook-form";
import { api_v2 } from "../../api/axios";

export default function SignUp() {

  const[loadingSubmit , setLoadingSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const onSubmit = (data) => {
    
    console.log(data);
    const signUp = async()=>{
      try
      {
        setLoadingSubmit(true)
        const response = (await api_v2.post("/signup",data)).data
        console.log(response);
        setLoadingSubmit(false)

        toast.success("Register Successfully",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Bounce
        })
      }catch(error){
        setLoadingSubmit(false)
        toast.error("Failed in Registration",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Bounce
        })
        console.log(error);
      }
    }
    signUp();
  };

  return (
    <>
      <div className=" flex bg-secondary bg-opacity-80 h-screen overflow-hidden justify-center gap-4 ">
        <div className=" hidden md:inline-block md:w-1/2">
          <img
            src="\Images\Login-3.jpg"
            alt=""
            className=" w-full h-full object-cover "
          />
        </div>

        <div className="  h-full md:w-1/2 flex items-center justify-center m-auto ">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="  md:text-black  m-auto rounded p-4 w-4/5 flex flex-col gap-3"
          >
            <div className="mb-4">
              <Typography variant="h4" color="white" className="w-11/12 m-auto">
                Sign Up
              </Typography>
              <Typography className="font-normal w-11/12 m-auto text-brown-50">
                Nice to meet you! Enter your details to register.
              </Typography>
            </div>

            {/* Username */}
            <div className=" w-11/12 m-auto">
              <label htmlFor="username" className=" text-white block mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                className=" w-full rounded focus:outline-none py-1 px-2"
                {...register("username", {
                  required: "*Username is required",
                  minLength: {
                    value: 3,
                    message: "*must be at least 3 characters",
                  },
                })}
              />
              <span className=" text-xs  text-yellow-300">
                {errors.username && errors.username.message}
              </span>
            </div>

            {/* Email */}
            <div className=" w-11/12 m-auto">
              <label htmlFor="email" className="text-white block mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                className=" w-full rounded focus:outline-none py-1 px-2"
                {...register("email", {
                  required: "*Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "*Invalid email address",
                  },
                })}
              />
              <span className=" text-xs  text-yellow-300">
                {errors.email && errors.email.message}
              </span>
            </div>

            {/* Password */}
            <div className=" w-11/12 m-auto">
              <label htmlFor="password" className="text-white block">
                Password
              </label>
              <input
                type="password"
                name="password"
                className=" w-full rounded focus:outline-none py-1 px-2"
                {...register("password", {
                  required: "*Password is required",
                  minLength: {
                    value: 6,
                    message: "*must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "*must not exceed 20 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message: "*must contain at least one letter and one number",
                  },
                })}
              />
              <span className=" text-xs text-yellow-300  inline-block">
                {errors.password && errors.password.message}
              </span>
            </div>

            {/* gender */}
            <div className="w-11/12 m-auto flex-col">
              <label htmlFor="gender" className=" text-white block mb-1">
                Gender
              </label>
              <div className="flex gap-3 ">
                <Radio
                  name="gender"
                  label="Male"
                  value="male"
                  {...register("gender",{required:"*Gender is required"})}
                  icon={
                    <svg
                      width={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      transform="rotate(0)"
                    >
                      <path
                        d="M12.6066 10.8388C10.654 8.88621 7.48813 8.88621 5.53551 10.8388C3.58289 12.7915 3.58289 15.9573 5.53551 17.9099C7.48813 19.8625 10.654 19.8625 12.6066 17.9099C14.5592 15.9573 14.5592 12.7915 12.6066 10.8388ZM12.6066 10.8388L15.435 8.01041L17.9099 5.53553M17.9099 5.53553V10.4853M17.9099 5.53553H12.9601"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />

                <Radio
                  name="gender"
                  label="Female"
                  value="female"
                  {...register("gender",{required:"*Gender is required"})}
                  icon={
                    <svg
                      width={13}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20 9C20 13.0803 16.9453 16.4471 12.9981 16.9383C12.9994 16.9587 13 16.9793 13 17V19H14C14.5523 19 15 19.4477 15 20C15 20.5523 14.5523 21 14 21H13V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V21H10C9.44772 21 9 20.5523 9 20C9 19.4477 9.44772 19 10 19H11V17C11 16.9793 11.0006 16.9587 11.0019 16.9383C7.05466 16.4471 4 13.0803 4 9C4 4.58172 7.58172 1 12 1C16.4183 1 20 4.58172 20 9ZM6.00365 9C6.00365 12.3117 8.68831 14.9963 12 14.9963C15.3117 14.9963 17.9963 12.3117 17.9963 9C17.9963 5.68831 15.3117 3.00365 12 3.00365C8.68831 3.00365 6.00365 5.68831 6.00365 9Z"
                        fill="#ffffff"
                      />
                    </svg>
                  }
                />
              </div>
              <span className=" text-xs text-yellow-300  inline-block">
                {errors.gender && errors.gender.message}
              </span>
            </div>

            <div className="w-11/12 m-auto">
              <Button
                type="submit"
                variant="outlined"
                color="white"
                loading={loadingSubmit}
                className=" hover:bg-white hover:text-black"
                fullWidth
              >
                Submit
              </Button>
              {/* <button type="submit" className=" w-full border-2 rounded py-1  bg-white border-gray hover:bg-transparent hover:text-white transition-all ">Login</button> */}
            </div>

            <p className="text-white w-11/12 m-auto text-sm">
              If you have Account already?
              <Link to="/sign-in">
                <span className=" inline-block ml-2  font-bold underline hover:text-blue-gray-200 transition-all">
                  Login
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer />

    </>
  );
}
