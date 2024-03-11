import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import SignUp from "./SignUp";


// Material Tailwind
import { Button } from "@material-tailwind/react";

// React Hook Form
import { useForm } from "react-hook-form"





import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api_v2 } from "../../api/axios";
import useAuth from "../../hooks/useAuth";




export default function SignIn() {
  const [loadingSubmit , setLoadingSubmit] = useState(false)
  const navigate = useNavigate();
  const {setToLocalStorage} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) =>{


    const login = async()=>{
      try
      {
        setLoadingSubmit(true)
        const response = (await api_v2.post("/login",data)).data
        console.log(response);
        setToLocalStorage(response.token)
        setLoadingSubmit(false)

        toast.success("Login successfully 💙",{
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          transition: Bounce
        })

        setTimeout(()=>{
          navigate("/")
        },2500)


      }catch(error){

        setLoadingSubmit(false)
        if(error.response.status === 400){
          toast.error("Invalid Credentials 😢",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Bounce
          })
        }else{
          toast.error("Failed in Login Proccess 🛠",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            transition: Bounce
          })
        }
 

        console.log(error);
      }
    }
    
    if(data) login();
    

    // toast.error("Invalid email or password",{
    //   position: "top-left",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   transition: Bounce
    // })
    
  } 


  return (
    <>
      <div className=" flex bg-secondary bg-opacity-80 h-screen overflow-hidden justify-center gap-4 ">
        <div className=" w-full h-full md:w-1/2 flex items-center justify-center m-auto ">

        <form action="" onSubmit={handleSubmit(onSubmit)} className="text-white md:bg-[#ffffff00] w-4/5 md:text-black  h-1/2  m-auto rounded p-4 flex flex-col">
            <h1 className=" font-bold text-4xl w-11/12 m-auto text-white">Welcome back! </h1>
            <div className=" w-11/12 m-auto">
                <label htmlFor="email" className=" block mb-1">Email</label>
                <input type="text" name="email" className=" w-full rounded focus:outline-none py-1 px-2" {...register("email",{
                  required: "*Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "*Invalid email address"
                  }
                })}  />
                <span className=" text-xs text-yellow-300 ">
                  {errors.email && errors.email.message}
                </span>
            </div>

            <div className=" w-11/12 m-auto">
                <label htmlFor="password"className=" block">Password</label>
                <input type="password" name="password" className=" w-full rounded focus:outline-none py-1 px-2" {...register("password",{
                  required: "*Password is required",
                  minLength: {
                    value: 6,
                    message: "*must be at least 6 characters"
                  },
                  maxLength: {
                    value: 20,
                    message: "*must not exceed 20 characters"
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message: "*must contain at least one letter and one number"
                  }
                })}  />
                  <span className=" text-xs text-yellow-300   my-1 inline-block">
                  {errors.password && errors.password.message}
                </span>
              </div>

            <div className="w-11/12 m-auto">
            <Button type="submit"  loading={loadingSubmit} variant="outlined" color="white" className=" hover:bg-white hover:text-black" fullWidth>Login</Button>
                {/* <button type="submit" className=" w-full border-2 rounded py-1  bg-white border-gray hover:bg-transparent hover:text-white transition-all ">Login</button> */}
            </div>

            <p className=" text-white w-11/12 m-auto text-sm">
                If you haven't account you can register from here
                {/* <span className=" inline-block ml-2  font-bold underline">
                        Register
                    </span> */}
                 <Link to="/sign-up">
                 <span className=" inline-block ml-2   font-bold underline hover:text-blue-gray-200 transition-all">
                        Register
                    </span> 
                 </Link> 
            </p>
        </form>
        </div>
        <div className=" hidden md:inline-block md:w-1/2">
            <img src="\Images\signUp.jpg" alt="" className=" w-full h-full object-cover " />
        </div>
      </div>


      <ToastContainer />
    </>
  );
}
