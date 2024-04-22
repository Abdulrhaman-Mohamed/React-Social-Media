import React from "react";
import NavBar from "../../components/NavBar";
import PostsContainer from "../../components/PostsContainer";
import { SideBar } from "../../components/SideBar";
import SilderBar from "../../components/SilderBar";

import { PlusIcon } from "@heroicons/react/24/solid";

import { IconButton } from "@material-tailwind/react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="relative">
        <SideBar />
        <PostsContainer />
        <div className="fixed right-2 bottom-2">
          <Link to="/create-post">
            <IconButton
              size="lg"
              variant="filled"
              className=" rounded-full bg-gray/55"
            >
              <PlusIcon className=" text-secondary h-7 w-7" />
            </IconButton>
          </Link>
        </div>
      </div>
    </>
  );
}
