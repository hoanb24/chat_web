import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaUser,
  FaPhone,
  FaVideo,
  FaInfoCircle,
  FaSmile,
  FaPaperPlane,
} from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";

import ChatDetail from "../components/ChatDetail";

import { getAllUser, LogOutApi } from "../../utils/apis";

const Chat = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  const [dataAllUsers, setDataAllUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleLogout = async () => {
    const tokenCookie = Cookies.get("token");
    if (tokenCookie) {
      const tokenData = JSON.parse(tokenCookie);
      const accessToken = tokenData.accessToken;

      alert("Logout successfully");
      await LogOutApi(accessToken);
      Cookies.remove("token");
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const userData = Cookies.get("token");
        const parsedUserData = JSON.parse(userData);
        const response = await getAllUser(parsedUserData.accessToken);
        setDataAllUsers(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchDataUser();
  }, []);

  return (
    <div className="container mx-auto shadow-lg rounded-lg h-screen w-screen flex flex-col">
      {/* Header */}
      <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2 relative">
        <div className="font-semibold text-2xl">Chat Web</div>
        <div
          className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center cursor-pointer"
          onClick={() => setShowLogout((prev) => !prev)}
        >
          <FaUser />
        </div>
        {showLogout && (
          <button
            className="absolute top-14 right-5 bg-white border border-gray-300 rounded-lg py-2 px-4 flex items-center"
            onClick={() => handleLogout()}
          >
            <BiLogOut className="mr-2" /> Đăng xuất
          </button>
        )}
      </div>
      {/* End header */}
      {/* Chatting */}
      <div className="flex flex-row justify-between bg-white flex-grow overflow-hidden">
        {/* Chat list */}
        <div className="flex flex-col w-2/5 border-r-2 h-screen">
          {/* Search component */}
          <div className="sticky top-0 bg-white z-10 border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="Search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>
          {/* End search component */}
          {/* User list */}
          <div className="overflow-y-auto flex-grow">
            {dataAllUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => handleSelect(index)}
                className={`flex flex-row py-4 px-2 items-center border-b-2 cursor-pointer ${
                  index === selectedIndex ? "border-l-4 border-blue-400" : ""
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                <div className="w-1/4">
                  <img
                    src={user.image}
                    className="object-cover h-12 w-12 rounded-full hidden lg:block"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold">{user.name}</div>
                  <span className="text-gray-500">{user.message}</span>
                </div>
              </div>
            ))}
          </div>
          {/* End user list */}
        </div>
        {/* End chat list */}
        {/* Message Component */}
        {dataAllUsers[selectedIndex] && (
          <ChatDetail
            avatar={dataAllUsers[selectedIndex].image}
            name={dataAllUsers[selectedIndex].name}
            id={dataAllUsers[selectedIndex]._id}
          />
        )}
        {/* End Message Component */}
      </div>
    </div>
  );
};

export default Chat;
