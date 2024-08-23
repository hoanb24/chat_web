import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { LoginApi } from "../../utils/apis";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const dataLogin = await LoginApi(email, password);
      console.log("dataLogin", dataLogin);

      if (dataLogin.message !== "Password is incorrect") {
        alert("Login successfully!");
        Cookies.set(
          "token",
          JSON.stringify({
            accessToken: dataLogin.data.accessToken,
          }),
          { expires: 7 }
        );
        navigate("/chat");
      } else {
        alert(dataLogin.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };

  return (
    <section className="bg-[#3BD9A2] min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#27452C]">Sign In</h2>

          <div className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
            <button
              className="bg-[#31985A] rounded-xl text-white py-2 hover:scale-105 duration-300"
              onClick={() => handleLogin()}
            >
              Login
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
            <FcGoogle className="mr-3" size={25} />
            Login with Google
          </button>

          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Don't have an account?</p>
            <NavLink to="/signup">
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 hover:bg-[#2DB78D] hover:text-[#FCFCFC]">
                Sign Up
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

export default Login;
