import React from "react";

import { useForm } from "react-hook-form";

import {
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useOutletContext } from "react-router-dom";

export default function Account() {
    const {userData} = useOutletContext();
    // console.log(useOutletContext());


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className=" h-[90vh]">
      <Typography
        variant="h2"
        as={"h3"}
        className="my-3 mx-3 md:mx-0"
        color="blue"
      >
        Edit Account
      </Typography>
      <form
        className=" md:w-4/5 flex flex-col justify-around items-center h-3/4 mx-3 w-11/12 md:mx-0 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full">
          <Input
            variant="standard"
            color="blue"
            type="email"
            label="Email"
            placeholder="Example@Example.com"
            {...register("email", { required: "This is required" , value: userData.email})}
            error={!!errors.email}
          />
          {errors.email && (
            <Typography
              as={"span"}
              variant="small"
              className="my-2"
              color="red"
            >
              {errors.email.message}
            </Typography>
          )}
        </div>

        <div className=" w-full">
          <Input
            variant="standard"
            color="blue"
            label="Username"
            type="text"
            placeholder="Ahmed Mohamed"
            {...register("username", {
              required: "This is required",
              maxLength: 20,
              minLength: 3,
                value: userData.username
            })}
            error={!!errors.username}
          />
          {errors.username && (
            <Typography
              as={"span"}
              variant="small"
              className="my-2"
              color="red"
            >
              {errors.username.message}
            </Typography>
          )}
        </div>
        <div className=" w-full">
          <Input
            variant="standard"
            color="blue"
            label="Password"
            type="password"
            placeholder="********"
            {...register("password", {
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Password must contain at least 8 characters, including UPPER/lowercase and numbers",
              },
            })}
            error={!!errors.password}
          />
          
          {errors.password && (
            <Typography
              as={"span"}
              variant="small"
              className="my-2"
              color="red"
            >
              {errors.password.message}
            </Typography>
          )}
        </div>
        <div className=" w-full">
          <Input
            variant="standard"
            color="blue"
            label="confirm password"
            type="password"
            placeholder="********"
            {...register("confirm password", { validate: (value) => value === watch("password") || "The passwords do not match"})}
            error={!!errors["confirm password"]}
          />
          {errors["confirm password"] && (
            <Typography
              as={"span"}
              variant="small"
              className="my-2"
              color="red"
            >
              {errors["confirm password"].message}
            </Typography>
          )}
        </div>
        <div className="flex w-max gap-4">
          <Button type="reset" variant="outlined" color="blue">
            Reset
          </Button>
          <Button type="submit" variant="filled" color="blue">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
