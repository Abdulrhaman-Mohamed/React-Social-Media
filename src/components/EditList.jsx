import React from "react";

import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

import {
  RectangleStackIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function EditList() {
  return (
    <List className=" w-full  flex flex-row justify-evenly items-center bg-gray rounded-t-lg md:fixed md:block md:w-0 md:h-screen md:shadow-md  md:bg-transparent  ">
      <Link to="/profile-edit/account" >
        <ListItem>
          <ListItemPrefix className="w-full mr-0 md:mr-4 md:w-8">
            <RectangleStackIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Typography className="hidden md:block">Account</Typography>
        </ListItem>
      </Link>
      <Link to="/profile-edit/personal">
        <ListItem>
          <ListItemPrefix className="w-full mr-0 md:mr-4 md:w-8">
            <ChatBubbleOvalLeftIcon className="h-5 w-5 " />
          </ListItemPrefix>
          <Typography className="hidden md:block">Personal</Typography>
        </ListItem>
      </Link>
    </List>
  );
}
