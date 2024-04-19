import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


import { useForm } from "react-hook-form";

import {
  Textarea,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import { TrashIcon } from "@heroicons/react/24/solid";
import { UplaodFile } from "../../utils/UplaodFilesFireBase";
import useAuth from "../../hooks/useAuth";
import { api } from "../../api/axios";
import { useDispatch } from "react-redux";
import { addPost } from "../../feature/post/postSlice";

export default function CreatePost() {
  // States
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const[loading , setLoading] = useState(false);
  const{getFromLocalStorage} = useAuth();



  //dispatch
  const dispatch = useDispatch();

  //userData
  const userData = getFromLocalStorage();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  //Use Auth For Get User Data
  const user = useAuth().getFromLocalStorage();
  // console.log(user);

  // navigate Hook from React Router Hook
  const navigate = useNavigate();

  // Handle Upload
  const handleUpload = (files) => {
    setFile(files[0]);
  };

  // Remove File
  const removeFile = () => {
    setFile(null);
    setFileDataURL(null);
  };

  const submit = async (data) => {
    setLoading(true)
    // console.log({data , file});
    let UploadedImageURL;
    if(file){
      UploadedImageURL = await UplaodFile(file);
      console.log(UploadedImageURL);
    }

    const postPostData=async()=>{
      setLoading(true)

      try {
        const post = await api.post("post",{
          description:data.description,
          payload:UploadedImageURL,
          user:user._id
        })

        // console.log(post);
        setLoading(false);
        //dispatch add post
        // dispatch(addPost())
        if(post.status === 201){
          dispatch(addPost({...post.data.post, user:{username:user.username, _id:user._id}}))
          navigate("/")
        } 
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

    }

    postPostData()
  };

  // Use Effect
  useEffect(() => {
    let fileReader = new FileReader();
    if (file) {
      fileReader.onload = (e) => {
        const { result } = e.target;
        setFileDataURL(result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <>
      <main className="">
        <div className="flex justify-center items-center py-8">
          <div className="w-1/2">
            <Typography variant="h3" color="blue" className=" mb-5">
              Create Post
              <Typography variant="small" color="gray" className=" text-gray">
                You Can Create Your own Post here!
              </Typography>
            </Typography>
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col gap-4 "
            >
              <div>
                <Textarea
                  variant="standard"
                  required
                  color="blue"
                  label="Description"
                  name="description"
                  {...register("description", {
                    required: "*Description is required",
                  })}
                />
                <span className=" text-xs text-red-500 ">
                  {errors.description && errors.description.message}
                </span>
              </div>

              {(fileDataURL && (
                <div className=" relative">
                  <img
                    className=" w-full rounded-lg"
                    src={fileDataURL}
                    alt="preview"
                  />
                  <Button
                    variant="text"
                    className=" w-full my-3  text-red-500 bg-black"
                    onClick={removeFile}
                  >
                    <TrashIcon className=" w-4 h-4 m-auto" />
                  </Button>
                </div>
              )) || (
                <div className="flex items-center justify-center w-full ">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-secondary/70"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <>
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center mx-1">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mx-1">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleUpload(e.target.files)}
                    />
                  </label>
                </div>
              )}

              <Button
              loading={loading}
                type="submit"
                className="bg-secondary text-white p-3 rounded-md font-bold"
              >
                Create Post
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
