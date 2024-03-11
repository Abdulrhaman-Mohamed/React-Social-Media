

//Metrail
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,    
  } from "@material-tailwind/react";


  //Icons
  import {
    RectangleStackIcon,
    ChatBubbleOvalLeftIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import useAuth from "../hooks/useAuth";

   
  export function SideBar() {

    const{removeToken}=useAuth();


    return (
        <>
        <Card className="h-[calc(100vh-2rem)] w-[260px] fixed max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 lg:inline-block hidden">
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
      </Card>
        </>
   
    );
  }