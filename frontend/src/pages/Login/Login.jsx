import { getBase64 } from '../../helper/FormHelper';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { useAddUserMutation, useLoginUserMutation } from '../../redux/features/user/registerSlice';
import { toast } from 'react-hot-toast';
import LazyLoader from '../../components/Dashboard/LazyLoader';
import { useNavigate } from 'react-router-dom';
import { setToken, setUserDetails } from '../../helper/sessionHelper';

const Login = () => {
  const [loginUser, { error, isLoading, isSuccess, data }] = useLoginUserMutation()
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const user = {
    email:data.email,
    password:data.password,
    }
    loginUser(user)
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(`${error.data}`);
    }
    if (isSuccess) {
      toast.success("Login Success");
      navigate("/")
      console.log(data);
      setToken(data.token)
      setUserDetails(data.user)
    }
  },[error, isSuccess, isLoading])
  
  
  return (
    <div className="min-h-screen flex justify-center items-center ">
      {isLoading && <LazyLoader />}
      <div className="login-form">
        <h1 className="text-center font-bold text-3xl text-gray-600">
          Login Form
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-5 my-5"
        >
          {/* Mobile & Email */}
            <div>
              <input
                className="login-input neumorphic-input"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />

              {errors.email?.type === "required" && (
                <p className="text-xs text-red-600" role="alert">
                  {" "}
                  Email is required
                </p>
              )}

              {errors.email?.type === "pattern" && (
                <p className="text-xs text-red-600" role="alert">
                  Valid email is required
                </p>
              )}
            </div>
          {/* Password */}
          
            <div>
              <input
                className="login-input neumorphic-input"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-xs pt-3 text-red-600" role="alert">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-xs pt-3 text-red-600" role="alert">
                  Password Must be 6 charecter
                </p>
              )}
            </div>
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login
