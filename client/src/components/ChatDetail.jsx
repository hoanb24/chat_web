// ChatDetail.js
import React, { useState, useEffect } from "react";
import {
  FaSmile,
  FaPaperPlane,
  FaPhone,
  FaVideo,
  FaInfoCircle,
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Cookies from "js-cookie";

import { getMessage } from "../../utils/apis";

const ChatDetail = ({ avatar, name, id }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const getUserIdFromCookie = () => {
    // Retrieve the cookie value
    const userData = Cookies.get("userData");

    // Check if cookie exists
    if (userData) {
      // Parse the JSON string to an object
      const userObject = JSON.parse(userData);

      // Access the user ID
      const userId = userObject.id;

      // Log or use the user ID as needed
      console.log("User ID from cookie:", userId);

      return userId;
    } else {
      console.log("No userData cookie found");
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const senderId = getUserIdFromCookie();
        const data = await getMessage(senderId, id);
        console.log("data message", id);

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full px-5 flex flex-col justify-between">
      {/* Chat Header */}
      <div className="sticky top-0 z-20 bg-white flex justify-between items-center py-2 px-5 border-b">
        <button
          className="text-blue-500 font-semibold"
          onClick={() => alert("Go Back")}
        >
          Back
        </button>
        <div className="flex items-center">
          <span className="text-lg font-semibold mr-2">{name}</span>
          <FaPhone className="mx-2 cursor-pointer text-gray-500" />
          <FaVideo className="mx-2 cursor-pointer text-gray-500" />
          <FaInfoCircle className="mx-2 cursor-pointer text-gray-500" />
        </div>
      </div>
      {/* End Chat Header */}
      <div className="flex flex-col mt-5 flex-grow overflow-y-auto">
        <div className="flex justify-end mb-4">
          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
            Welcome to the chat!
          </div>
          <img
            src={avatar}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
        </div>
        <div className="flex justify-start mb-4">
          <img
            src={avatar}
            className="object-cover h-8 w-8 rounded-full"
            alt=""
          />
          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </div>
        </div>
      </div>
      <div className="py-5 relative flex items-center">
        <input
          className="w-full bg-gray-300 py-5 px-3 rounded-xl"
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <FaSmile
          className="absolute right-12 text-2xl text-gray-500 cursor-pointer"
          onClick={() => setShowEmojis((prev) => !prev)}
        />
        <FaPaperPlane
          className="absolute right-4 text-2xl text-blue-500 cursor-pointer"
          onClick={() => {
            alert(`Message sent: ${message}`);
            setMessage("");
          }}
        />
        {showEmojis && (
          <div className="absolute bottom-14 right-0">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDetail;
