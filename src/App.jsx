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
                <QueryClientProvider client={queryClient} >
                <RequiredAuth>
                  <ProfileUser />
                </RequiredAuth>
                </QueryClientProvider>
              }
            />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
