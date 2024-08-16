import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RegisterApi } from "../../utils/apis";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    const dataRegister = await RegisterApi(
      email,
      userName,
      password,
      confirmPassword
    );
    console.log("dataRegister", dataRegister);
    if (dataRegister) {
      alert("Register successfully");
      navigate("/signin");
    }
  };
  return (
    <section className="bg-[#3BD9A2] min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#27452C]">Sign Up</h2>
          {/* <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p> */}

          <div className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 rounded-xl border"
              type="text"
              name="username"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {showConfirmPassword ? (
                <FaEyeSlash
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
            <button
              className="bg-[#31985A] rounded-xl text-white py-2 hover:scale-105 duration-300"
              onClick={() => handleRegister()}
            >
              Register
            </button>
          </div>

          <div className="mt-4 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <FcGoogle className="mr-3" size={25} />
            Login with Google
          </button>

          <div className="text-xs border-b border-[#002D74] py-4 text-[#002D74]"></div>

          <div className="mt-2 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <NavLink to="/signin">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 hover:bg-[#2DB78D] hover:text-[#FCFCFC]">
                Sign In
              </button>
            </NavLink>
          </div>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Login"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
