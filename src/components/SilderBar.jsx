import React, { useState } from 'react'


import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import useAuth from '../hooks/useAuth';

export default function SilderBar(props) {

  const {open ,closeDrawer} = props

  const{removeToken}= useAuth()


  return (
    <>
        <Drawer open={open} onClose={closeDrawer} >
        <div className="mb-2 p-4">
          <Typography variant="h5" className="text-secondary">
            Social
          </Typography>
        </div>
        <List className="">
          <ListItem>
            <ListItemPrefix>
              <RectangleStackIcon className="h-5 w-5" />
            </ListItemPrefix>
            Reals
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            </ListItemPrefix>
            Chat
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue" className="rounded-full" />
            </ListItemSuffix>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={removeToken} className=" text-red-500/50 hover:bg-red-500/10 hover:text-red-500">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
        </Drawer>
    </>
  )
}
