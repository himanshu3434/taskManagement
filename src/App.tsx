import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./component/header";
import Signup from "./component/Signup";
import Login from "./component/Login";

import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./api/userApi";
import AuthLayout from "./component/AuthLayout";
import { login, logout } from "./features/authSlice";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "./store/Store";

import axios from "axios";
import Home from "./component/Home";

function App() {
  const dispatch = useDispatch();

  const userStatus = useSelector((state: RootState) => state.auth.status) as
    | boolean
    | false;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    getCurrentUser().then((user) => {
      if (user.data.success) {
        const userData = user.data.data.user;

        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="">
      <Header />

      <div>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <AuthLayout userStatus={userStatus}>
                  <Home />
                </AuthLayout>
              }
            />
          </Routes>

          <Routes>
            <Route
              path="/login"
              element={
                <AuthLayout userStatus={userStatus}>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthLayout userStatus={userStatus}>
                  <Signup />
                </AuthLayout>
              }
            />
          </Routes>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default App;
