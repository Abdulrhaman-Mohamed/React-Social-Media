import React, { useEffect, useState } from "react";

import {
  Avatar,
  Input,
  Typography,
  Textarea,
  Button,
} from "@material-tailwind/react";

//icons
import { CameraIcon } from "@heroicons/react/24/solid";

import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../api/axios";
import { UplaodFile } from "../../../utils/UplaodFilesFireBase";

export default function Personal() {
  const { userData } = useOutletContext();
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(userData.personalImage||"/Images/person.jpg");

  

  const mutation = useMutation({
    mutationKey:["updateProfile"],
    mutationFn: async (data) => {
      const {data_,userData,UploadedImageURL} = data;
      const response = await api.put(`/user`, {
        ...userData,
        ...data_,
        personalImage: UploadedImageURL || userData.image ,
      });
      return response.data;
    },
  });


  // console.log(userData);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data_) => {
    if (JSON.stringify(data_) !== JSON.stringify(userData)) {
      console.log(data_);
      let UploadedImageURL;
      if (file) {
        UploadedImageURL = await UplaodFile(file);
        console.log(UploadedImageURL);
      }

      mutation.mutateAsync({data_,userData,UploadedImageURL}).then((data) => {
        console.log("done" , data);
      } );
    }
  };

  // Handle Upload
  const handleUpload = (files) => {
    setFile(files[0]);
  };

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
    <form
      className=" md:w-4/5 flex flex-col justify-around h-full mx-3 w-11/12 md:mx-0 gap-3 md:gap-0 my-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className=" w-full flex justify-center">
        <label htmlFor="dropzone-file" className="cursor-pointer relative">
          <span className="absolute bottom-0 right-0 bg-gray rounded-full z-10 p-1">
            <CameraIcon className="h-7 w-7 text-secondary" />
          </span>
          <Avatar src={fileDataURL} alt="avatar" size="xxl" />
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />
        </label>
      </div>

      <div className=" w-full my-2">
        <Textarea
          variant="standard"
          label="Bio"
          color="blue"
          {...register("bio",{value:userData.bio})}
        />
      </div>
      <div>
        <Typography variant="h4" as={"h4"} className="my-2 underline">
          Job & Education
        </Typography>
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
          <div className="w-full md:w-5/12">
            <Input
              variant="standard"
              color="blue"
              type="text"
              label="Job Title"
              placeholder="Like 'Developer'"
              {...register("jobTitle" ,{value:userData.jobTitle})}
            />
          </div>
          <div className=" w-full md:w-5/12">
            <Input
              variant="standard"
              color="blue"
              type="text"
              label="Education"
              placeholder="Like 'University of California'"
              {...register("education",{value:userData.education})}
            />
          </div>
        </div>
      </div>

      <div>
        <Typography variant="h4" as={"h4"} className="my-2 underline">
          Location
        </Typography>
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-3">
          <div className="w-full md:w-5/12">
            <Input
              variant="standard"
              color="blue"
              type="text"
              label="Country"
              placeholder="Like 'Egypt'"
              {...register("conutry",{value:userData.conutry})}
            />
          </div>
          <div className=" w-full md:w-5/12">
            <Input
              variant="standard"
              color="blue"
              type="text"
              label="City"
              placeholder="Like 'Cairo'"
              {...register("location",{value:userData.location})}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Typography variant="h4" as={"h4"} className="my-2 underline">
          Relationship
        </Typography>
        <select
          variant="standard"
          label="Select Relational"
          className=" w-full  border-2 rounded p-2 cursor-pointer focus:border-secondary "
          {...register("relationahip",{value:userData.relationahip})}
        >
          <option value="none">None</option>
          <option value="married">Married</option>
          <option value="single">Single</option>
        </select>
      </div>

      <div className="flex w-max gap-4 my-4">
        <Button type="reset" variant="outlined" color="blue">
          Reset
        </Button>
        <Button type="submit" variant="filled" color="blue">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
