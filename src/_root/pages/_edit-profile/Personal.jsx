import React from "react";

import {
  Avatar,
  Input,
  Select,
  Option,
  Typography,
  Textarea,
  Button
} from "@material-tailwind/react";

export default function Personal() {
  return (
    <form className=" md:w-4/5 flex flex-col justify-around h-full mx-3 w-11/12 md:mx-0 gap-3 md:gap-0 my-4">
      <div className=" w-full flex justify-center">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="xxl"
        />
      </div>

      <div className=" w-full my-2">
      <Textarea variant="standard" label="Bio" color="blue" />
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
            />
          </div>
          <div className=" w-full md:w-5/12">
            <Input
              variant="standard"
              color="blue"
              type="text"
              label="Education"
              placeholder="Like 'University of California'"
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
            />
          </div>
          <div className=" w-full md:w-5/12">
            <Input
              variant="standard"
              color="blue"
              type="text"
              label="City"
              placeholder="Like 'Cairo'"
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <Typography variant="h4" as={"h4"} className="my-2 underline">
          Relationship
        </Typography>
        <Select variant="standard" label="Select Relational">
          <Option>Married</Option>
          <Option>Single</Option>
        </Select>
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
  );
}
