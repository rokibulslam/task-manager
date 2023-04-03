import { getBase64 } from "../../helper/FormHelper";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useAddUserMutation } from "../../redux/features/user/registerSlice";
import { toast } from "react-hot-toast";
import LazyLoader from "../../components/Dashboard/LazyLoader";

const Register = () => {
     const [imgSize, setImgSize] = useState(true);
     const [pasError, setPassError] = useState("");
     const MAX_FILE_SIZE = 1 * 1024 * 1024;
     const [registerUser, { error, isLoading, isSuccess }] =
       useAddUserMutation();
     const {
       register,
       handleSubmit,
       control,
       formState: { errors },
     } = useForm();

     const onSubmit = async (data) => {
       if (data.password !== data.confirmPass) {
         setPassError("Password dose not match");
         return;
       }
       if (data.myFile.size > MAX_FILE_SIZE) {
         setImgSize(false);
         return;
       }

       const photo = await getBase64(data.myFile);

       const user = {
         email: data.email,
         firstName: data.firstName,
         lastName: data.lastName,
         mobile: data.mobile,
         password: data.password,
         photo: photo,
       };
       registerUser(user);
     };
     useEffect(() => {
       if (error) {
         console.log(error);
         toast.error(`${error.data}`);
         setImgSize(true);
         setPassError("");
       }
       if (isSuccess) {
         toast.error("Register Success");
         setImgSize(true);
         setPassError("");
       }
     }, [error, isSuccess, isLoading]);
  return (
    <div className="min-h-screen flex justify-center items-center ">
      {isLoading && <LazyLoader />}
      <div className="login-form">
        <h1 className="text-center font-bold text-3xl text-gray-600">
          Registration Form
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-5 my-5"
        >
          {/* First Name & Last Name */}
          <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
            <div>
              <input
                className="login-input neumorphic-input"
                type="text"
                placeholder="First name"
                {...register("firstName", {
                  required: "This is required message",
                  maxLength: 80,
                })}
              />

              {errors.firstName?.type === "required" && (
                <p className="text-xs text-red-600" role="alert">
                  First name is required
                </p>
              )}
            </div>
            <div>
              <input
                className="login-input neumorphic-input"
                type="text"
                placeholder="Last Name"
                {...register("lastName", { required: true, maxLength: 100 })}
              />

              {errors.lastName?.type === "required" && (
                <p className="text-xs text-red-600" role="alert">
                  Last name is required
                </p>
              )}
            </div>
          </div>
          {/* Mobile & Email */}
          <div className="flex items-center gap-5 flex-col md:flex-row ">
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

            <div>
              {" "}
              <input
                className="login-input neumorphic-input"
                type="number"
                placeholder="Mobile number"
                {...register("mobile", {
                  required: true,
                })}
              />
              {errors.mobile?.type === "required" && (
                <p className="text-xs text-red-600" role="alert">
                  Mobile Number is required
                </p>
              )}
            </div>
          </div>
          {/* Password */}
          <div className="flex items-center gap-5 flex-col md:flex-row ">
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
            <div>
              <input
                className="login-input neumorphic-input"
                type="password"
                placeholder="Re-Type Your Password"
                {...register("confirmPass", {
                  required: true,
                })}
              />
              {errors.confirmPass?.type === "required" && (
                <p className="text-xs pt-3 text-red-600" role="alert">
                  Required Password
                </p>
              )}
              <p className="text-xs text-red-600">
                {pasError === "" ? "" : "Password Does not match"}
              </p>
            </div>
          </div>
          <Controller
            name="myFile" // Set the name of the field
            control={control}
            render={({ field: { onChange } }) => (
              <input
                className="login-input neumorphic-input"
                type="file"
                onChange={(e) => onChange(e.target.files[0])}
              />
            )}
          />
          <p className="text-xs text-red-600">
            {imgSize ? "Max Size should be 1mb" : "Your file exceed file limit"}
          </p>
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Register