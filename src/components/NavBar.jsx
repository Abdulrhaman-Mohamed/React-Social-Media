import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

// Metrail Tailwind

import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  HomeIcon,
  VideoCameraIcon,
  UserIcon,
  InboxIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import SilderBar from "./SilderBar";
import useAuth from "../hooks/useAuth";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { removeToken, getFromLocalStorage } = useAuth();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 px-0.5 "
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-secondary"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          return (
            <MenuItem
              key={key}
              onClick={
                key === profileMenuItems.length - 1 ? removeToken : closeMenu
              }
              className={`flex items-center gap-2 rounded ${"hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 active:bg-secondary/10  "}`}
            >
              {key === 0 ? (
                <Link to={`/profile-user/${getFromLocalStorage()?._id}`} className=" flex items-center gap-2">
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${
                      key === profileMenuItems.length - 1
                        ? "text-red-500"
                        : "text-secondary/50"
                    }`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className={`font-normal ${
                      key === profileMenuItems.length - 1 ? "text-red-500" : ""
                    }`}
                  >
                    {label}
                  </Typography>
                </Link>
              ) : (
                <>
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${
                      key === profileMenuItems.length - 1
                        ? "text-red-500"
                        : "text-secondary/50"
                    }`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className={`font-normal ${
                      key === profileMenuItems.length - 1 ? "text-red-500" : ""
                    }`}
                  >
                    {label}
                  </Typography>
                </>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
  },
  {
    label: "Videos",
    icon: VideoCameraIcon,
  },
  {
    label: "User",
    icon: UserIcon,
  },
  {
    label: "Inbox",
    icon: InboxIcon,
  },
];

function NavList() {
  return (
    <ul className="flex  gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, key) => (
        <Link to="/" key={key}>
          <Typography
            variant="small"
            color="gray"
            className="font-medium cursor-pointer hover:text-secondary/50 transition-all duration-200"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full text-secondary hover:bg-secondary/10">
              {React.createElement(icon, {
                className: "h-[18px] w-[18px] text-secondary",
              })}{" "}
            </MenuItem>
          </Typography>
        </Link>
      ))}
    </ul>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <Navbar className="mx-auto w-full max-w-full  p-2  lg:pl-6">
        <div className="relative mx-auto flex justify-around items-center text-blue-gray-900">
          <div>
            <IconButton
              onClick={openDrawer}
              className=" lg:hidden"
              variant="text"
            >
              <Bars3Icon className="h-6 w-6 text-black" />
            </IconButton>
            <Link
              to="/"
              className=" inline-block  cursor-pointer py-1.5 font-semibold text-secondary hover:bg-secondary/10 rounded-full p-3"
            >
              Social
            </Link>
          </div>

          <NavList />

          <ProfileMenu />
        </div>
      </Navbar>
      <SilderBar open={open} closeDrawer={closeDrawer} />
    </>
  );
}
