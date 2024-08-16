const baseUrl = "http://localhost:8000/user";
const chatUrl = "http://localhost:8000/chat";

export const LoginApi = async (email, password) => {
  const url = `${baseUrl}/login`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error with the login request:", error);
    throw error;
  }
};

export const RegisterApi = async (email, name, password, confirmPassword) => {
  try {
    const url = `${baseUrl}/register`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, name, password, confirmPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllUser = async (userId) => {
  try {
    const response = await fetch(baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMessage = async (senderId, userToChatId) => {
  try {
    const url = `${chatUrl}/getMessage/${userToChatId}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId }),
      method: "POST",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
