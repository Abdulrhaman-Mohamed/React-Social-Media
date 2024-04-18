import React, { useEffect, useState } from 'react'

import { useParams ,useNavigate} from 'react-router-dom';


import {api} from '../../api/axios'


import { useForm } from "react-hook-form";

import {
  Textarea,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";

import { TrashIcon } from "@heroicons/react/24/solid";
import { UplaodFile } from '../../utils/UplaodFilesFireBase';
import { useDispatch, useSelector } from 'react-redux';

export default function UpdatePost() {
  // States
  const postRedux = useSelector(state => state.selectedPost);
  const[post , setPost] =useState(postRedux);
  const [file, setFile] = useState(null);
  const[loading , setLoading] = useState(false);



// console.log(post);

// {
//   createdDate
// : 
// "2024-04-18T10:16:54.768Z"
// description
// : 
// "test2"
// user
// : 
// {_id: '661e60e01557b6b4ae2a0802', username: 'Abdelrhamam204'}
// _id
// : 
// "6620f3164d3bed81cd9a4e12"
// }


  const {id} = useParams();

    // navigate Hook from React Router Hook
    const navigate = useNavigate();



  // Use Effect 
  //1- For fetch Post in loading page
  useEffect(()=>{
    const getPostById= async()=>{
      try{
        const post_ = (await api.get(`/post/${id}`)).data
        // console.log(post_);
        setPost({...post , ...post_.post})
      }catch(err){
        console.log(err);
      }
    }
    if(!Object.keys(post).length) getPostById();
  },[])

// change image 
  useEffect(() => {
    let fileReader = new FileReader();
    if (file) {
      fileReader.onload = (e) => {
        const { result } = e.target;
        setPost({...post , payload:result});
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);


    // React Hook Form
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();



    //handlers
    const submit = async () => {
      // console.log("Update .....");
      // console.log(file);
      setLoading(true)
      let UploadedImageURL="";
      if(file){
        
        UploadedImageURL = await UplaodFile(file);
        // setPost({...post , payload:UploadedImageURL})
        console.log(UploadedImageURL);
      }


      if(post.description){
        const updatePost =async()=>{
          setLoading(true)
          try {
            let updated;
            if(UploadedImageURL){
               updated = await api.put(`post/${post._id}`,{...post,payload:UploadedImageURL})
            }else{
              updated =await api.put(`post/${post._id}`,post)
            }

            setLoading(false);
            if(updated.status === 200) navigate("/")

          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        }

        updatePost()
      }

      // console.log(post);
    };


    const removeFile =()=>{
      setPost({...post,payload:""});
      setFile(null);
      // setFileDataURL(null);
    }

      // Handle Upload
  const handleUpload = (files) => {
    setFile(files[0]);
  };


  // console.log(post);




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
                  value={post.description}
                  onInput={(e)=>{setPost({...post,description:e.target.value})}}
                  color="blue"
                  label="Description"
                  name="description"
                  {...register("description")}
                />
                <span className=" text-xs text-red-500 ">
                  {errors.description && errors.description.message}
                </span>
              </div>

              {(post.payload && (
                <div className=" relative">
                  <img
                    className=" w-full rounded-lg"
                    src={post.payload}
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
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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
                Update Post
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
