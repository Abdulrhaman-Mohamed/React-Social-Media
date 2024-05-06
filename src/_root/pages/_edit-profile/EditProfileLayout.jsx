import React from "react";
import EditList from "../../../components/EditList";
import { Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

export default function EditProfile() {
  const { getFromLocalStorage } = useAuth();
  const userData = getFromLocalStorage();
  
  return (
    <>
      <div className=" w-full md:grid md:grid-cols-12">
        <div className=" md:col-span-8 md:order-2">
          <Outlet context={{userData}} />
        </div>
        <div className=" w-full md:col-span-4 md:order-1 my-8">
          <EditList />
        </div>
      </div>
    </>
  );
}
