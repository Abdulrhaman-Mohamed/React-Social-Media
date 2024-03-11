import React, { forwardRef } from "react";

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
} from "@material-tailwind/react";

//Heroicons
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/TimeAgo";

const PostCard = forwardRef(({post , userId},ref)=> {
  // console.log(post);
// console.log({postUSer:post.user , user:userId  });

// console.log(Date.parse(post.createdDate));

  const content = (
    <>
         <div className=" flex justify-between items-center">
        <div className=" flex gap-2">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-2.jpg"
            alt="avatar"
          />
          <Typography variant="h6" as={"p"}>
            Ahmed Ali
            {/* <span className=" block text-gray text-sm">{timeAgo.format(Date.now() - (Date.parse(post.createdDate)/1000)/1000 ) }</span> */}
            <span className=" block text-gray text-sm">{timeAgo.format(Date.parse(post.createdDate))}</span>


          </Typography>
        </div>
        <div className={post.user === userId? "inline-block":"hidden"}>
        <Menu>
          <MenuHandler>
            <IconButton variant="text">
              <AdjustmentsHorizontalIcon className="text-black h-6 w-6" />
            </IconButton>
          </MenuHandler>
          <MenuList>
          <Link to={`/update-post/${post._id}`}><MenuItem>Edit</MenuItem></Link>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
        </div>
        
      </div>

      <Typography className=" text-black/50">
        {post.description}
      </Typography>

      <img
      className="h-96 w-full rounded-lg object-cover object-center "
      src={post.payload}
      alt="nature image"
    />
    </>
  )
  return (
    <>
    {
      ref? (
        <div ref={ref}  className="w-full md:w-[450px] flex flex-col gap-2 p-4  rounded-lg shadow-md shadow-blue-gray-900/20">
          {content}
        </div>
      ):<div  className="w-full md:w-[450px] flex flex-col gap-2 p-4  rounded-lg shadow-md shadow-blue-gray-900/20">
        {content}
      </div>
    }

    </>


  );
})

export default PostCard;