import React from "react";

import { Avatar } from "@material-tailwind/react/components/Avatar";
import { Typography } from "@material-tailwind/react/components/Typography";

export default function ProfileDataImage() {
  return (
    <>
      {/* Images Profile here */}
      <div className="w-full relative mb-9">
        <img
          className="h-60 w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
          alt="nature image"
        />
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          size="xxl"
          withBorder
          color="white"
          className=" absolute bottom-[-20%] left-[7%]"
        />
      </div>

        {/* Profile Data */}
        <div className="px-2 lg:px-0">
            {/* Name */}
        <Typography variant="h2"  >John Doe</Typography>
            {/* Job */}
            <Typography  variant="lead" className="mb-2">Web Developer</Typography>
            {/* Bio */}
            <Typography variant="small">
        Material Tailwind is an easy to use components library for Tailwind CSS
        and Material Design. It provides a simple way to customize your
        components, you can change the colors, fonts, breakpoints and everything
        you need.
      </Typography>
        </div>
    </>
  );
}
