import React, { forwardRef, useState } from "react";

//Metrail Tailwind
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

//Heroicons
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

import { Link ,useNavigate } from "react-router-dom";

import { timeAgo } from "../utils/TimeAgo";

import { api } from "../api/axios";




const PostCard = forwardRef(({ post, userId }, ref) => {
  const [openDialog, setOpenDialog] = useState(false);
  // console.log(post);
  // console.log({postUSer:post.user , user:userId  });

  // console.log(Date.parse(post.createdDate));

  const navigate = useNavigate();


  //hander Open Dialog
  const dialogHandler = () => setOpenDialog(!openDialog);
  // delete Request
  const deletePost=async(id)=>{
    // console.log(id);
    try {
      const delete_ = await api.delete(`post/${id}`);
      if(delete_.status === 200) navigate(0);
    } catch (error) {
      console.log(error);
    }
  }

  const content = (
    <>
      <div className=" flex justify-between items-center">
        <div className=" flex gap-2">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
          <Typography variant="h6" as={"p"}>
            {post.user.username}
            {/* <span className=" block text-gray text-sm">{timeAgo.format(Date.now() - (Date.parse(post.createdDate)/1000)/1000 ) }</span> */}
            <span className=" block text-gray text-sm">
              {timeAgo.format(Date.parse(post.createdDate))}
            </span>
          </Typography>
        </div>
        <div className={post.user._id === userId ? "inline-block" : "hidden"}>
          <Menu>
            <MenuHandler>
              <IconButton variant="text">
                <AdjustmentsHorizontalIcon className="text-black h-6 w-6" />
              </IconButton>
            </MenuHandler>
            <MenuList>
              <Link to={`/update-post/${post._id}`}>
                <MenuItem>Edit</MenuItem>
              </Link>
              <MenuItem onClick={dialogHandler}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>

      <Typography className=" my-2 ml-1 text-black/50">
        {post.description}
      </Typography>
      {post.payload && (
        <img
          className="h-96 w-full rounded-lg object-cover object-center "
          src={post.payload}
          alt="nature image"
        />
      )}

      <Dialog
        open={openDialog}
        handler={dialogHandler}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Delete Your Post Confirmation</DialogHeader>
        <DialogBody>Are You Sure For delete This is Post ?</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={dialogHandler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="red" onClick={()=>deletePost(post._id)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
  return (
    <>
      {ref ? (
        <div
          ref={ref}
          className="w-full md:w-[450px] flex flex-col gap-2 p-4  rounded-lg shadow-md shadow-blue-gray-900/20"
        >
          {content}
        </div>
      ) : (
        <div className="w-full md:w-[450px] flex flex-col gap-2 p-4  rounded-lg shadow-md shadow-blue-gray-900/20">
          {content}
        </div>
      )}
    </>
  );
});

export default PostCard;
