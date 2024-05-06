import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import Home from "./_root/pages/Home";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import CreatePost from "./_root/pages/CreatePost";
import UpdatePost from "./_root/pages/UpdatePost";
import RequiredAuth from "./hoc/RequiredAuth";
import ProfileUser from "./_root/pages/ProfileUser";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/ReactQuery";
import EditProfile from "./_root/pages/_edit-profile/EditProfileLayout";
import Account from "./_root/pages/_edit-profile/Account";
import Personal from "./_root/pages/_edit-profile/Personal";

function App() {
  return (
    <>
      <main className=" h-screen">
        <Routes>
          {/* //using router Outlet */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          {/* // Wrap inside Component Required */}
          <Route element={<RootLayout />}>
            <Route
              path="/"
              element={
                <RequiredAuth>
                  <Home />
                </RequiredAuth>
              }
            />
            <Route
              path="/create-post"
              element={
                <RequiredAuth>
                  <CreatePost />
                </RequiredAuth>
              }
            />
            <Route
              path="/update-post/:id"
              element={
                <RequiredAuth>
                  <UpdatePost />
                </RequiredAuth>
              }
            />
            <Route
              path="/profile-user/:id"
              element={
                <QueryClientProvider client={queryClient}>
                  <RequiredAuth>
                    <ProfileUser />
                  </RequiredAuth>
                </QueryClientProvider>
              }
            />
            {/* <Route
              path="/profile-edit/:id"
              element={
                <QueryClientProvider client={queryClient}>
                  <RequiredAuth>
                    <Route element={<EditProfile />}>

                    </Route>
                  </RequiredAuth>
                </QueryClientProvider>
              }
            /> */}

            <Route element={<EditProfile />} path="/profile-edit/">
              <Route
                path="account"
                element={
                  <QueryClientProvider client={queryClient}>
                    <Account />
                  </QueryClientProvider>
                }
              />
              <Route
                path="personal"
                element={
                  <QueryClientProvider client={queryClient}>
                    <Personal />
                  </QueryClientProvider>
                }
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
